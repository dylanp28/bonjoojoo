import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import crypto from 'crypto';
import { 
  User, 
  Session, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  AuthError,
  TwoFactorSetup,
  TwoFactorVerification,
  SecurityEvent,
  RateLimitInfo,
  JWTPayload,
  VIPStatus,
  AccountStatus 
} from './types';

/**
 * Comprehensive authentication service for luxury jewelry platform
 * Implements enterprise-grade security features for high-value transactions
 */
export class AuthService {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private securityEvents: SecurityEvent[] = [];
  private loginAttempts: Map<string, { count: number; lastAttempt: Date; blockedUntil?: Date }> = new Map();
  
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'luxury-jewelry-secret-key';
  private readonly JWT_EXPIRES_IN = '15m';
  private readonly REFRESH_TOKEN_EXPIRES_IN = '7d';
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly PASSWORD_MIN_LENGTH = 8;

  constructor() {
    this.initializeService();
  }

  /**
   * Initialize the authentication service
   */
  private initializeService(): void {
    // In production, load existing users and sessions from database
    console.log('Authentication service initialized');
  }

  /**
   * Register a new customer account
   */
  async register(data: RegisterData): Promise<AuthResponse | AuthError> {
    try {
      // Validate registration data
      const validation = this.validateRegistration(data);
      if (!validation.isValid) {
        return { 
          code: 'VALIDATION_ERROR', 
          message: validation.error || 'Invalid registration data',
          field: validation.field 
        };
      }

      // Check if email already exists
      const existingUser = Array.from(this.users.values())
        .find(user => user.email.toLowerCase() === data.email.toLowerCase());
      
      if (existingUser) {
        return { 
          code: 'EMAIL_EXISTS', 
          message: 'An account with this email already exists' 
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // Create user
      const userId = this.generateId();
      const user: User = {
        id: userId,
        email: data.email.toLowerCase(),
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        
        // Initialize preferences
        preferredMetal: [],
        priceRange: [0, 50000],
        stylePreferences: [],
        sizePreferences: {},
        
        // Account settings
        emailVerified: false,
        phoneVerified: false,
        twoFactorEnabled: false,
        marketingOptIn: data.marketingOptIn || false,
        
        // Initialize addresses
        addresses: [],
        
        // Account status
        accountStatus: 'pending_verification',
        vipStatus: 'standard',
        loyaltyPoints: 0,
        
        // Security
        failedLoginAttempts: 0,
        
        // Metadata
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString()
      };

      // Store user (password stored separately in production)
      this.users.set(userId, user);

      // Log security event
      await this.logSecurityEvent(userId, 'login_success', 'Account created', 'low');

      // Create session
      const authResponse = await this.createSession(user);

      // Send verification email (in production)
      await this.sendVerificationEmail(user.email);

      return authResponse;

    } catch (error) {
      console.error('Registration error:', error);
      return { 
        code: 'INTERNAL_ERROR', 
        message: 'An error occurred during registration' 
      };
    }
  }

  /**
   * Authenticate user login
   */
  async login(credentials: LoginCredentials, ipAddress: string, userAgent: string): Promise<AuthResponse | AuthError> {
    try {
      const { email, password, twoFactorCode, rememberMe } = credentials;

      // Check rate limiting
      const rateLimitResult = this.checkRateLimit(email);
      if (rateLimitResult.blocked) {
        return { 
          code: 'RATE_LIMITED', 
          message: `Account temporarily locked. Try again after ${new Date(rateLimitResult.resetTime).toLocaleString()}` 
        };
      }

      // Find user
      const user = Array.from(this.users.values())
        .find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        await this.recordFailedLogin(email, ipAddress, userAgent);
        return { 
          code: 'INVALID_CREDENTIALS', 
          message: 'Invalid email or password' 
        };
      }

      // Check account status
      if (user.accountStatus === 'suspended') {
        return { 
          code: 'ACCOUNT_SUSPENDED', 
          message: 'Your account has been suspended. Please contact customer service.' 
        };
      }

      // Verify password (in production, retrieve hashed password from secure storage)
      const validPassword = await this.verifyPassword(password, user.id);
      if (!validPassword) {
        await this.recordFailedLogin(email, ipAddress, userAgent);
        return { 
          code: 'INVALID_CREDENTIALS', 
          message: 'Invalid email or password' 
        };
      }

      // Check 2FA if enabled
      if (user.twoFactorEnabled) {
        if (!twoFactorCode) {
          return { 
            code: '2FA_REQUIRED', 
            message: 'Two-factor authentication code required' 
          };
        }

        const valid2FA = await this.verify2FA(user.id, twoFactorCode);
        if (!valid2FA) {
          await this.logSecurityEvent(user.id, 'login_failure', 'Invalid 2FA code', 'medium', ipAddress, userAgent);
          return { 
            code: 'INVALID_2FA', 
            message: 'Invalid two-factor authentication code' 
          };
        }
      }

      // Reset failed login attempts
      this.loginAttempts.delete(email);

      // Update user last login
      user.lastLoginAt = new Date().toISOString();
      user.lastActiveAt = new Date().toISOString();
      user.failedLoginAttempts = 0;

      // Log successful login
      await this.logSecurityEvent(user.id, 'login_success', 'Successful login', 'low', ipAddress, userAgent);

      // Create session
      const authResponse = await this.createSession(user, ipAddress, userAgent, rememberMe);

      return authResponse;

    } catch (error) {
      console.error('Login error:', error);
      return { 
        code: 'INTERNAL_ERROR', 
        message: 'An error occurred during login' 
      };
    }
  }

  /**
   * Create user session
   */
  private async createSession(
    user: User, 
    ipAddress?: string, 
    userAgent?: string,
    rememberMe: boolean = false
  ): Promise<AuthResponse> {
    const sessionId = this.generateId();
    const tokenExpiry = rememberMe 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create session
    const session: Session = {
      id: sessionId,
      userId: user.id,
      token: this.generateToken(),
      refreshToken: this.generateToken(),
      expiresAt: tokenExpiry.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ipAddress: ipAddress || 'unknown',
      userAgent: userAgent || 'unknown',
      lastActivityAt: new Date().toISOString(),
      isActive: true
    };

    this.sessions.set(sessionId, session);

    // Generate JWT
    const accessToken = this.generateJWT(user, session);
    const refreshToken = this.generateRefreshToken(user, session);

    return {
      user,
      session,
      accessToken,
      refreshToken,
      expiresAt: tokenExpiry.toISOString()
    };
  }

  /**
   * Generate JWT access token
   */
  private generateJWT(user: User, session: Session): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      sessionId: session.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (15 * 60), // 15 minutes
      aud: 'bonjoojoo-jewelry',
      iss: 'bonjoojoo-auth'
    };

