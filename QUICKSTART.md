# 🚀 Ayvlo SaaS - 5-Minute Quick Start

Get your billion-dollar SaaS running in 5 minutes!

## ⚡ Fastest Path to Running

```bash
# 1. Install dependencies (1 min)
pnpm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Add these MINIMAL required vars to .env.local:
# DATABASE_URL="postgresql://localhost:5432/ayvlo"
# NEXTAUTH_SECRET="run: openssl rand -base64 32"
# NEXTAUTH_URL="http://localhost:3000"
# UPSTASH_REDIS_REST_URL="get from upstash.com"
# UPSTASH_REDIS_REST_TOKEN="get from upstash.com"

# 4. Set up database (1 min)
pnpm db:push
pnpm db:seed

# 5. Run! (2 min to explore)
pnpm dev
```

Visit: `http://localhost:3000`

## 🎯 What You Get

### Immediately Available:
- ✅ **Multi-tenant architecture** - Orgs → Workspaces → Resources
- ✅ **Authentication** - NextAuth with Google, GitHub, Email
- ✅ **Dashboard UI** - Dark theme, responsive, production-ready
- ✅ **API routes** - Full REST API with validation
- ✅ **Database** - PostgreSQL with Prisma ORM
- ✅ **Rate limiting** - Redis-powered protection

### AI & Automation:
- ✅ **Anomaly detection** - Real-time metric monitoring
- ✅ **AI explanations** - Understand what's happening
- ✅ **Workflows** - Autonomous actions on triggers
- ✅ **Webhooks** - Inbound and outbound integrations

### Enterprise Features:
- ✅ **RBAC** - Role-based access control
- ✅ **Audit logs** - Complete activity tracking
- ✅ **Feature flags** - Per-org experimentation
- ✅ **API keys** - Secure programmatic access
- ✅ **Billing** - Stripe subscriptions (when configured)

## 📊 Test It Out

### 1. Sign in with demo account
Email: `demo@ayvlo.com` (created by seed script)

### 2. Send test events
```bash
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '[
    {"metric":"revenue","value":50,"timestamp":"2025-01-15T10:00:00Z"},
    {"metric":"revenue","value":500,"timestamp":"2025-01-15T11:00:00Z"}
  ]'
```

### 3. See the anomaly!
Go to: `http://localhost:3000/org/[your-org-id]/anomalies`

The spike from 50 → 500 should be detected!

## 🛠️ Customize

### 1. Change Branding
Edit `src/app/page.tsx` - Change "Ayvlo" to your brand

### 2. Modify Colors
Edit `tailwind.config.ts` - Update the `ayvlo` color scheme

### 3. Replace AI Detector
Edit `src/lib/ai/detector.ts` - Add your ML model

### 4. Add Integrations
Edit `src/lib/ai/action-runner.ts` - Add Slack, Discord, etc.

## 📦 What's Included

### 51 Production Files:
- **12 API routes** - Organizations, workspaces, billing, ingestion
- **10 UI components** - Dashboard, cards, layouts, forms
- **15 Core libraries** - Auth, RBAC, AI, validation, logging
- **6 Database models** - Full multi-tenant schema
- **8 App pages** - Landing, auth, dashboard, anomalies

### Features by the Numbers:
- 🎨 **2 color themes** - Dark mode ready
- 🔐 **4 auth providers** - Email, Google, GitHub, + custom
- 👥 **4 user roles** - Owner, Admin, Member, Viewer
- ⚡ **3 rate limiters** - API, ingest, auth
- 🤖 **3 AI systems** - Detect, explain, act
- 💳 **Full Stripe** - Subscriptions, webhooks, portal

## 🚢 Deploy to Production

### Vercel (Easiest)
```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel
# 3. Add env vars
# 4. Deploy!

# Or use CLI:
vercel deploy --prod
```

### Requirements:
- PostgreSQL database (Neon, Supabase, or Railway)
- Upstash Redis (free tier works)
- Stripe account (for billing)
- Domain name (optional)

## 📚 Full Documentation

- **README.md** - Complete feature list & architecture
- **SETUP.md** - Detailed setup with all integrations
- **This file** - Quick start reference

## 🎓 Learning Path

1. ✅ **Start here** - Get it running (5 min)
2. Read `README.md` - Understand the architecture (10 min)
3. Read `SETUP.md` - Configure integrations (30 min)
4. Customize & build! 🚀

## ⚠️ Common Issues

### "Can't connect to database"
- Make sure PostgreSQL is running
- Check `DATABASE_URL` in `.env.local`
- Try: `createdb ayvlo`

### "NextAuth error"
- Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Set `NEXTAUTH_URL` to `http://localhost:3000`

### "Redis connection failed"
- Sign up at upstash.com (free tier)
- Copy REST URL and token
- Add to `.env.local`

## 💡 Pro Tips

1. **Use the demo account** - Already seeded with data
2. **Check Prisma Studio** - Visual DB editor: `pnpm db:studio`
3. **Watch the logs** - See AI detection in real-time
4. **Test API with Postman** - Import endpoints from code
5. **Deploy early** - Vercel makes it easy

## 🎯 Next Steps

After running locally:

1. ✅ Explore the dashboard
2. ✅ Test anomaly detection
3. ✅ Create your own organization
4. ✅ Generate API keys
5. ✅ Customize the UI
6. ✅ Add your integrations
7. ✅ Deploy to production
8. ✅ Launch your SaaS! 🚀

---

**Built with:** Next.js 14, TypeScript, Prisma, Stripe, Redis, Tailwind

**Ready for:** Production deployment, scaling, customization

**Time to market:** Days, not months 💨

Let's build something amazing! 🎉
