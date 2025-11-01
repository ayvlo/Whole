@echo off
REM 🚀 Ayvlo Setup Script for Windows
REM Run this in Command Prompt or PowerShell on your LOCAL machine

echo.
echo 🎉 Starting Ayvlo SaaS Setup...
echo.

REM Step 1: Check Node.js
echo 📋 Step 1: Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is required but not installed.
    echo Please install from https://nodejs.org
    exit /b 1
)

REM Check pnpm
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing pnpm...
    npm install -g pnpm
)
echo ✅ Prerequisites OK
echo.

REM Step 2: Create .env.local if it doesn't exist
echo 📋 Step 2: Checking environment variables...
if not exist .env.local (
    echo Creating .env.local...
    (
        echo # ============================================
        echo # DATABASE - Supabase Connection
        echo # ============================================
        echo DATABASE_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
        echo DIRECT_URL="postgresql://postgres.ezpdjupcpgdqpixtlmzs:Adampoptropica7951!@aws-1-us-east-2.pooler.supabase.com:5432/postgres"
        echo.
        echo # ============================================
        echo # NEXTAUTH
        echo # ============================================
        echo NEXTAUTH_URL="http://localhost:3000"
        echo NEXTAUTH_SECRET="h9H/3HNPIPr87Ij71YlkPmOJpgEmkRldy2Mu2f6PkRA="
        echo.
        echo # ============================================
        echo # REDIS - Upstash
        echo # ============================================
        echo UPSTASH_REDIS_REST_URL="https://special-ladybug-31965.upstash.io"
        echo UPSTASH_REDIS_REST_TOKEN="AXzdAAIncDI2MmY4ZGFjNGZjZjg0ZTM3ODE3MDBkOWVjN2RkYzVmOXAyMzE5NjU"
        echo.
        echo # ============================================
        echo # APP CONFIG
        echo # ============================================
        echo NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ) > .env.local
)
echo ✅ Environment variables configured
echo.

REM Step 3: Install dependencies
echo 📦 Step 3: Installing dependencies...
call pnpm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Step 4: Generate Prisma Client
echo 🔨 Step 4: Generating Prisma Client...
call pnpm prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to generate Prisma Client
    exit /b 1
)
echo ✅ Prisma Client generated
echo.

REM Step 5: Push schema
echo 📊 Step 5: Pushing database schema to Supabase...
call pnpm db:push
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to push database schema
    exit /b 1
)
echo ✅ Database schema created
echo.

REM Step 6: Seed data
echo 🌱 Step 6: Seeding demo data...
call pnpm db:seed
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to seed data
    exit /b 1
)
echo ✅ Demo data seeded
echo.

REM Success
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎉 SUCCESS! Ayvlo SaaS is ready!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🚀 To start your app:
echo    pnpm dev
echo.
echo 📱 Then open:
echo    http://localhost:3000
echo.
echo 🧪 Test with this command in a new terminal:
echo    curl -X POST http://localhost:3000/api/ayvlo/ingest -H "Authorization: Bearer ayvlo_test_1234567890abcdef" -H "Content-Type: application/json" -d "[{\"metric\":\"test\",\"value\":100,\"timestamp\":\"2025-01-15T10:00:00Z\"},{\"metric\":\"test\",\"value\":1000,\"timestamp\":\"2025-01-15T11:00:00Z\"}]"
echo.
echo 📊 View database:
echo    pnpm db:studio
echo.
echo Happy coding! 🚀
echo.

pause
