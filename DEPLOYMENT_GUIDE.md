# 🚀 FaceATM Deployment Guide

> **Complete guide for deploying FaceATM to production environments**

## 📋 **Overview**

This guide covers deploying both the Next.js frontend and Flask backend of the FaceATM system to various platforms including Vercel, Heroku, AWS, and Docker.

## 🎯 **Deployment Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Backend       │    │   Database      │
│   (Frontend)    │◄──►│   (Flask API)   │◄──►│   (Optional)    │
│   Next.js App   │    │   Heroku/AWS    │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   File Storage  │    │   Monitoring    │
│   Static Assets │    │   User Images   │    │   Logs & Metrics│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌐 **Frontend Deployment (Vercel)**

### **Prerequisites**
- GitHub repository with your code
- Vercel account (free tier available)
- Node.js 18+ locally for testing

### **Step 1: Prepare for Deployment**

1. **Verify build works locally**
   ```bash
   cd web_app
   npm run build
   npm start
   ```

2. **Check environment variables**
   ```bash
   # Create .env.local for production
   NEXT_PUBLIC_API_URL=https://your-backend-url.herokuapp.com
   NEXT_PUBLIC_APP_NAME=FaceATM
   NEXT_PUBLIC_CAMERA_TIMEOUT=30000
   ```

3. **Optimize for production**
   ```bash
   # Run type checking
   npm run type-check
   
   # Run linting
   npm run lint
   
   # Test build
   npm run build
   ```

### **Step 2: Deploy to Vercel**

#### **Method 1: Vercel CLI (Recommended)**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project root**
   ```bash
   cd c:\Projects\face_atm
   vercel --prod
   ```

4. **Configure project settings**
   - Framework Preset: `Next.js`
   - Root Directory: `web_app`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### **Method 2: Vercel Dashboard**

1. **Connect GitHub Repository**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your `face-atm` repository

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Root Directory: web_app
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   Development Command: npm run dev
   ```

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_APP_NAME=FaceATM
   NEXT_PUBLIC_CAMERA_TIMEOUT=30000
   NEXT_PUBLIC_FACE_DETECTION_CONFIDENCE=0.5
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be available at `https://face-atm.vercel.app`

### **Step 3: Custom Domain (Optional)**

1. **Add Custom Domain**
   ```bash
   vercel domains add yourdomain.com
   ```

2. **Configure DNS**
   - Add CNAME record: `www.yourdomain.com` → `cname.vercel-dns.com`
   - Add A record: `yourdomain.com` → `76.76.19.61`

## 🐍 **Backend Deployment Options**

### **Option 1: Heroku (Recommended for beginners)**

#### **Prerequisites**
- Heroku account
- Heroku CLI installed

#### **Step 1: Prepare Flask App**

1. **Create Procfile**
   ```bash
   # In project root
   echo "web: gunicorn app:app" > Procfile
   ```

2. **Update requirements.txt**
   ```txt
   flask
   numpy
   pandas
   scikit-learn
   imutils
   gunicorn
   opencv-python-headless
   Pillow
   ```

3. **Create runtime.txt**
   ```bash
   echo "python-3.9.18" > runtime.txt
   ```

#### **Step 2: Deploy to Heroku**

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   heroku create face-atm-backend
   ```

3. **Set environment variables**
   ```bash
   heroku config:set FLASK_ENV=production
   heroku config:set SECRET_KEY=your-secret-key-here
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

5. **Scale the app**
   ```bash
   heroku ps:scale web=1
   ```

### **Option 2: AWS EC2**

#### **Step 1: Launch EC2 Instance**

1. **Create EC2 instance**
   - AMI: Ubuntu 20.04 LTS
   - Instance type: t2.micro (free tier)
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **Connect to instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

#### **Step 2: Setup Environment**

1. **Update system**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Python and dependencies**
   ```bash
   sudo apt install python3 python3-pip nginx -y
   pip3 install -r requirements.txt
   ```

3. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/face-atm
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

4. **Start services**
   ```bash
   sudo systemctl enable nginx
   sudo systemctl start nginx
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

### **Option 3: Docker Deployment**

#### **Step 1: Create Dockerfiles**

1. **Frontend Dockerfile** (`web_app/Dockerfile`)
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   
   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Backend Dockerfile** (`Dockerfile`)
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   
   # Install system dependencies
   RUN apt-get update && apt-get install -y \
       libglib2.0-0 \
       libsm6 \
       libxext6 \
       libxrender-dev \
       libgomp1 \
       libgtk-3-0 \
       && rm -rf /var/lib/apt/lists/*
   
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
   ```

3. **Docker Compose** (`docker-compose.yml`)
   ```yaml
   version: '3.8'
   
   services:
     frontend:
       build:
         context: ./web_app
         dockerfile: Dockerfile
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_API_URL=http://backend:5000
       depends_on:
         - backend
   
     backend:
       build:
         context: .
         dockerfile: Dockerfile
       ports:
         - "5000:5000"
       volumes:
         - ./dataset:/app/dataset
         - ./output:/app/output
       environment:
         - FLASK_ENV=production
   ```

#### **Step 2: Deploy with Docker**

1. **Build and run**
   ```bash
   docker-compose up --build -d
   ```

2. **Check status**
   ```bash
   docker-compose ps
   docker-compose logs
   ```

## 🔧 **Environment Configuration**

### **Production Environment Variables**