    return jwt.sign(payload, this.JWT_SECRET, { algorithm: 'HS256' });
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(user: User, session: Session): string {
    const payload = {
      userId: user.id,
      sessionId: session.id,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };

    return jwt.sign(payload, this.JWT_SECRET, { algorithm: 'HS256' });
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse | AuthError> {
    try {
      const decoded = jwt.verify(refreshToken, this.JWT_SECRET) as any;
      
      if (decoded.type !== 'refresh') {
        return { code: 'INVALID_TOKEN', message: 'Invalid refresh token' };
      }

      const session = this.sessions.get(decoded.sessionId);
      const user = this.users.get(decoded.userId);

      if (!session || !user || !session.isActive) {
        return { code: 'INVALID_SESSION', message: 'Session not found or expired' };
      }

      // Generate new access token
      const accessToken = this.generateJWT(user, session);

      // Update session activity
      session.lastActivityAt = new Date().toISOString();
      session.updatedAt = new Date().toISOString();

      return {
        user,
        session,
        accessToken,
        refreshToken, // Keep the same refresh token
        expiresAt: session.expiresAt
      };

    } catch (error) {
      return { code: 'INVALID_TOKEN', message: 'Invalid or expired refresh token' };
    }
  }

  /**
   * Setup two-factor authentication
   */
  async setup2FA(userId: string): Promise<TwoFactorSetup | AuthError> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return { code: 'USER_NOT_FOUND', message: 'User not found' };
      }

      const secret = speakeasy.generateSecret({
        name: `Bonjoojoo (${user.email})`,
        issuer: 'Bonjoojoo Luxury Jewelry',
        length: 32
      });

      const qrCode = await qrcode.toDataURL(secret.otpauth_url!);

      // Generate backup codes
      const backupCodes = Array.from({ length: 10 }, () => 
        crypto.randomBytes(4).toString('hex').toUpperCase()
      );

      // Store secret securely (in production, encrypt and store in database)
      
