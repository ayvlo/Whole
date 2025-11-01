# Ayvlo SaaS - Autonomous Analytics Platform

A production-grade, multi-tenant SaaS boilerplate with AI-powered anomaly detection, autonomous workflows, and comprehensive billing.

## 🚀 Features

### Multi-Tenancy
- **Organizations** - Multiple users can belong to multiple organizations
- **Workspaces** - Each org can have multiple workspaces for different environments
- **Role-Based Access Control** - OWNER, ADMIN, MEMBER, VIEWER roles with granular permissions
- **Team Management** - Invite members, manage roles, audit activities

### Ayvlo AI Core
- **Anomaly Detection** - Real-time detection of anomalies in your metrics
- **AI Explanations** - Automatic explanations for detected anomalies
- **Autonomous Workflows** - Take action automatically when anomalies are detected
- **Customizable Actions** - Slack notifications, webhooks, emails, Stripe dunning, etc.

### Billing & Subscriptions
- **Stripe Integration** - Full subscription management
- **Per-seat Pricing** - Automatic seat-based billing
- **Usage Tracking** - Monitor API calls, anomalies detected, workflows run
- **Billing Portal** - Self-service subscription management

### Security & Compliance
- **Rate Limiting** - Per-org and per-API-key rate limits using Upstash Redis
- **Audit Logs** - Complete activity tracking for compliance
- **API Keys** - Secure org-scoped API keys with permissions
- **Webhooks** - Inbound and outbound webhook support with signature verification

### Developer Experience
- **Next.js 14 App Router** - Latest Next.js with React Server Components
- **TypeScript** - Full type safety across the stack
- **Prisma ORM** - Type-safe database access
- **Zod Validation** - Runtime validation for all API inputs
- **Feature Flags** - Per-org feature toggles for gradual rollouts

## 📁 Project Structure

```
ayvlo/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
├── src/
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── auth/            # Authentication pages
│   │   ├── org/             # Organization dashboard
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components
│   │   └── dashboard/       # Dashboard components
│   ├── lib/
│   │   ├── ai/              # AI detection & explanation
│   │   ├── validation/      # Zod schemas
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Database client
│   │   ├── stripe.ts        # Stripe client
│   │   ├── rbac.ts          # Access control
│   │   ├── feature-flags.ts # Feature management
│   │   └── ...
│   └── styles/
└── ...
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (or use Neon/Supabase)
- Stripe account
- Upstash Redis account

### Installation

1. **Clone and install dependencies**
```bash
git clone <your-repo>
cd ayvlo
pnpm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ayvlo"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Redis
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

3. **Initialize database**
```bash
pnpm db:push
pnpm db:seed
```

4. **Run development server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## 🔑 Demo Credentials

After running the seed script:
- **Email**: demo@ayvlo.com
- **Organization**: demo-org
- **API Key**: `ayvlo_test_1234567890abcdef` (for testing)

## 📡 API Usage

### Ingest Events

```bash
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "metric": "stripe.mrr",
      "value": 45000,
      "timestamp": "2025-01-15T10:00:00Z"
    }
  ]'
```

### Create Organization

```bash
curl -X POST http://localhost:3000/api/orgs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Company",
    "slug": "my-company"
  }'
```

## 🧪 Testing Anomaly Detection

The system includes a simple z-score based anomaly detector (placeholder). To test:

1. Ingest normal events:
```bash
# Ingest baseline data
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/ayvlo/ingest \
    -H "Authorization: Bearer YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d "[{\"metric\":\"test.metric\",\"value\":$((50 + RANDOM % 10)),\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}]"
done
```

2. Ingest an anomalous event:
```bash
# This should trigger detection
curl -X POST http://localhost:3000/api/ayvlo/ingest \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '[{"metric":"test.metric","value":500,"timestamp":"2025-01-15T10:00:00Z"}]'
```

## 🎨 Customization

### Replace AI Detector

Edit `src/lib/ai/detector.ts` and replace the placeholder logic with your ML model:

```typescript
export async function detectAnomaliesWithHistory(events, historicalData) {
  // Your custom model here
  // Example: TensorFlow.js, scikit-learn API, Prophet, etc.
}
```

### Add New Workflow Actions

Edit `src/lib/ai/action-runner.ts`:

```typescript
case 'my_custom_action':
  await myCustomAction(config, anomaly);
  break;
```

### Add Feature Flags

```typescript
await enableFeature(orgId, 'new_feature', { rolloutPercentage: 10 });

// In your code
if (await isFeatureEnabled(orgId, 'new_feature')) {
  // New feature code
}
```

## 🚢 Deployment

### Vercel

```bash
vercel deploy
```

Make sure to add all environment variables in Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 📊 Database Migrations

```bash
# Create migration
pnpm prisma migrate dev --name my_migration

# Apply migrations
pnpm prisma migrate deploy

# Reset database (dev only)
pnpm prisma migrate reset
```

## 🔐 Security Checklist

- [ ] Change `NEXTAUTH_SECRET` to a secure random string
- [ ] Use environment-specific Stripe keys
- [ ] Enable Stripe webhook signature verification
- [ ] Set up proper CORS policies
- [ ] Rotate API keys regularly
- [ ] Enable rate limiting in production
- [ ] Set up Sentry or error tracking
- [ ] Configure CSP headers
- [ ] Use HTTPS in production

## 📚 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Cache/Queue**: Upstash Redis
- **Validation**: Zod
- **UI**: Tailwind CSS + Radix UI
- **Logging**: Pino

## 🤝 Contributing

This is a boilerplate - customize it for your needs!

## 📄 License

MIT

---

Built with ⚡️ by the Ayvlo team
