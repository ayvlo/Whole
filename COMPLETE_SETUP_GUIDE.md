# 🚀 Complete Ayvlo Setup Guide - Everything You Need

This is your comprehensive, step-by-step guide to get Ayvlo running on your local machine. Every detail, every command, every configuration is included here.

**Estimated Total Time**: 25-30 minutes
**Difficulty**: Beginner-friendly

---

## 📋 Table of Contents

1. [Prerequisites & System Requirements](#prerequisites)
2. [Project Setup](#project-setup)
3. [Database Configuration (Supabase)](#database-configuration)
4. [Redis Configuration (Upstash)](#redis-configuration)
5. [Environment Variables Setup](#environment-variables)
6. [Database Initialization](#database-initialization)
7. [Running the Application](#running-application)
8. [Testing & Verification](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Next Steps](#next-steps)

---

<a name="prerequisites"></a>
## ✅ Step 1: Prerequisites & System Requirements (5 minutes)

### What You Need Installed

Before starting, you need these tools on your computer:

#### 1. Node.js (v18 or higher)

**Check if you have it:**
```bash
node --version
```

**Expected output**: `v18.0.0` or higher

**If not installed:**
- **Download**: https://nodejs.org (get the LTS version)
- **macOS**: `brew install node`
- **Ubuntu/Debian**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Windows**: Download installer from nodejs.org

**Verify installation:**
```bash
node --version
npm --version
```

---

#### 2. pnpm Package Manager

**Check if you have it:**
```bash
pnpm --version
```

**Expected output**: `8.0.0` or higher

**If not installed:**
```bash
npm install -g pnpm
```

**For Windows users**, you might need to run PowerShell as Administrator.

**Verify installation:**
```bash
pnpm --version
```

---

#### 3. Git

**Check if you have it:**
```bash
git --version
```

**If not installed:**
- **macOS**: `brew install git`
- **Ubuntu/Debian**: `sudo apt-get install git`
- **Windows**: https://git-scm.com/download/win

---

#### 4. Code Editor (Recommended)

**VS Code** (Recommended): https://code.visualstudio.com

Or use any editor you prefer:
- Sublime Text
- Atom
- WebStorm
- nano/vim (for terminal users)

---

### System Check

Run these commands to verify everything:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check pnpm
pnpm --version

# Check Git
git --version
```

**All commands should return version numbers without errors.**

✅ If you see version numbers for all, you're ready to proceed!

---

<a name="project-setup"></a>
## 📦 Step 2: Project Setup (5 minutes)

### Clone or Navigate to Project

If you already have the project, navigate to it:

```bash
cd /path/to/your/ayvlo-project
```

If you're cloning from Git:

```bash
git clone <your-repo-url>
cd ayvlo
```

---

### Install Project Dependencies

This will install all required packages (~500+ packages):

```bash
pnpm install
```

**What you'll see:**
```
Progress: resolved 523, reused 523, downloaded 0, added 523, done
```

**This takes 2-3 minutes** depending on your internet speed.

**Expected result**:
- ✅ "Done in X.Xs" message
- ✅ `node_modules` folder created
- ✅ `pnpm-lock.yaml` file created/updated

**If you see errors:**

1. **EACCES permission error**:
   ```bash
   sudo chown -R $(whoami) ~/.pnpm-store
   pnpm install
   ```

2. **Network timeout**:
   ```bash
   pnpm install --network-timeout 100000
   ```

3. **Disk space issues**:
   ```bash
   df -h  # Check available space (need at least 500MB)
   ```

---

<a name="database-configuration"></a>
## 🗄️ Step 3: Database Configuration - Supabase (Already Set Up!)

### Good News: Your Database is Ready!

Your Supabase PostgreSQL database has already been created and configured. Here are your connection details:

#### Database Connection Strings

You have **TWO** connection strings (both are valid):

**1. Transactional Pooler (Recommended for Production)**
```
postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```
- **Use for**: High-traffic production environments
- **Benefits**: Connection pooling, better performance under load
- **Port**: 6543

**2. Direct Connection (Recommended for Development)**
```
postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres
```
- **Use for**: Local development, migrations, direct database access
- **Benefits**: Direct access, better for Prisma operations
- **Port**: 5432

---

### Understanding Your Database Credentials

Let's break down what each part means:

```
postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres
           ↑         ↑                   ↑                                      ↑    ↑
           |         |                   |                                      |    |
        username   password           host/server                             port database
```

- **Username**: `postgres` (default superuser)
- **Password**: `Adampoptropica7951!` (your database password)
- **Host**: `db.ezpdjupcpgdqpixtlmzs.supabase.co` (your Supabase instance)
- **Port**: `5432` (standard PostgreSQL port)
- **Database**: `postgres` (default database name)

---

### Access Your Supabase Dashboard

To view your database visually:

1. **Go to**: https://supabase.com/dashboard
2. **Sign in** with your Supabase account
3. **Select your project**: Look for the project with ID `ezpdjupcpgdqpixtlmzs`
4. **Explore**:
   - **Table Editor**: View/edit data visually
   - **SQL Editor**: Run custom SQL queries
   - **Database**: Connection settings, backups
   - **Logs**: Monitor queries and errors

---

### Test Your Database Connection (Optional but Recommended)

Let's verify the connection works:

**If you have `psql` installed:**

```bash
psql "postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres"
```

**You should see:**
```
psql (14.x, server 15.x)
SSL connection (...)
Type "help" for help.

postgres=>
```

**Try a simple query:**
```sql
SELECT version();
```

**Exit:**
```sql
\q
```

**If you don't have `psql`**, that's fine! We'll test the connection when we initialize Prisma.

---

<a name="redis-configuration"></a>
## ⚡ Step 4: Redis Configuration - Upstash (Already Set Up!)

### Good News: Your Redis is Ready!

Your Upstash Redis database has already been created. Here are your credentials:

#### Redis Connection Details

**REST API URL:**
```
https://special-ladybug-31965.upstash.io
```

**REST API Token:**
```
AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU
```

---

### What is Redis Used For?

In Ayvlo, Redis is used for:

- **Rate Limiting**: Prevent API abuse (e.g., max 100 requests/minute)
- **Session Storage**: Fast user session management
- **Caching**: Store frequently accessed data for speed
- **Job Queues**: Background task processing

---

### Access Your Upstash Dashboard

To view your Redis database:

1. **Go to**: https://console.upstash.com
2. **Sign in** with your Upstash account
3. **Select your database**: `special-ladybug-31965`
4. **Explore**:
   - **Data Browser**: View stored keys/values
   - **CLI**: Execute Redis commands
   - **Metrics**: Monitor usage, performance
   - **REST API**: Connection details

---

### Test Your Redis Connection (Optional)

You can test the connection using curl:

```bash
curl https://special-ladybug-31965.upstash.io/SET/test/hello \
  -H "Authorization: Bearer AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU"
```

**Expected response:**
```json
{"result":"OK"}
```

**Retrieve the value:**
```bash
curl https://special-ladybug-31965.upstash.io/GET/test \
  -H "Authorization: Bearer AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU"
```

**Expected response:**
```json
{"result":"hello"}
```

✅ If you get these responses, your Redis is working perfectly!

---

<a name="environment-variables"></a>
## 🔐 Step 5: Environment Variables Setup (10 minutes)

Environment variables are configuration values that tell your app how to connect to services (database, Redis, etc.) without hardcoding sensitive information.

---

### Create Your .env.local File

**Step 1: Copy the example file**

```bash
cp .env.example .env.local
```

**If you get "file not found"**, create it manually:

```bash
touch .env.local
```

---

**Step 2: Open the file in your editor**

**VS Code:**
```bash
code .env.local
```

**Nano (Terminal):**
```bash
nano .env.local
```

**TextEdit (macOS):**
```bash
open -a TextEdit .env.local
```

**Notepad (Windows):**
```bash
notepad .env.local
```

---

### Complete Configuration

**Copy and paste this EXACT configuration** into your `.env.local` file:

```env
# ============================================
# DATABASE - Supabase PostgreSQL
# ============================================

# Primary database URL - Direct connection (best for Prisma)
DATABASE_URL="postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres"

# Direct URL for migrations (Prisma needs this for Supabase)
DIRECT_URL="postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres"

# Optional: Use pooler for production (uncomment when deploying)
# DATABASE_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

# ============================================
# NEXTAUTH - Authentication
# ============================================

# App URL (use localhost for development)
NEXTAUTH_URL="http://localhost:3000"

# Secret for JWT tokens (GENERATE THIS - see instructions below)
NEXTAUTH_SECRET="REPLACE_THIS_WITH_GENERATED_SECRET"

# ============================================
# REDIS - Upstash (Rate Limiting & Caching)
# ============================================

UPSTASH_REDIS_REST_URL="https://special-ladybug-31965.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU"

# ============================================
# STRIPE - Payment Processing (OPTIONAL)
# ============================================
# Leave blank for now - add when you're ready to test billing

STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# ============================================
# OAUTH - Social Login (OPTIONAL)
# ============================================
# Leave blank for now - you can use email login for testing

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# ============================================
# SUPABASE - Additional Features (OPTIONAL)
# ============================================
# Uncomment these if you want to use Supabase Auth, Storage, or Realtime

# NEXT_PUBLIC_SUPABASE_URL="https://ezpdjupcpgdqpixtlmzs.supabase.co"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-from-supabase-dashboard"
# SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-from-supabase-dashboard"

# ============================================
# APP CONFIGURATION
# ============================================

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

### Generate NEXTAUTH_SECRET (IMPORTANT!)

**This is a critical security value!** It's used to encrypt session tokens.

**On macOS/Linux:**

Open a new terminal and run:

```bash
openssl rand -base64 32
```

**Expected output** (yours will be different):
```
J8k2NmF9dP3xQ7vL5tR8nY4bH6wS1cA9mG3fZ2pT5eK=
```

**On Windows (PowerShell):**

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Copy the output** and replace `REPLACE_THIS_WITH_GENERATED_SECRET` in your `.env.local`:

```env
NEXTAUTH_SECRET="J8k2NmF9dP3xQ7vL5tR8nY4bH6wS1cA9mG3fZ2pT5eK="
```

---

### Save Your .env.local File

**Nano (Terminal):**
- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

**VS Code:**
- Press `Cmd + S` (Mac) or `Ctrl + S` (Windows/Linux)

**TextEdit/Notepad:**
- File → Save

---

### Verify Your Configuration

Run this command to check if your file is set up correctly:

```bash
cat .env.local
```

**You should see all your environment variables** (without any "REPLACE_THIS" placeholders).

---

### Security Note 🔒

**NEVER commit .env.local to Git!**

Check that it's in `.gitignore`:

```bash
cat .gitignore | grep .env.local
```

**You should see:**
```
.env.local
```

If not, add it:

```bash
echo ".env.local" >> .gitignore
```

---

<a name="database-initialization"></a>
## 🔨 Step 6: Database Initialization with Prisma (5 minutes)

Prisma is your database toolkit. It helps you:
- Define database schema
- Run migrations
- Query data type-safely

---

### Step 6.1: Generate Prisma Client

This creates the Prisma client library based on your schema:

```bash
pnpm prisma generate
```

**Expected output:**
```
✔ Generated Prisma Client (v5.x.x)
```

**This creates**:
- `node_modules/.prisma/client/` directory
- TypeScript types for your database models

---

### Step 6.2: Push Schema to Database

This creates all tables, indexes, and relationships in your Supabase database:

```bash
pnpm db:push
```

**Expected output:**
```
Environment variables loaded from .env.local
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres"

🚀  Your database is now in sync with your Prisma schema.

✔ Generated Prisma Client (v5.x.x)
```

**What just happened?**

Prisma created these tables in your database:
- ✅ `User` - User accounts
- ✅ `Account` - OAuth connections
- ✅ `Session` - User sessions
- ✅ `Organization` - Multi-tenant organizations
- ✅ `Workspace` - Project workspaces
- ✅ `ApiKey` - API authentication
- ✅ `Anomaly` - Detected anomalies
- ✅ `Workflow` - Automation workflows
- ✅ `Alert` - Alert notifications
- ✅ And more...

---

### Step 6.3: Verify in Supabase Dashboard

Let's confirm the tables were created:

1. **Go to**: https://supabase.com/dashboard
2. **Select your project**
3. **Click "Table Editor"** (left sidebar)
4. **You should see all tables!**

**Expected tables:**
- User
- Organization
- Workspace
- ApiKey
- Anomaly
- Workflow
- Alert
- Event
- Subscription
- VerificationToken

✅ If you see these tables, your database is ready!

---

### Troubleshooting Database Connection

**Error: "Can't reach database server"**

1. **Check your connection string** in `.env.local`
2. **Verify no extra spaces or quotes**
3. **Test with psql** (if installed):
   ```bash
   psql "postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres"
   ```

**Error: "SSL connection required"**

Add `?sslmode=require` to your DATABASE_URL:
```env
DATABASE_URL="postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres?sslmode=require"
```

**Error: "Authentication failed"**

- Double-check your password: `Adampoptropica7951!`
- Make sure the `!` is included
- Try wrapping the password in quotes if needed

---

### Step 6.4: Seed Demo Data

Let's add sample data to test with:

```bash
pnpm db:seed
```

**Expected output:**
```
🌱 Seeding database...
✅ Created demo user: demo@ayvlo.com
✅ Created demo organization: Demo Organization
✅ Created demo workspace: Main Workspace
✅ Created API key: ayvlo_test_1234567890abcdef
✅ Created 2 sample anomalies
✅ Created 1 workflow
🎉 Seeding completed successfully!
```

**What was created?**

1. **Demo User**
   - Email: `demo@ayvlo.com`
   - Name: Demo User
   - Role: OWNER

2. **Demo Organization**
   - Name: Demo Organization
   - Slug: demo-org
   - Plan: PRO

3. **Demo Workspace**
   - Name: Main Workspace

4. **API Key**
   - Key: `ayvlo_test_1234567890abcdef`
   - You'll use this to test the API!

5. **Sample Anomalies**
   - 2 test anomalies with different severities
   - You can see these in the dashboard

6. **Sample Workflow**
   - 1 automation workflow for testing

---

### Verify Seed Data in Supabase

1. **Go to Supabase Dashboard** → Table Editor
2. **Click "Organization" table**
3. **You should see**: "Demo Organization"
4. **Click "ApiKey" table**
5. **You should see**: API key starting with `ayvlo_test_`

✅ Perfect! Your database is populated with test data.

---

<a name="running-application"></a>
## 🚀 Step 7: Running the Application (2 minutes)

You're ready to start the app!

---

### Start the Development Server

```bash
pnpm dev
```

**Expected output:**
```
> ayvlo@0.1.0 dev
> next dev

  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.X:3000

 ✓ Ready in 2.5s
```

**What's happening?**
- Next.js is compiling your application
- The server is running on port 3000
- Hot reload is enabled (changes update automatically)

---

### Open in Browser

**Open your browser and go to:**

```
http://localhost:3000
```

**You should see:**
- 🎨 **Ayvlo Homepage**
- Gold "Ayvlo" logo
- "Autonomous Analytics that Never Sleep"
- Three feature cards
- Call-to-action buttons

🎉 **Congratulations! Your app is running!**

---

### Keep It Running

**IMPORTANT**: Leave this terminal window open! The dev server must keep running.

To run more commands, open a **new terminal window/tab**.

---

### Stop the Server

When you need to stop:

**Press**: `Ctrl + C`

**To restart:**
```bash
pnpm dev
```

---

<a name="testing"></a>
## 🧪 Step 8: Testing & Verification (10 minutes)

Let's test all the features to make sure everything works!

---

### Test 1: Homepage ✅

**What to do:**
1. Go to: http://localhost:3000
2. Verify you see the landing page
3. Check for any console errors (F12 → Console tab)

**Expected result:**
- ✅ Page loads successfully
- ✅ No errors in console
- ✅ Images load correctly
- ✅ Buttons are clickable

---

### Test 2: API Health Check ✅

**Open a new terminal** (keep `pnpm dev` running in the other).

**Test the health endpoint:**

```bash
curl http://localhost:3000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-01T..."
}
```

✅ If you get this, your API is working!

---

### Test 3: Anomaly Detection API ✅

This is the core feature! Let's send test events.

**In your new terminal, run:**

```bash
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "metric": "revenue",
      "value": 100,
      "timestamp": "2025-11-01T10:00:00Z"
    },
    {
      "metric": "revenue",
      "value": 102,
      "timestamp": "2025-11-01T11:00:00Z"
    },
    {
      "metric": "revenue",
      "value": 1000,
      "timestamp": "2025-11-01T12:00:00Z"
    }
  ]'
```

**Expected response:**
```json
{
  "success": true,
  "eventsProcessed": 3,
  "anomaliesDetected": 1,
  "anomalies": [
    {
      "id": "...",
      "metric": "revenue",
      "value": 1000,
      "severity": 95.5,
      "type": "SPIKE",
      "message": "Detected spike in revenue: 1000 (880.39% increase)"
    }
  ]
}
```

🎯 **The jump from 102 → 1000 triggered an anomaly!**

---

### Test 4: View Data in Supabase ✅

Let's see the anomaly in your database:

1. **Go to**: https://supabase.com/dashboard
2. **Select your project**
3. **Click "Table Editor"**
4. **Click "Anomaly" table**
5. **You should see**: The anomaly you just created!

**What to look for:**
- ✅ Metric: "revenue"
- ✅ Value: 1000
- ✅ Severity: ~95
- ✅ Type: "SPIKE"
- ✅ Timestamp: Recent

---

### Test 5: Prisma Studio (Database GUI) ✅

Prisma Studio is a visual database browser.

**Open a new terminal and run:**

```bash
pnpm db:studio
```

**Expected output:**
```
Prisma Studio is up on http://localhost:5555
```

**Open in browser**: http://localhost:5555

**You'll see:**
- All your database tables on the left
- Click any table to view/edit data
- Beautiful UI to browse records

**Try this:**
1. Click "Organization"
2. See "Demo Organization"
3. Click "Anomaly"
4. See all detected anomalies

✅ This is super useful for debugging!

**To stop Prisma Studio:**
- Press `Ctrl + C` in that terminal

---

### Test 6: Authentication Flow ✅

Let's test the sign-in flow:

1. **Go to**: http://localhost:3000/api/auth/signin
2. **You should see**: NextAuth sign-in page
3. **Enter email**: `demo@ayvlo.com`
4. **Click "Sign in with Email"**

**What happens:**

Since we don't have email configured yet, the "magic link" will be printed in your **server terminal** (where `pnpm dev` is running).

**Look for output like:**
```
[next-auth][info][email] Email sent to demo@ayvlo.com
[next-auth][info][email] Verification URL: http://localhost:3000/api/auth/callback/email?token=...
```

**Copy the full URL** and paste it into your browser.

**Expected result:**
- ✅ You're redirected to the dashboard
- ✅ You see: "Welcome, Demo User"
- ✅ You're authenticated!

**Alternative**: Access dashboard directly by finding your org ID:

```bash
# In Prisma Studio
# Click "Organization" → Copy the "id" field
# Then go to: http://localhost:3000/org/[paste-id-here]
```

---

### Test 7: Rate Limiting (Redis) ✅

Let's verify Redis rate limiting works:

**Send multiple requests rapidly:**

```bash
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/ayvlo/ingest \
    -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
    -H "Content-Type: application/json" \
    -d '[{"metric":"test","value":1,"timestamp":"2025-11-01T10:00:00Z"}]'
  echo ""
done
```

**Expected result:**

First few requests: ✅ Success
After rate limit hit (default: 100/min): ❌ 429 error

```json
{
  "error": "Rate limit exceeded"
}
```

✅ If you see this, Redis rate limiting is working!

---

### Test 8: Dashboard Access ✅

**Try accessing the dashboard:**

**Method 1: Via Auth**

1. Sign in as described in Test 6
2. You should be redirected to `/org/[your-org-id]`
3. See dashboard with stats and anomalies

**Method 2: Direct Access (for testing)**

1. Open Prisma Studio: `pnpm db:studio`
2. Click "Organization" table
3. Copy the "id" field
4. Go to: `http://localhost:3000/org/[paste-id]`

**What you should see:**
- 📊 Stats cards (total anomalies, workspaces, etc.)
- 📈 Recent anomalies list
- 🎛️ Workspace selector
- 🔔 Alerts overview

---

### Success Checklist ✅

Verify everything is working:

- [x] **Homepage loads** at localhost:3000
- [x] **API responds** to health check
- [x] **Anomaly detection works** (can send events and detect anomalies)
- [x] **Data persists** in Supabase
- [x] **Prisma Studio** opens and shows data
- [x] **Authentication flow** works (magic link)
- [x] **Rate limiting** prevents abuse
- [x] **Dashboard** displays correctly

🎉 **All tests passed? You're ready to build!**

---

<a name="troubleshooting"></a>
## 🔧 Step 9: Troubleshooting

Common issues and how to fix them.

---

### Issue: "Port 3000 is already in use"

**Error message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution 1: Kill the process using port 3000**

**macOS/Linux:**
```bash
lsof -i :3000
# Find the PID (process ID)
kill -9 <PID>
```

**Windows (PowerShell):**
```powershell
netstat -ano | findstr :3000
# Find the PID
taskkill /PID <PID> /F
```

**Solution 2: Use a different port**

```bash
pnpm dev -- -p 3001
```

Then access: http://localhost:3001

---

### Issue: "Cannot connect to database"

**Error:**
```
Error: Can't reach database server at db.ezpdjupcpgdqpixtlmzs.supabase.co
```

**Solutions:**

1. **Check Supabase project is active**
   - Go to: https://supabase.com/dashboard
   - Verify project status is "Active" (green dot)

2. **Verify DATABASE_URL is correct**
   ```bash
   cat .env.local | grep DATABASE_URL
   ```

   Should be:
   ```
   DATABASE_URL="postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres"
   ```

3. **Test connection with psql**
   ```bash
   psql "postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres"
   ```

4. **Check firewall/VPN**
   - Some corporate networks block port 5432
   - Try disabling VPN temporarily

5. **Try the pooler connection**
   ```env
   DATABASE_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
   ```

---

### Issue: "Prisma Client not generated"

**Error:**
```
Cannot find module '@prisma/client'
```

**Solution:**

```bash
# Delete existing client
rm -rf node_modules/.prisma

# Regenerate
pnpm prisma generate

# Restart dev server
pnpm dev
```

---

### Issue: "Redis connection failed"

**Error:**
```
Error: Failed to connect to Redis
```

**Solutions:**

1. **Verify credentials in .env.local**
   ```bash
   cat .env.local | grep UPSTASH
   ```

2. **Check Upstash database status**
   - Go to: https://console.upstash.com
   - Click your database
   - Status should be "Active"

3. **Test Redis connection manually**
   ```bash
   curl https://special-ladybug-31965.upstash.io/PING \
     -H "Authorization: Bearer AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU"
   ```

   Expected: `{"result":"PONG"}`

4. **Check for extra spaces**
   - Make sure no trailing spaces in .env.local
   - URL should start with `https://`
   - Token should start with `A`

---

### Issue: "Module not found" errors

**Error:**
```
Error: Cannot find module 'next' or '@/lib/...'
```

**Solution:**

```bash
# Clean install
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install

# Regenerate Prisma
pnpm prisma generate

# Restart
pnpm dev
```

---

### Issue: "Environment variable not found"

**Error:**
```
Error: NEXTAUTH_SECRET is not set
```

**Solution:**

1. **Check .env.local exists**
   ```bash
   ls -la .env.local
   ```

2. **Verify all required variables are set**
   ```bash
   cat .env.local
   ```

3. **Restart dev server**
   ```bash
   # Stop: Ctrl+C
   pnpm dev
   ```

4. **Check for typos**
   - Variable names must be EXACT
   - No extra quotes around values (unless the value contains spaces)

---

### Issue: "Hydration errors" in browser

**Error in browser console:**
```
Hydration failed because the initial UI does not match what was rendered on the server
```

**Solutions:**

1. **Clear browser cache**
   - Chrome: Ctrl/Cmd + Shift + Delete
   - Check "Cached images and files"
   - Clear

2. **Delete .next folder**
   ```bash
   rm -rf .next
   pnpm dev
   ```

3. **Hard refresh**
   - Chrome/Firefox: Ctrl/Cmd + Shift + R

---

### Issue: "API returns 401 Unauthorized"

**Error:**
```json
{"error": "Unauthorized"}
```

**Solution:**

1. **Check API key is correct**
   ```bash
   # In Prisma Studio or Supabase
   # Verify the API key is: ayvlo_test_1234567890abcdef
   ```

2. **Verify Authorization header**
   ```bash
   curl -X POST http://localhost:3000/api/ayvlo/ingest \
     -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
     ...
   ```

   - Must include "Bearer " prefix
   - Space after "Bearer"
   - No quotes around the key

3. **Check API key in database**
   ```bash
   pnpm db:studio
   # Click "ApiKey" table
   # Verify key exists and is active
   ```

---

### Issue: "Too many database connections"

**Error:**
```
Error: Too many clients already
```

**Solution:**

Use the pooler connection:

```env
DATABASE_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
```

Or add connection limit:

```env
DATABASE_URL="postgresql://postgres:Adampoptropica7951!@db.ezpdjupcpgdqpixtlmzs.supabase.co:5432/postgres?connection_limit=1"
```

---

### Issue: "Seed script fails"

**Error:**
```
Error in seed script: ...
```

**Solution:**

1. **Reset database**
   ```bash
   pnpm prisma migrate reset
   ```

   **WARNING**: This deletes all data!

2. **Re-push schema**
   ```bash
   pnpm db:push
   ```

3. **Re-seed**
   ```bash
   pnpm db:seed
   ```

---

### Still stuck?

1. **Check the logs**
   - Server terminal output
   - Browser console (F12)
   - Network tab (F12 → Network)

2. **Check Supabase logs**
   - Supabase Dashboard → Logs
   - Look for errors

3. **Check Upstash logs**
   - Upstash Dashboard → Logs

4. **Try restarting everything**
   ```bash
   # Stop dev server (Ctrl+C)
   # Delete temp files
   rm -rf .next
   rm -rf node_modules/.prisma

   # Regenerate
   pnpm prisma generate

   # Restart
   pnpm dev
   ```

---

<a name="next-steps"></a>
## 🎯 Step 10: Next Steps

Congratulations! Your Ayvlo platform is running. Here's what to do next:

---

### Immediate Next Steps (Day 1)

#### 1. Explore the Dashboard

- **Sign in** with `demo@ayvlo.com`
- **Browse** the organization dashboard
- **Check out** the anomalies list
- **Test** creating new workspaces

#### 2. Test API Endpoints

Send more test events:

```bash
# Test different metrics
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '[
    {"metric": "users", "value": 150, "timestamp": "2025-11-01T10:00:00Z"},
    {"metric": "users", "value": 155, "timestamp": "2025-11-01T11:00:00Z"},
    {"metric": "users", "value": 500, "timestamp": "2025-11-01T12:00:00Z"}
  ]'
```

#### 3. Customize Branding

Update the app name and colors:

**Edit `src/app/layout.tsx`:**
```typescript
export const metadata: Metadata = {
  title: 'Your Brand Name', // Change this
  description: 'Your custom description',
}
```

**Edit `tailwind.config.ts`:**
```typescript
colors: {
  primary: '#your-color', // Change brand color
}
```

---

### Short-term Goals (Week 1)

#### 1. Set Up OAuth Authentication

**Google OAuth:**

1. **Go to**: https://console.cloud.google.com
2. **Create new project**
3. **Enable** Google+ API
4. **Create OAuth credentials**
5. **Add redirect URL**: `http://localhost:3000/api/auth/callback/google`
6. **Copy Client ID and Secret to `.env.local`**:
   ```env
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

**GitHub OAuth:**

1. **Go to**: GitHub Settings → Developer settings → OAuth Apps
2. **Create new OAuth App**
3. **Set callback**: `http://localhost:3000/api/auth/callback/github`
4. **Copy credentials to `.env.local`**:
   ```env
   GITHUB_CLIENT_ID="your-client-id"
   GITHUB_CLIENT_SECRET="your-client-secret"
   ```

---

#### 2. Configure Stripe for Billing

1. **Create account** at https://stripe.com
2. **Get test API keys** from Dashboard
3. **Install Stripe CLI**: https://stripe.com/docs/stripe-cli
4. **Forward webhooks**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
5. **Add to `.env.local`**:
   ```env
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

---

#### 3. Set Up Email (Optional)

For sending magic links and alerts:

**Option A: Resend (Recommended)**

1. **Sign up**: https://resend.com
2. **Get API key**
3. **Add to `.env.local`**:
   ```env
   RESEND_API_KEY="re_..."
   EMAIL_FROM="noreply@yourdomain.com"
   ```

**Option B: SendGrid**

1. **Sign up**: https://sendgrid.com
2. **Create API key**
3. **Configure** in NextAuth

---

### Medium-term Goals (Month 1)

#### 1. Customize the Landing Page

**Edit**: `src/app/page.tsx`

- Update hero section
- Change feature descriptions
- Add your unique value proposition
- Update screenshots/images

#### 2. Add Your Own Logo

**Replace**: `public/logo.png` with your logo

**Update references** in:
- `src/components/layout/app-shell.tsx`
- `src/app/layout.tsx`

#### 3. Configure Supabase Features

**Real-time Updates:**

```typescript
// Enable live dashboard updates
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

supabase
  .channel('anomalies')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'Anomaly'
  }, (payload) => {
    console.log('New anomaly!', payload)
  })
  .subscribe()
```

**File Storage:**

1. **Enable Storage** in Supabase dashboard
2. **Create bucket**: `uploads`
3. **Set permissions**
4. **Use in your app**:
   ```typescript
   const { data, error } = await supabase.storage
     .from('uploads')
     .upload('path/file.pdf', file)
   ```

---

### Long-term Goals (Quarter 1)

#### 1. Deploy to Production

**Recommended: Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

**Add environment variables** in Vercel dashboard.

**Update for production**:
```env
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
DATABASE_URL="postgresql://..." # Use pooler for production!
```

#### 2. Set Up Monitoring

**Sentry (Error Tracking):**

1. **Sign up**: https://sentry.io
2. **Install**:
   ```bash
   pnpm add @sentry/nextjs
   ```
3. **Configure** with your DSN

**Vercel Analytics:**

1. **Enable** in Vercel dashboard
2. **Install**:
   ```bash
   pnpm add @vercel/analytics
   ```

#### 3. Implement Advanced Features

- **Slack/Discord notifications** for anomalies
- **Custom anomaly detection algorithms**
- **Multi-factor authentication**
- **Advanced reporting and exports**
- **Webhooks** for integrations
- **Mobile app** (React Native)

---

### Learning Resources

#### Documentation

- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Supabase**: https://supabase.com/docs
- **NextAuth**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

#### Tutorials

- **Next.js 14 Tutorial**: https://nextjs.org/learn
- **Prisma Quickstart**: https://www.prisma.io/docs/getting-started
- **Supabase YouTube**: https://www.youtube.com/c/supabase

---

### Useful Commands Reference

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Run production build
pnpm lint                   # Run linter

# Database
pnpm db:push                # Push schema to database
pnpm db:seed                # Seed demo data
pnpm db:studio              # Open Prisma Studio
pnpm prisma generate        # Generate Prisma client
pnpm prisma migrate dev     # Create migration

# Testing
pnpm test                   # Run tests
pnpm test:watch             # Watch mode

# Code Quality
pnpm format                 # Format with Prettier
pnpm type-check             # Check TypeScript types

# Cleanup
rm -rf .next                # Delete build cache
rm -rf node_modules         # Delete dependencies
pnpm install                # Reinstall dependencies
```

---

## 🎊 Congratulations!

You've successfully set up Ayvlo! You now have:

- ✅ **Full-stack SaaS application** running locally
- ✅ **PostgreSQL database** on Supabase (production-grade)
- ✅ **Redis caching** on Upstash (blazing fast)
- ✅ **API** for anomaly detection (AI-powered)
- ✅ **Authentication** ready (NextAuth + magic links)
- ✅ **Dashboard** with real-time data
- ✅ **Demo data** to test with

---

### Your Stack

| Component | Technology | Why It's Awesome |
|-----------|-----------|------------------|
| **Frontend** | Next.js 14 + React | ⚡ Server components, best performance |
| **Backend** | Next.js API Routes | 🚀 Serverless, auto-scaling |
| **Database** | Supabase (PostgreSQL) | 💪 Production-grade, real-time |
| **ORM** | Prisma | 🎯 Type-safe, migrations built-in |
| **Cache** | Upstash Redis | ⚡ Serverless Redis, ultra-fast |
| **Auth** | NextAuth.js | 🔐 Secure, OAuth ready |
| **Styling** | Tailwind CSS | 🎨 Utility-first, beautiful |
| **Language** | TypeScript | 🛡️ Type-safety, fewer bugs |

---

### What Makes This Special?

- 🤖 **AI-Powered**: Anomaly detection with ML algorithms
- 📊 **Real-time**: Live dashboard updates via Supabase
- 🚀 **Scalable**: Serverless architecture, grows with you
- 💰 **SaaS-Ready**: Stripe billing, multi-tenancy built-in
- 🔐 **Secure**: Row-level security, API authentication
- 🎨 **Beautiful**: Modern UI with Tailwind CSS
- 📱 **Responsive**: Works on all devices
- 🔌 **Extensible**: Plugin system, webhooks, API

---

### You're Ready to Build!

**This is your foundation for:**

- 💰 **Revenue tracking** with anomaly alerts
- 👥 **User analytics** with behavior insights
- 📈 **Business metrics** monitoring
- 🔔 **Smart alerting** for critical events
- 🤖 **Automation workflows**
- 📊 **Custom dashboards**
- 🎯 And anything else you imagine!

---

### Need Help?

- 📖 **Read the docs**: Check `README.md` for architecture details
- 🐛 **Found a bug?**: Check troubleshooting section above
- 💡 **Have questions?**: Review the code comments
- 🚀 **Ready to deploy?**: Follow deployment guide above

---

## 🌟 Final Checklist

Before you start building, verify:

- [x] ✅ App runs at `http://localhost:3000`
- [x] ✅ Database connected to Supabase
- [x] ✅ Redis connected to Upstash
- [x] ✅ API accepts events and detects anomalies
- [x] ✅ Demo data seeded successfully
- [x] ✅ Prisma Studio accessible
- [x] ✅ Authentication flow works
- [x] ✅ Rate limiting functional
- [x] ✅ No errors in console
- [x] ✅ `.env.local` properly configured

---

## 🎯 Remember

- **Start small**: Test one feature at a time
- **Read errors carefully**: They usually tell you exactly what's wrong
- **Use Prisma Studio**: Visual debugging is easier
- **Check Supabase dashboard**: Verify data is saving
- **Keep learning**: Explore the codebase, break things, rebuild

---

## 💪 You've Got This!

Building a SaaS is a journey. You've completed the hardest part—**getting started**.

Now it's time to:
- 🎨 Customize it to your vision
- 💡 Add unique features
- 🚀 Deploy to production
- 💰 Acquire customers
- 📈 Scale to millions

**Your billion-dollar SaaS starts now!** 👑

---

**Made with ❤️ for builders**

Happy coding! 🚀✨

---

*Last updated: November 2025*
*Setup time: ~30 minutes*
*Difficulty: Beginner-friendly*
*Stack: Next.js + Supabase + Upstash + Prisma*

