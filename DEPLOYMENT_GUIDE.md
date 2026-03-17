# Bonjoojoo Deployment Guide

## 🚀 Production Deployment Checklist

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Environment variables configured
- [ ] Database setup (PostgreSQL recommended)
- [ ] Redis instance for caching and sessions
- [ ] SSL certificate for HTTPS

### Environment Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd bonjoojoo
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

3. **Required Environment Variables**
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:5432/bonjoojoo_production"
   
   # Authentication
   JWT_SECRET="your-production-jwt-secret-32-chars-min"
   
   # Stripe (Production Keys)
   STRIPE_SECRET_KEY="sk_live_your_stripe_live_secret"
   STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_live_public"
   STRIPE_WEBHOOK_SECRET="whsec_your_live_webhook_secret"
   
   # Analytics
   GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
   FACEBOOK_PIXEL_ID="your-production-pixel-id"
   
   # Email Service
   KLAVIYO_API_KEY="your-production-klaviyo-key"
   
   # Security
   NODE_ENV="production"
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```

### Build and Deploy

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

### Database Migration

1. **Setup Database Schema**
   ```sql
   -- Create production database
   CREATE DATABASE bonjoojoo_production;
   
   -- Create required tables (example schema)
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email VARCHAR(255) UNIQUE NOT NULL,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     password_hash TEXT NOT NULL,
     stripe_customer_id VARCHAR(100),
     preferences JSONB,
     vip_status JSONB,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE products (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     sku VARCHAR(50) UNIQUE NOT NULL,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10,2) NOT NULL,
     category VARCHAR(100) NOT NULL,
     specifications JSONB NOT NULL,
     images JSONB,
     availability_status VARCHAR(20) DEFAULT 'in_stock',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE orders (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id),
     order_number VARCHAR(20) UNIQUE NOT NULL,
     status VARCHAR(20) NOT NULL,
     items JSONB NOT NULL,
     subtotal DECIMAL(10,2) NOT NULL,
     tax DECIMAL(10,2) NOT NULL,
     shipping DECIMAL(10,2) NOT NULL,
     total DECIMAL(10,2) NOT NULL,
     stripe_payment_intent_id VARCHAR(100),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   -- Add indexes for performance
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_products_category ON products(category);
   CREATE INDEX idx_products_price ON products(price);
   CREATE INDEX idx_orders_user_id ON orders(user_id);
   CREATE INDEX idx_orders_status ON orders(status);
   ```

### Security Setup

1. **SSL Certificate Configuration**
   - Use Let's Encrypt or commercial SSL certificate
   - Configure HTTPS redirect
   - Set up HSTS headers

2. **Firewall Configuration**
   ```bash
   # Example UFW configuration
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow ssh
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Security Headers Verification**
   - Content Security Policy (CSP)
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

### Performance Optimization

1. **CDN Setup**
   - Configure Cloudflare or AWS CloudFront
   - Enable image optimization
   - Set appropriate caching headers

2. **Database Optimization**
   - Configure connection pooling
   - Set up read replicas if needed
   - Optimize queries with proper indexes

3. **Monitoring Setup**
   ```bash
   # Install monitoring tools
   npm install --save-dev @sentry/nextjs
   
   # Configure monitoring in next.config.js
   ```

### Backup Strategy

1. **Database Backups**
   ```bash
   # Daily backup script
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   
   # Upload to cloud storage
   aws s3 cp backup_$(date +%Y%m%d).sql s3://your-backup-bucket/
   ```

2. **Application Backups**
   - Code repository backup
   - Environment configuration backup
   - User-uploaded files backup

### Load Balancing (Optional)

1. **Nginx Configuration**
   ```nginx
   upstream bonjoojoo_app {
     server 127.0.0.1:3000;
     server 127.0.0.1:3001;
   }
   
   server {
     listen 80;
     server_name yourdomain.com;
     return 301 https://$host$request_uri;
   }
   
   server {
     listen 443 ssl;
     server_name yourdomain.com;
     
     ssl_certificate /path/to/certificate.crt;
     ssl_certificate_key /path/to/private.key;
     
     location / {
       proxy_pass http://bonjoojoo_app;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

### Health Checks

1. **Application Health Endpoint**
   ```typescript
   // src/app/api/health/route.ts
   export async function GET() {
     const health = {
       status: 'healthy',
       timestamp: new Date().toISOString(),
       services: {
         database: await checkDatabase(),
         stripe: await checkStripe(),
         redis: await checkRedis()
       }
     };
     
     return Response.json(health);
   }
   ```

2. **Monitoring Scripts**
   ```bash
   #!/bin/bash
   # health-check.sh
   curl -f http://localhost:3000/api/health || exit 1
   ```

### Deployment Automation

1. **CI/CD Pipeline (GitHub Actions)**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to Production
   
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm ci
         - name: Run tests
           run: npm test
         - name: Build application
           run: npm run build
         - name: Deploy to server
           run: |
             # Your deployment script here
             rsync -avz --delete ./ user@server:/app/bonjoojoo/
             ssh user@server "cd /app/bonjoojoo && pm2 restart bonjoojoo"
   ```

### Post-Deployment Verification

1. **Functionality Tests**
   - [ ] User registration and login
   - [ ] Product browsing and search
   - [ ] Shopping cart functionality
   - [ ] Payment processing
   - [ ] Order management
   - [ ] Email notifications

2. **Performance Tests**
   - [ ] Page load times < 3 seconds
   - [ ] Core Web Vitals passing
   - [ ] Mobile performance optimization
   - [ ] API response times < 500ms

3. **Security Tests**
   - [ ] HTTPS redirect working
   - [ ] Security headers present
   - [ ] Rate limiting functional
   - [ ] Input validation working
   - [ ] Authentication flow secure

### Maintenance

1. **Regular Updates**
   ```bash
   # Weekly dependency updates
   npm audit
   npm update
   npm run build
   npm test
   ```

2. **Log Monitoring**
   ```bash
   # Monitor application logs
   tail -f /var/log/bonjoojoo/app.log
   
   # Monitor system resources
   htop
   df -h
   ```

3. **Performance Monitoring**
   - Set up alerts for high response times
   - Monitor conversion rates
   - Track error rates

### Scaling Considerations

1. **Horizontal Scaling**
   - Multiple application instances
   - Load balancer configuration
   - Session store (Redis) sharing

2. **Database Scaling**
   - Read replicas for analytics
   - Connection pooling
   - Query optimization

3. **CDN and Caching**
   - Static asset caching
   - API response caching
   - Browser caching optimization

### Support and Monitoring

1. **Error Tracking**
   - Sentry for error monitoring
   - Log aggregation with ELK stack
   - Performance monitoring with DataDog

2. **Business Metrics**
   - Conversion rate monitoring
   - Revenue tracking
   - Customer satisfaction metrics

3. **Alerting**
   - High error rates
   - Performance degradation
   - Payment processing issues
   - Security events

---

## 📞 Support

For deployment issues or questions, refer to the technical documentation or contact the development team.

**Emergency Contacts:**
- Technical Lead: [contact information]
- DevOps Team: [contact information]
- Security Team: [contact information]