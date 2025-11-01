# ⚡ START HERE - Your Ayvlo Setup

**Everything is ready!** Your `.env.local` is configured with your Supabase and Upstash credentials.

---

## 🚀 Quick Start (Choose Your Method)

### Method 1: Automatic Setup Script ⭐ (Easiest)

**Mac/Linux:**
```bash
chmod +x RUN_THIS_LOCALLY.sh
./RUN_THIS_LOCALLY.sh
```

**Windows:**
```cmd
RUN_THIS_LOCALLY.bat
```

The script will:
1. ✅ Check prerequisites
2. ✅ Install dependencies
3. ✅ Generate Prisma client
4. ✅ Push schema to Supabase
5. ✅ Seed demo data
6. ✅ Show you how to start!

**Total time: ~5 minutes**

---

### Method 2: Manual Step-by-Step

If you prefer to see each step:

```bash
# 1. Install dependencies (2-3 min)
pnpm install

# 2. Generate Prisma client (30 sec)
pnpm prisma generate

# 3. Push schema to Supabase (1 min)
pnpm db:push

# 4. Seed demo data (30 sec)
pnpm db:seed

# 5. Start the server! (30 sec)
pnpm dev
```

Then open: **http://localhost:3000** 🎉

---

## ✅ Your Configuration

Your `.env.local` is already set up with:

- ✅ **Supabase Database**: Connected to `aws-1-us-east-2`
- ✅ **Upstash Redis**: Connected to `special-ladybug-31965`
- ✅ **NextAuth Secret**: Generated and ready
- ✅ **All URLs**: Configured for localhost

**You're ready to go!**

---

## 🧪 Test It Works

After running `pnpm dev`, test the API:

```bash
# In a NEW terminal (keep server running):
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "metric": "revenue",
      "value": 100,
      "timestamp": "2025-01-15T10:00:00Z"
    },
    {
      "metric": "revenue",
      "value": 1000,
      "timestamp": "2025-01-15T11:00:00Z"
    }
  ]'
```

**Expected response:**
```json
{
  "success": true,
  "eventsProcessed": 2,
  "anomaliesDetected": 1
}
```

If you see that - **IT WORKS!** 🎯

---

## 📊 View Your Data

### Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"Table Editor"**
4. See all your tables and data!

### Prisma Studio (Local)
```bash
pnpm db:studio
```
Opens at http://localhost:5555

---

## 🎯 What You'll See

After setup completes, you'll have:

✅ **18 database tables** in Supabase
✅ **Demo organization** (`demo-org`)
✅ **Demo user** (`demo@ayvlo.com`)
✅ **Sample workspace** with data
✅ **2 example anomalies** to explore
✅ **1 workflow** configured
✅ **API key** for testing (`ayvlo_test_...`)

---

## 🆘 If Something Goes Wrong

### Can't connect to database?
- Check your Supabase project is "Active" (not paused)
- Verify the DATABASE_URL in `.env.local`
- Try the Supabase dashboard to verify it's running

### Prisma errors?
```bash
# Force regenerate
pnpm prisma generate --force
```

### Port 3000 in use?
```bash
# Mac/Linux: Find and kill
lsof -i :3000
kill -9 <PID>

# Or use different port
pnpm dev -- -p 3001
```

### Dependencies won't install?
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 📚 Documentation Guide

| File | Purpose | When to Read |
|------|---------|--------------|
| **This file** | Quick start | Right now! |
| `SETUP_WITH_SUPABASE.md` | Detailed Supabase guide | If you want more info |
| `SUPABASE_QUICKSTART.md` | 5-min reference | Quick lookup |
| `README.md` | Architecture overview | Learn the system |
| `QUICKSTART.md` | Fast setup tips | Reference |

---

## 🎓 Next Steps

Once your app is running:

1. ✅ **Explore the dashboard** - See the UI in action
2. ✅ **Test the API** - Send some events
3. ✅ **Check Supabase** - View your data
4. ✅ **Customize branding** - Make it yours!
5. ✅ **Add OAuth** - Google/GitHub login (optional)
6. ✅ **Configure Stripe** - Enable billing (optional)
7. ✅ **Deploy to Vercel** - Go to production!

---

## 💡 Pro Tips

✅ Keep the dev server running in one terminal
✅ Use a second terminal for commands
✅ Check browser console (F12) for errors
✅ Use Prisma Studio to explore data visually
✅ Supabase dashboard is your friend!

---

## ⚠️ Important Security Note

Your credentials are in `.env.local` - this file is:
- ✅ Already in `.gitignore` (won't be committed)
- ✅ Only for your local development
- ⚠️ **Never commit this file to git!**

For production, you'll add these as environment variables in Vercel/your hosting platform.

---

## 🎉 Ready?

**Run the setup script and let's go!**

**Mac/Linux:**
```bash
./RUN_THIS_LOCALLY.sh
```

**Windows:**
```cmd
RUN_THIS_LOCALLY.bat
```

**Or do it manually:**
```bash
pnpm install && pnpm prisma generate && pnpm db:push && pnpm db:seed && pnpm dev
```

---

**You're about to launch your SaaS! Let's do this! 🚀**

Questions? Check the other docs or the troubleshooting section above.

Happy coding! 👑
