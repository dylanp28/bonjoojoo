import { DatabaseConnection, ConnectionPool, QueryBuilder } from '@/lib/database/connection';
import { User, CreateUserRequest, UpdateUserRequest } from '@/lib/auth/types';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class UserService {
  private db: DatabaseConnection;

  constructor() {
    this.db = ConnectionPool.getInstance().getConnection();
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const insertQuery = QueryBuilder.insert('users')
      .setMultiple({
        email: userData.email.toLowerCase(),
        first_name: userData.firstName,
        last_name: userData.lastName,
        password_hash: hashedPassword,
        phone: userData.phone || null,
        date_of_birth: userData.dateOfBirth || null,
        preferences: JSON.stringify(userData.preferences || {}),
        vip_status: JSON.stringify({
          tier: 'standard',
          points: 0,
          benefits: [],
          tierProgress: { current: 0, nextTier: 'silver', required: 5000 }
        }),
        created_at: new Date(),
        updated_at: new Date()
      })
      .build();

    const result = await this.db.query(insertQuery.sql, insertQuery.params);
    
    if (result.rowCount === 0) {
      throw new Error('Failed to create user');
    }

    const newUser = result.rows[0];
    return this.formatUser(newUser);
  }

  async getUserById(id: string): Promise<User | null> {
    const selectQuery = QueryBuilder.select('users')
      .where('id', id)
      .build();

    const result = await this.db.query(selectQuery.sql, selectQuery.params);
    
    if (result.rowCount === 0) {
      return null;
    }

    return this.formatUser(result.rows[0]);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const selectQuery = QueryBuilder.select('users')
      .where('email', email.toLowerCase())
      .build();

    const result = await this.db.query(selectQuery.sql, selectQuery.params);
    
    if (result.rowCount === 0) {
      return null;
    }

    return this.formatUser(result.rows[0]);
  }

  async updateUser(id: string, updates: UpdateUserRequest): Promise<User | null> {
    const updateData: any = {
      updated_at: new Date()
    };

    // Map update fields
    if (updates.firstName !== undefined) updateData.first_name = updates.firstName;
    if (updates.lastName !== undefined) updateData.last_name = updates.lastName;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.dateOfBirth !== undefined) updateData.date_of_birth = updates.dateOfBirth;
    if (updates.preferences !== undefined) updateData.preferences = JSON.stringify(updates.preferences);

    // Hash new password if provided
    if (updates.password) {
      updateData.password_hash = await bcrypt.hash(updates.password, 12);
    }

    const updateQuery = QueryBuilder.update('users')
      .setMultiple(updateData)
      .where('id', id)
      .build();

    const result = await this.db.query(updateQuery.sql, updateQuery.params);
    
    if (result.rowCount === 0) {
      return null;
    }

    return this.formatUser(result.rows[0]);
  }

  async updateStripeCustomerId(userId: string, customerId: string): Promise<void> {
    const updateQuery = QueryBuilder.update('users')
      .set('stripe_customer_id', customerId)
      .set('updated_at', new Date())
      .where('id', userId)
      .build();

    await this.db.query(updateQuery.sql, updateQuery.params);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    // Get the password hash from database
    const selectQuery = QueryBuilder.select('users', ['password_hash'])
      .where('id', user.id)
      .build();

    const result = await this.db.query(selectQuery.sql, selectQuery.params);
    
    if (result.rowCount === 0) {
      return false;
    }

    const { password_hash } = result.rows[0];
    return bcrypt.compare(password, password_hash);
  }

  async updateLastLogin(userId: string): Promise<void> {
    const updateQuery = QueryBuilder.update('users')
      .set('last_login', new Date())
      .set('updated_at', new Date())
      .where('id', userId)
      .build();

    await this.db.query(updateQuery.sql, updateQuery.params);
  }

  async updateVipStatus(userId: string, vipStatus: any): Promise<void> {
    const updateQuery = QueryBuilder.update('users')
      .set('vip_status', JSON.stringify(vipStatus))
      .set('updated_at', new Date())
      .where('id', userId)
      .build();

    await this.db.query(updateQuery.sql, updateQuery.params);
  }

  async incrementVipPoints(userId: string, points: number): Promise<void> {
    // This would typically be done with an atomic update in production
    const user = await this.getUserById(userId);
    if (!user) return;

    const currentVipStatus = user.vipStatus || {
      tier: 'standard',
      points: 0,
      benefits: [],
      tierProgress: { current: 0, nextTier: 'silver', required: 5000 }
    };

    const newPoints = currentVipStatus.points + points;
    const updatedVipStatus = {
      ...currentVipStatus,
      points: newPoints,
      tier: this.calculateTier(newPoints),
      tierProgress: this.calculateTierProgress(newPoints)
    };

    await this.updateVipStatus(userId, updatedVipStatus);
  }

  async getUserStats(userId: string): Promise<{
    totalOrders: number;
    totalSpent: number;
    favoriteCategory: string | null;
    avgOrderValue: number;
    lastOrderDate: Date | null;
  }> {
    // This would typically join with orders table
    // For now, return mock data
    return {
      totalOrders: 5,
      totalSpent: 12750.00,
      favoriteCategory: 'engagement_rings',
      avgOrderValue: 2550.00,
      lastOrderDate: new Date('2024-01-15')
    };
  }

  async searchUsers(query: {
    email?: string;
    name?: string;
    vipTier?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ users: User[]; total: number }> {
    let selectBuilder = QueryBuilder.select('users');

    if (query.email) {
      selectBuilder = selectBuilder.where('email ILIKE', `%${query.email}%`);
    }

    if (query.name) {
      selectBuilder = selectBuilder.where(
        `(first_name ILIKE '%${query.name}%' OR last_name ILIKE '%${query.name}%')`
      );
    }

    if (query.createdAfter) {
      selectBuilder = selectBuilder.where('created_at >=', query.createdAfter);
    }

    if (query.createdBefore) {
      selectBuilder = selectBuilder.where('created_at <=', query.createdBefore);
    }

    selectBuilder = selectBuilder
      .orderBy('created_at', 'DESC')
      .limit(query.limit || 20)
      .offset(query.offset || 0);

    const searchQuery = selectBuilder.build();
    const result = await this.db.query(searchQuery.sql, searchQuery.params);

    // Get total count
    const countQuery = 'SELECT COUNT(*) as total FROM users';
    const countResult = await this.db.query(countQuery);
    const total = countResult.rows[0]?.total || 0;

    return {
      users: result.rows.map(row => this.formatUser(row)),
      total
    };
  }

  async deleteUser(userId: string): Promise<boolean> {
    // In production, this might soft-delete or require admin privileges
    const deleteQuery = QueryBuilder.delete('users')
      .where('id = $1')
      .build();

    const result = await this.db.query(deleteQuery.sql, [userId]);
    return result.rowCount > 0;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const selectQuery = QueryBuilder.select('users', ['id'])
      .where('email', email.toLowerCase())
      .limit(1)
      .build();

    const result = await this.db.query(selectQuery.sql, selectQuery.params);
    return result.rowCount > 0;
  }

  async createPasswordResetToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    // Store token in database
    const insertQuery = QueryBuilder.insert('password_reset_tokens')
      .setMultiple({
        user_id: userId,
        token,
        expires_at: expiresAt,
        used: false,
        created_at: new Date()
      })
      .build();

    await this.db.query(insertQuery.sql, insertQuery.params);
    return token;
  }

  async validatePasswordResetToken(token: string): Promise<string | null> {
    const selectQuery = QueryBuilder.select('password_reset_tokens')
      .where('token', token)
      .where('used', false)
      .where('expires_at >', new Date())
      .limit(1)
      .build();

    const result = await this.db.query(selectQuery.sql, selectQuery.params);
    
    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0].user_id;
  }

  async markPasswordResetTokenUsed(token: string): Promise<void> {
    const updateQuery = QueryBuilder.update('password_reset_tokens')
      .set('used', true)
      .set('used_at', new Date())
      .where('token', token)
      .build();

    await this.db.query(updateQuery.sql, updateQuery.params);
  }

  private formatUser(dbUser: any): User {
    return {
      id: dbUser.id,
      email: dbUser.email,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      phone: dbUser.phone,
      dateOfBirth: dbUser.date_of_birth,
      stripeCustomerId: dbUser.stripe_customer_id,
      preferences: dbUser.preferences ? JSON.parse(dbUser.preferences) : {},
      vipStatus: dbUser.vip_status ? JSON.parse(dbUser.vip_status) : {
        tier: 'standard',
        points: 0,
        benefits: [],
        tierProgress: { current: 0, nextTier: 'silver', required: 5000 }
      },
      lastLogin: dbUser.last_login,
      createdAt: dbUser.created_at,
      role: dbUser.role || 'customer'
    };
  }

  private calculateTier(points: number): string {
    if (points >= 25000) return 'diamond';
    if (points >= 15000) return 'platinum';
    if (points >= 10000) return 'gold';
    if (points >= 5000) return 'silver';
    return 'standard';
  }

  private calculateTierProgress(points: number): any {
    const tiers = [
      { name: 'silver', required: 5000 },
      { name: 'gold', required: 10000 },
      { name: 'platinum', required: 15000 },
      { name: 'diamond', required: 25000 }
    ];

    for (let i = 0; i < tiers.length; i++) {
      if (points < tiers[i].required) {
        return {
          current: points,
          nextTier: tiers[i].name,
          required: tiers[i].required,
          progress: (points / tiers[i].required) * 100
        };
      }
    }

    return {
      current: points,
      nextTier: null,
      required: 25000,
      progress: 100
    };
  }
}