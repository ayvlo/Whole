# ⚡ Supabase Quick Start - 5 Minutes

Get Ayvlo running with Supabase in 5 minutes!

---

## 📋 Checklist

### 1️⃣ Supabase Setup (2 min)

- [ ] Go to https://supabase.com
- [ ] Sign up / Sign in
- [ ] Create new project: `ayvlo-saas`
- [ ] Choose region (closest to you)
- [ ] Copy **Database Password** (you'll need this!)
- [ ] Wait 2 min for setup ☕

### 2️⃣ Get Connection String (1 min)

- [ ] Click **"Connect"** button
- [ ] Select **"URI"** mode
- [ ] Choose **"Transaction"** pooler
- [ ] Copy the connection string
- [ ] Replace `[YOUR-PASSWORD]` with your actual password

**Should look like:**
```
postgresql://postgres:YourPassword@db.xxx.supabase.co:5432/postgres
```

### 3️⃣ Upstash Redis (1 min)

- [ ] Go to https://console.upstash.com
- [ ] Create database: `ayvlo-redis`
- [ ] Copy **REST URL**
- [ ] Copy **REST TOKEN**

### 4️⃣ Configure .env.local (1 min)

```bash
cp .env.example .env.local
```

**Edit `.env.local`:**
```env
# From Supabase
DATABASE_URL="postgresql://postgres:YourPassword@db.xxx.supabase.co:5432/postgres"

# Generate this: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# From Upstash
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### 5️⃣ Install & Run (5 min)

```bash
# Install
pnpm install

# Setup database
pnpm prisma generate
pnpm db:push
pnpm db:seed

# Start!
pnpm dev
```

**Open: http://localhost:3000** 🎉

---

## ✅ Test It Works

```bash
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '[{"metric":"test","value":100,"timestamp":"2025-01-15T10:00:00Z"},{"metric":"test","value":1000,"timestamp":"2025-01-15T11:00:00Z"}]'
```

Should see: `"anomaliesDetected": 1` ✅

---

## 🎯 View Your Data

**Supabase Dashboard:**
- Table Editor → See all your tables
- SQL Editor → Run custom queries
- Logs → Monitor activity

**Prisma Studio:**
```bash
pnpm db:studio
```
Opens at http://localhost:5555

---

## 🆘 Quick Fixes

**Can't connect?**
- Check password has no special chars that need escaping
- Try adding `?sslmode=require` to connection string
- Verify Supabase project is "Active" (not paused)

**Too many connections?**
Add to `.env.local`:
```env
DIRECT_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

---

## 📚 Full Guide

Need more details? See **SETUP_WITH_SUPABASE.md**

---

**Time: 5 minutes | Difficulty: Easy | Cost: Free**

Happy coding! 🚀
