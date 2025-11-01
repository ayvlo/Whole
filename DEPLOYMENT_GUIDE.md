# 🚀 COMPLETE DEPLOYMENT GUIDE - STEP BY STEP FOR BEGINNERS

This guide will walk you through deploying your enterprise-grade Ayvlo platform from scratch. No prior deployment experience required!

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites & Account Setup](#1-prerequisites--account-setup)
2. [Local Development Setup](#2-local-development-setup)
3. [Database Setup (Supabase)](#3-database-setup-supabase)
4. [Redis Setup (Upstash)](#4-redis-setup-upstash)
5. [Environment Variables](#5-environment-variables)
6. [Testing Locally](#6-testing-locally)
7. [Production Deployment (Vercel)](#7-production-deployment-vercel)
8. [Optional Integrations](#8-optional-integrations)
9. [Monitoring & Maintenance](#9-monitoring--maintenance)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. PREREQUISITES & ACCOUNT SETUP

### What You'll Need:

#### A. Software on Your Computer
```bash
# Check if you have Node.js (need version 18 or higher)
node --version
# If not installed, download from: https://nodejs.org/

# Check if you have Git
git --version
# If not installed, download from: https://git-scm.com/

# Install pnpm (package manager)
npm install -g pnpm
```

#### B. Create Free Accounts

**Required:**
1. **GitHub** (you already have this): https://github.com
2. **Vercel** (for hosting): https://vercel.com
   - Click "Sign up"
   - Choose "Continue with GitHub"
   - Authorize Vercel
3. **Supabase** (for database): https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub
4. **Upstash** (for Redis): https://upstash.com
   - Click "Sign up"
   - Use GitHub to sign up

**Optional (but recommended):**
5. **Stripe** (for payments): https://stripe.com
6. **OpenAI** (for AI explanations): https://platform.openai.com

---

## 2. LOCAL DEVELOPMENT SETUP

### Step 1: Clone Your Repository

```bash
# Open your terminal/command prompt

# Navigate to where you want the project
cd ~/Documents  # Mac/Linux
# or
cd C:\Users\YourName\Documents  # Windows

# Clone your repository
git clone https://github.com/ayvlo/Whole.git
cd Whole

# Switch to the enterprise upgrade branch
git checkout claude/enterprise-grade-platform-upgrade-011CUhiRV9xVr94AhjEsD6Z7
```

### Step 2: Install Dependencies

```bash
# Install all required packages (this might take 2-5 minutes)
pnpm install

# You should see output like:
# Progress: resolved XXX, reused XXX, downloaded XXX
# Done in XXs
```

**What this does:** Downloads all the libraries and tools your app needs to run.

---

## 3. DATABASE SETUP (SUPABASE)

### Step 1: Create a New Project

1. Go to https://supabase.com/dashboard
2. Click **"New project"**
3. Fill in:
   - **Name**: `ayvlo-production` (or any name you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you (e.g., "US West" or "Europe")
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### Step 2: Get Your Database URL

1. In your Supabase project, click **"Settings"** (gear icon at bottom left)
2. Click **"Database"** in the sidebar
3. Scroll down to **"Connection string"**
4. Select **"URI"** tab
5. Copy the connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with the password you created
7. **SAVE THIS** - you'll need it soon!

### Step 3: Set Up Database Tables

```bash
# In your terminal, create .env.local file
cp .env.example .env.local

# Open .env.local in a text editor (VS Code, Notepad, etc.)
# Add your database URL:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# Now push the database schema
pnpm db:push

# You should see:
# ✓ Your database is now in sync with your Prisma schema.
```

**What this does:** Creates all the tables (User, Organization, Anomaly, etc.) in your database.

---

## 4. REDIS SETUP (UPSTASH)

### Step 1: Create Redis Database

1. Go to https://console.upstash.com/
2. Click **"Create database"**
3. Fill in:
   - **Name**: `ayvlo-redis`
   - **Type**: Choose "Regional"
   - **Region**: Choose closest to you
   - **TLS**: Keep enabled (recommended)
4. Click **"Create"**

### Step 2: Get Your Redis Credentials

1. Click on your newly created database
2. Scroll down to **"REST API"** section
3. You'll see:
   - **UPSTASH_REDIS_REST_URL**: `https://xxx-xxx-xxx.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN**: `AbCdEf123...`
4. Copy both of these

### Step 3: Add to Environment Variables

```bash
# Open .env.local in your text editor
# Add these two lines:
UPSTASH_REDIS_REST_URL="https://xxx-xxx-xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token-here"
```

---

## 5. ENVIRONMENT VARIABLES

### Complete .env.local File

Open `.env.local` and make sure it looks like this:

```env
# ============================================
# DATABASE (Required)
# ============================================
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# ============================================
# REDIS (Required for production)
# ============================================
UPSTASH_REDIS_REST_URL="https://xxx-xxx-xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token-here"

# ============================================
# NEXTAUTH (Required)
# ============================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-string-here"

# Generate secret with:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ============================================
# OAUTH (Optional - for social login)
# ============================================
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# ============================================
# STRIPE (Optional - for payments)
# ============================================
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# ============================================
# AI (Optional - for advanced explanations)
# ============================================
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# ============================================
# APP CONFIG
# ============================================
NODE_ENV="development"
```

### Generate NEXTAUTH_SECRET

```bash
# Run this command in your terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output (looks like: a1b2c3d4e5f6...)
# Paste it as NEXTAUTH_SECRET value
```

---

## 6. TESTING LOCALLY

### Step 1: Start Development Server

```bash
# Start the development server
pnpm dev

# You should see:
# ▲ Next.js 14.1.0
# - Local:        http://localhost:3000
# - Network:      http://192.168.x.x:3000
# ✓ Ready in 2.5s
```

### Step 2: Test Health Check

Open a new terminal window and run:

```bash
# Test the health check endpoint
curl http://localhost:3000/api/health

# You should see JSON response:
# {
#   "status": "healthy",
#   "timestamp": "...",
#   "checks": { ... }
# }
```

**✅ If you see this, your backend is working!**

### Step 3: Create Test API Key

We need to create an API key in the database to test event ingestion.

**Option A: Using Prisma Studio (Easiest)**

```bash
# Open Prisma Studio (database GUI)
pnpm db:studio

# This opens http://localhost:5555 in your browser
```

1. In Prisma Studio:
   - Click **"Organization"** table
   - Click **"Add record"**
   - Fill in:
     - `name`: "Test Org"
     - `slug`: "test-org"
   - Click **"Save 1 change"**
   - Note the `id` (looks like: `clxxx...`)

2. Click **"Workspace"** table:
   - Click **"Add record"**
   - Fill in:
     - `name`: "Test Workspace"
     - `organizationId`: (paste the org ID from above)
   - Click **"Save 1 change"**

3. Click **"ApiKey"** table:
   - Click **"Add record"**
   - Fill in:
     - `organizationId`: (paste the org ID)
     - `name`: "Test Key"
     - `keyPrefix`: "ayvlo_test"
     - `keyHash`: "test_key_12345" (in production, this would be hashed)
     - `permissions`: ["read", "write"]
   - Click **"Save 1 change"**

**Option B: Using SQL (Advanced)**

```bash
# Connect to your database
# (Use the connection string from Supabase)

# Run this SQL:
INSERT INTO "Organization" (id, name, slug)
VALUES ('test-org-123', 'Test Org', 'test-org');

INSERT INTO "Workspace" (id, name, "organizationId")
VALUES ('test-ws-123', 'Test Workspace', 'test-org-123');

INSERT INTO "ApiKey" (id, "organizationId", name, "keyPrefix", "keyHash", permissions)
VALUES ('test-key-123', 'test-org-123', 'Test Key', 'ayvlo_test', 'test_key_12345', ARRAY['read', 'write']);
```

### Step 4: Test Event Ingestion

```bash
# Test ingesting a normal event
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer test_key_12345" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "metric": "revenue.mrr",
      "value": 45000,
      "timestamp": "2025-01-15T10:00:00Z"
    }
  ]'

# You should see:
# {
#   "success": true,
#   "processed": 1,
#   "results": [
#     {
#       "metric": "revenue.mrr",
#       "status": "success",
#       "anomaly": {
#         "detected": false
#       }
#     }
#   ]
# }
```

### Step 5: Test Anomaly Detection

```bash
# Send an anomalous value (very low MRR)
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer test_key_12345" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "metric": "revenue.mrr",
      "value": 5000,
      "timestamp": "2025-01-16T10:00:00Z"
    }
  ]'

# You should see anomaly detected:
# {
#   "success": true,
#   "processed": 1,
#   "results": [
#     {
#       "metric": "revenue.mrr",
#       "status": "success",
#       "anomaly": {
#         "detected": true,
#         "severity": "warning",
#         "confidence": 0.85,
#         "explanation": "Value 5000.00 is significantly different..."
#       }
#     }
#   ]
# }
```

**🎉 If you see anomaly detected, everything is working!**

---

## 7. PRODUCTION DEPLOYMENT (VERCEL)

### Step 1: Prepare for Production

```bash
# Make sure all changes are committed
git add -A
git commit -m "Ready for production deployment"
git push origin claude/enterprise-grade-platform-upgrade-011CUhiRV9xVr94AhjEsD6Z7
```

### Step 2: Create Pull Request & Merge

1. Go to https://github.com/ayvlo/Whole/pulls
2. Click **"New pull request"**
3. Select your branch: `claude/enterprise-grade-platform-upgrade-011CUhiRV9xVr94AhjEsD6Z7`
4. Click **"Create pull request"**
5. Add title: "Enterprise-Grade Platform Upgrade"
6. Click **"Create pull request"**
7. Click **"Merge pull request"**
8. Click **"Confirm merge"**
9. Your code is now in the main branch!

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Find your GitHub repository: **"ayvlo/Whole"**
4. Click **"Import"**
5. Configure project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `pnpm build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - Click **"Environment Variables"**

### Step 4: Add Environment Variables to Vercel

Click **"Add"** for each variable and paste the values from your `.env.local`:

**Required Variables:**

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | Your Supabase URL | From step 3 |
| `DIRECT_URL` | Same as DATABASE_URL | From step 3 |
| `UPSTASH_REDIS_REST_URL` | Your Upstash URL | From step 4 |
| `UPSTASH_REDIS_REST_TOKEN` | Your Upstash token | From step 4 |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Will get this after deploy |
| `NEXTAUTH_SECRET` | Your random string | From step 5 |

**Optional Variables:**

| Name | Value | Notes |
|------|-------|-------|
| `OPENAI_API_KEY` | `sk-...` | For AI explanations |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Fallback for AI |
| `STRIPE_SECRET_KEY` | `sk_test_...` | For payments |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | For Stripe webhooks |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Public Stripe key |

### Step 5: Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Wait 2-5 minutes for deployment
3. You'll see "Building..." then "Deploying..."
4. When done, you'll see **"Congratulations!"**
5. Click **"Visit"** to see your live site!

### Step 6: Update NEXTAUTH_URL

1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. In Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Find `NEXTAUTH_URL`
   - Click **"Edit"**
   - Change to: `https://your-app.vercel.app`
   - Click **"Save"**
3. Go to **Deployments**
4. Click **"Redeploy"** → **"Redeploy"** to apply the change

### Step 7: Test Production Deployment

```bash
# Test health check (replace with your URL)
curl https://your-app.vercel.app/api/health

# Test event ingestion
curl -X POST https://your-app.vercel.app/api/ayvlo/ingest \
  -H "Authorization: Bearer test_key_12345" \
  -H "Content-Type: application/json" \
  -d '[{"metric":"test","value":100}]'
```

**🎉 Your app is now LIVE on the internet!**

---

## 8. OPTIONAL INTEGRATIONS

### A. Stripe Setup (For Payments)

1. Go to https://dashboard.stripe.com/register
2. Complete sign up
3. Click **"Developers"** → **"API keys"**
4. Copy:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
5. Add to Vercel environment variables
6. In Stripe dashboard:
   - Click **"Developers"** → **"Webhooks"**
   - Click **"Add endpoint"**
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `invoice.paid`, etc.
   - Copy **Signing secret** (starts with `whsec_`)
   - Add as `STRIPE_WEBHOOK_SECRET` in Vercel

### B. OpenAI Setup (For AI Explanations)

1. Go to https://platform.openai.com/signup
2. Complete sign up
3. Add payment method (required for API access)
4. Go to https://platform.openai.com/api-keys
5. Click **"Create new secret key"**
6. Name it "Ayvlo Production"
7. Copy the key (starts with `sk-`)
8. Add as `OPENAI_API_KEY` in Vercel
9. Redeploy in Vercel

### C. Custom Domain (Optional)

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel:
   - Go to **Settings** → **Domains**
   - Click **"Add"**
   - Enter your domain (e.g., `app.ayvlo.com`)
   - Follow DNS configuration instructions
3. Update `NEXTAUTH_URL` to your custom domain
4. Redeploy

---

## 9. MONITORING & MAINTENANCE

### A. Set Up Vercel Monitoring

1. In Vercel dashboard, go to **"Analytics"**
2. Enable **"Web Analytics"**
3. View:
   - Traffic stats
   - Performance metrics
   - Error rates

### B. Monitor Database

1. In Supabase:
   - Go to **"Database"** → **"Logs"**
   - Monitor slow queries
   - Check disk usage

### C. Monitor Redis

1. In Upstash:
   - View **"Metrics"**
   - Check memory usage
   - Monitor request count

### D. Set Up Alerts

**In Vercel:**
1. Go to **Settings** → **"Notifications"**
2. Enable:
   - Deployment notifications
   - Error notifications
   - Performance alerts

**In Supabase:**
1. Go to **Settings** → **"Alerts"**
2. Set up alerts for:
   - CPU usage >80%
   - Disk usage >80%
   - Connection count >80%

### E. Regular Maintenance Tasks

**Weekly:**
- Check error logs in Vercel
- Review database performance in Supabase
- Check Redis memory usage

**Monthly:**
- Review and optimize slow queries
- Update dependencies: `pnpm update`
- Review security alerts on GitHub
- Backup database

---

## 10. TROUBLESHOOTING

### Common Issues & Solutions

#### Issue 1: "Database connection failed"

**Solution:**
```bash
# Check if DATABASE_URL is correct
echo $DATABASE_URL  # Local
# Or check in Vercel → Settings → Environment Variables

# Test connection
pnpm prisma db pull

# If error, regenerate database URL from Supabase
```

#### Issue 2: "Redis connection timeout"

**Solution:**
```bash
# Verify Redis credentials
# Go to Upstash console and copy fresh credentials
# Update UPSTASH_REDIS_REST_URL and TOKEN in Vercel
# Redeploy
```

#### Issue 3: "Module not found" error

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
pnpm install

# Or in Vercel, trigger fresh build:
# Settings → General → Redeploy
```

#### Issue 4: "API key invalid"

**Solution:**
```bash
# Create new API key in database
pnpm db:studio

# Or check that keyHash matches what you're sending
# in Authorization header
```

#### Issue 5: Build fails in Vercel

**Solution:**
1. Check build logs in Vercel
2. Common fixes:
   ```bash
   # Add to Vercel environment:
   SKIP_ENV_VALIDATION=true

   # Or fix TypeScript errors:
   pnpm build  # Run locally to see errors
   ```

#### Issue 6: "Rate limit exceeded"

**Solution:**
```bash
# This is working as intended!
# Rate limit is 1000 requests per minute per API key
# Wait 1 minute or create new API key for testing
```

#### Issue 7: Database migrations out of sync

**Solution:**
```bash
# Reset local database (development only!)
pnpm prisma migrate reset

# Or push schema again
pnpm db:push
```

---

## 🎉 DEPLOYMENT COMPLETE!

### Your Enterprise Platform is Now Live!

**What You Have:**
- ✅ Production-ready application on Vercel
- ✅ PostgreSQL database on Supabase
- ✅ Redis caching on Upstash
- ✅ Advanced anomaly detection
- ✅ Enterprise authentication
- ✅ Compliance-ready audit logging
- ✅ Usage-based billing
- ✅ Real-time monitoring

### Your URLs:

| Service | URL | Purpose |
|---------|-----|---------|
| **Production App** | `https://your-app.vercel.app` | Live application |
| **Health Check** | `https://your-app.vercel.app/api/health` | System status |
| **API Ingestion** | `https://your-app.vercel.app/api/ayvlo/ingest` | Event ingestion |
| **Vercel Dashboard** | https://vercel.com/dashboard | Deployment & monitoring |
| **Supabase Dashboard** | https://supabase.com/dashboard | Database management |
| **Upstash Dashboard** | https://console.upstash.com | Redis monitoring |

### Quick Reference Commands:

```bash
# Local development
pnpm dev

# Database management
pnpm db:studio      # Open database GUI
pnpm db:push        # Update database schema
pnpm prisma migrate dev  # Create migration

# Testing
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '[{"metric":"test","value":100}]'

# Deployment
git add -A
git commit -m "Your message"
git push
# Then Vercel auto-deploys!
```

### Next Steps:

1. **Build the Dashboard UI** - Create React components to visualize anomalies
2. **Add Data Sources** - Connect Stripe, databases, APIs
3. **Configure Workflows** - Set up automated actions for anomalies
4. **Custom Domain** - Add your own domain name
5. **Team Members** - Invite your team to the platform

---

## 📞 Need Help?

**Common Resources:**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs

**Your Documentation:**
- `ENTERPRISE_UPGRADE.md` - Full feature documentation
- `README.md` - Quick start guide
- Code comments - Inline documentation in all files

---

**Congratulations! You've successfully deployed an enterprise-grade SaaS platform! 🚀**
