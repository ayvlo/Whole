#!/bin/bash
# 🚀 Ayvlo Setup Script - Run this on your LOCAL machine
# This script will set up your entire Ayvlo SaaS platform

set -e  # Exit on error

echo "🎉 Starting Ayvlo SaaS Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo -e "${BLUE}📋 Step 1: Checking prerequisites...${NC}"
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Install from https://nodejs.org"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "❌ pnpm is required. Installing..."; npm install -g pnpm; }
echo -e "${GREEN}✅ Prerequisites OK${NC}"
echo ""

# Step 2: Verify .env.local exists
echo -e "${BLUE}📋 Step 2: Checking environment variables...${NC}"
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found. Creating from your credentials...${NC}"
    cat > .env.local << 'EOF'
# ============================================
# DATABASE - Supabase Connection
# ============================================
DATABASE_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# ============================================
# NEXTAUTH (REQUIRED)
# ============================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="h9H/3HNPIPr87Ij71YlkPmOJpgEmkRldy2Mu2f6PkRA="

# ============================================
# REDIS - Upstash (REQUIRED)
# ============================================
UPSTASH_REDIS_REST_URL="https://special-ladybug-31965.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU"

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF
fi
echo -e "${GREEN}✅ Environment variables configured${NC}"
echo ""

# Step 3: Install dependencies
echo -e "${BLUE}📦 Step 3: Installing dependencies (this may take 2-3 minutes)...${NC}"
pnpm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 4: Generate Prisma Client
echo -e "${BLUE}🔨 Step 4: Generating Prisma Client...${NC}"
pnpm prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"
echo ""

# Step 5: Push schema to Supabase
echo -e "${BLUE}📊 Step 5: Pushing database schema to Supabase...${NC}"
pnpm db:push
echo -e "${GREEN}✅ Database schema created${NC}"
echo ""

# Step 6: Seed demo data
echo -e "${BLUE}🌱 Step 6: Seeding demo data...${NC}"
pnpm db:seed
echo -e "${GREEN}✅ Demo data seeded${NC}"
echo ""

# Success message
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 SUCCESS! Ayvlo SaaS is ready!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🚀 To start your app:${NC}"
echo -e "   ${YELLOW}pnpm dev${NC}"
echo ""
echo -e "${BLUE}📱 Then open:${NC}"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}🧪 Test API with:${NC}"
echo -e '   curl -X POST http://localhost:3000/api/ayvlo/ingest \'
echo -e '     -H "Authorization: Bearer ayvlo_test_1234567890abcdef" \'
echo -e '     -H "Content-Type: application/json" \'
echo -e '     -d '"'"'[{"metric":"test","value":100,"timestamp":"2025-01-15T10:00:00Z"},{"metric":"test","value":1000,"timestamp":"2025-01-15T11:00:00Z"}]'"'"
echo ""
echo -e "${BLUE}📊 View database:${NC}"
echo -e "   ${YELLOW}pnpm db:studio${NC} (opens at http://localhost:5555)"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