#### **Frontend (.env.production)**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_NAME=FaceATM
NEXT_PUBLIC_CAMERA_TIMEOUT=30000
NEXT_PUBLIC_FACE_DETECTION_CONFIDENCE=0.5
NEXT_PUBLIC_MAX_FACE_IMAGES=7
NEXT_PUBLIC_SESSION_TIMEOUT=1800000
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### **Backend Environment Variables**
```env
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ORIGINS=https://face-atm.vercel.app
MAX_CONTENT_LENGTH=16777216
UPLOAD_FOLDER=/app/uploads
```

## 🔒 **Security Configuration**

### **1. HTTPS Setup**

#### **Vercel (Automatic)**
- HTTPS is automatically enabled
- SSL certificates are managed by Vercel

#### **Custom Domain with Let's Encrypt**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### **2. Security Headers**

Update `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
      ],
    },
  ];
}
```

### **3. CORS Configuration**

Update Flask app:
```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['https://face-atm.vercel.app'])
```

## 📊 **Monitoring & Analytics**

### **1. Vercel Analytics**

1. **Enable in Vercel Dashboard**
   - Go to your project settings
   - Enable "Analytics"
   - Add analytics script to your app

2. **Add to Next.js**
   ```typescript
   // pages/_app.tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function App({ Component, pageProps }) {
     return (
       <>
         <Component {...pageProps} />
         <Analytics />
       </>
     );
   }
   ```

### **2. Error Monitoring**

#### **Sentry Integration**

1. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure Sentry**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from '@sentry/nextjs';
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

### **3. Performance Monitoring**

#### **Web Vitals**
```typescript
// pages/_app.tsx
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics service
}
```

## 🧪 **Testing Deployment**

### **1. Pre-deployment Checklist**

- [ ] ✅ All environment variables set
- [ ] ✅ Build passes locally
- [ ] ✅ All tests pass
- [ ] ✅ Security headers configured
- [ ] ✅ CORS properly set up
- [ ] ✅ SSL certificate valid

### **2. Post-deployment Testing**

1. **Functionality Tests**
   ```bash
   # Test frontend
   curl -I https://face-atm.vercel.app
   
   # Test backend
   curl -I https://your-backend-url.com/health
   ```

2. **Performance Tests**
   - Use Google PageSpeed Insights
   - Test with Lighthouse
   - Monitor Core Web Vitals

3. **Security Tests**
   - SSL Labs SSL Test
   - Security Headers check
   - OWASP ZAP scan

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Build Failures**
   ```bash
   # Clear cache
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Restart deployment after adding variables
   - Check variable names for typos

3. **CORS Errors**
   ```python
   # Update Flask CORS settings
   CORS(app, origins=['https://your-frontend-domain.com'])
   ```

4. **Camera Not Working in Production**
   - Ensure HTTPS is enabled
   - Check browser permissions
   - Verify camera API compatibility

### **Debugging Tools**

1. **Vercel Logs**
   ```bash
   vercel logs
   ```

2. **Heroku Logs**
   ```bash
   heroku logs --tail
   ```

3. **Browser DevTools**
   - Network tab for API calls
   - Console for JavaScript errors
   - Application tab for storage issues

## 📈 **Performance Optimization**

### **1. Frontend Optimization**

1. **Image Optimization**
   ```typescript
   // Use Next.js Image component
   import Image from 'next/image';
   
   <Image
     src="/hero-image.jpg"
     alt="FaceATM"
     width={800}
     height={600}
     priority
   />
   ```

2. **Code Splitting**
   ```typescript
   // Dynamic imports
   const DynamicComponent = dynamic(() => import('../components/Heavy'));
   ```

3. **Caching Strategy**
   ```typescript
   // next.config.ts
   async headers() {
     return [
       {
         source: '/static/(.*)',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ];
   }
   ```

### **2. Backend Optimization**

1. **Gunicorn Configuration**
   ```bash
   gunicorn -w 4 -k gevent --worker-connections 1000 -b 0.0.0.0:5000 app:app
   ```

2. **Caching**
   ```python
   from flask_caching import Cache
   
   cache = Cache(app, config={'CACHE_TYPE': 'simple'})
   
   @cache.cached(timeout=300)
   def expensive_function():
       return result
   ```

## 🔄 **CI/CD Pipeline**

### **GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: web_app/package-lock.json
    
    - name: Install dependencies
      run: cd web_app && npm ci
    
    - name: Build
      run: cd web_app && npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./web_app

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "face-atm-backend"
        heroku_email: "your-email@example.com"
```

## 📞 **Support & Maintenance**

### **Monitoring Checklist**

- [ ] ✅ Uptime monitoring (UptimeRobot, Pingdom)
- [ ] ✅ Error tracking (Sentry)
- [ ] ✅ Performance monitoring (Vercel Analytics)
- [ ] ✅ Security monitoring (Snyk, GitHub Security)
- [ ] ✅ Dependency updates (Dependabot)

### **Backup Strategy**

1. **Database Backups** (if using database)
2. **User Data Backups** (facial embeddings, transactions)
3. **Configuration Backups** (environment variables)
4. **Code Backups** (Git repository)

### **Update Process**

1. **Development** → **Staging** → **Production**
2. **Feature flags** for gradual rollouts
3. **Rollback plan** for critical issues
4. **Health checks** after deployment

---

## 🎉 **Congratulations!**

Your FaceATM system is now deployed and ready for production use! 

### **Next Steps:**
1. Monitor application performance
2. Gather user feedback
3. Plan feature enhancements
4. Scale based on usage

### **Resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Flask Deployment](https://flask.palletsprojects.com/en/2.0.x/deploying/)

**Need help?** Contact: omkardigambar4@gmail.com