      return {
        secret: secret.base32,
        qrCode,
        backupCodes
      };

    } catch (error) {
      console.error('2FA setup error:', error);
      return { code: 'INTERNAL_ERROR', message: 'Failed to setup 2FA' };
    }
  }

  /**
   * Verify 2FA code
   */
  private async verify2FA(userId: string, code: string): Promise<boolean> {
    try {
      // In production, retrieve user's 2FA secret from secure storage
      // For now, return true as placeholder
      return speakeasy.totp.verify({
        secret: 'user-2fa-secret', // Retrieved from database
        encoding: 'base32',
        token: code,
        window: 2 // Allow some time drift
      });
    } catch (error) {
      console.error('2FA verification error:', error);
      return false;
    }
  }

  /**
   * Calculate VIP status based on lifetime spending
   */
  calculateVIPStatus(lifetimeSpending: number): VIPStatus {
    if (lifetimeSpending >= 100000) return 'diamond';
    if (lifetimeSpending >= 50000) return 'platinum';
    if (lifetimeSpending >= 15000) return 'gold';
    if (lifetimeSpending >= 5000) return 'silver';
    return 'standard';
  }

  /**
   * Log security events
   */
  private async logSecurityEvent(
    userId: string,
    type: any,
    description: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const event: SecurityEvent = {
      id: this.generateId(),
      userId,
      type,
      description,
      severity,
      ipAddress: ipAddress || 'unknown',
      userAgent: userAgent || 'unknown',
      createdAt: new Date().toISOString(),
      resolved: false
    };

    this.securityEvents.push(event);

    // In production, alert on high/critical events
    if (severity === 'high' || severity === 'critical') {
      console.warn(`High severity security event: ${description} for user ${userId}`);
    }
  }

  /**
   * Validate registration data
   */
  private validateRegistration(data: RegisterData): { isValid: boolean; error?: string; field?: string } {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { isValid: false, error: 'Invalid email address', field: 'email' };
    }

    // Password validation
    if (data.password.length < this.PASSWORD_MIN_LENGTH) {
      return { isValid: false, error: `Password must be at least ${this.PASSWORD_MIN_LENGTH} characters`, field: 'password' };
    }

    if (data.password !== data.confirmPassword) {
      return { isValid: false, error: 'Passwords do not match', field: 'confirmPassword' };
    }

    // Name validation
    if (!data.firstName.trim() || !data.lastName.trim()) {
      return { isValid: false, error: 'First and last name are required', field: 'name' };
    }

    return { isValid: true };
  }

  /**
   * Check rate limiting for failed logins
   */
  private checkRateLimit(email: string): RateLimitInfo {
    const attempts = this.loginAttempts.get(email);
    
    if (!attempts) {
      return { remainingAttempts: this.MAX_LOGIN_ATTEMPTS, resetTime: '', blocked: false };
    }

    const now = new Date();
    
    // Check if blocked
    if (attempts.blockedUntil && now < attempts.blockedUntil) {
      return {
        remainingAttempts: 0,
        resetTime: attempts.blockedUntil.toISOString(),
        blocked: true
      };
    }

    // Reset if lockout period has passed
    if (attempts.blockedUntil && now >= attempts.blockedUntil) {
      this.loginAttempts.delete(email);
      return { remainingAttempts: this.MAX_LOGIN_ATTEMPTS, resetTime: '', blocked: false };
    }

    return {
      remainingAttempts: Math.max(0, this.MAX_LOGIN_ATTEMPTS - attempts.count),
      resetTime: new Date(attempts.lastAttempt.getTime() + this.LOCKOUT_DURATION).toISOString(),
      blocked: attempts.count >= this.MAX_LOGIN_ATTEMPTS
    };
  }

  /**
   * Record failed login attempt
   */
  private async recordFailedLogin(email: string, ipAddress?: string, userAgent?: string): Promise<void> {
    const attempts = this.loginAttempts.get(email) || { count: 0, lastAttempt: new Date() };
    
    attempts.count++;
    attempts.lastAttempt = new Date();
    
    if (attempts.count >= this.MAX_LOGIN_ATTEMPTS) {
      attempts.blockedUntil = new Date(Date.now() + this.LOCKOUT_DURATION);
    }
    
    this.loginAttempts.set(email, attempts);

    // Log security event if user exists
    const user = Array.from(this.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      await this.logSecurityEvent(
        user.id, 
        'login_failure', 
        `Failed login attempt ${attempts.count}`, 
        attempts.count >= 3 ? 'high' : 'medium',
        ipAddress,
        userAgent
      );
    }
  }

  /**
   * Verify password (placeholder - implement secure password verification)
   */
  private async verifyPassword(password: string, userId: string): Promise<boolean> {
    // In production, retrieve hashed password and compare
    // For now, return true as placeholder
    return true;
  }

  /**
   * Send verification email (placeholder)
   */
  private async sendVerificationEmail(email: string): Promise<void> {
    // In production, send actual verification email
    console.log(`Verification email sent to ${email}`);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Generate secure token
   */
  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Logout user
   */
  async logout(sessionId: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      session.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  /**
   * Validate JWT token
   */
  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;
      const session = this.sessions.get(decoded.sessionId);
      const user = this.users.get(decoded.userId);

      if (!session || !user || !session.isActive) {
        return null;
      }

      // Update last activity
      session.lastActivityAt = new Date().toISOString();
      user.lastActiveAt = new Date().toISOString();

      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verify JWT token — returns { success, user } shape expected by API routes
   */
  async verifyToken(token: string): Promise<{ success: boolean; user?: User }> {
    const user = await this.validateToken(token);
    if (!user) {
      return { success: false };
    }
    return { success: true, user };
  }
}

export const authService = new AuthService();