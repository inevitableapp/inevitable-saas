# INEVITABLE SaaS

INEVITABLE is a state-of-the-art career optimization platform built with Next.js, Prisma, and Stripe.

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Lucide React
- **Backend**: Next.js Server Actions, NextAuth.js
- **Database**: PostgreSQL (Supabase), Prisma ORM
- **Payments**: Stripe
- **Storage**: AWS S3 (via `@aws-sdk/client-s3`)
- **UI Components**: Shadcn/UI (Radix Primitives)

## Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe Account
- AWS S3 Bucket

### 2. Environment Setup
Create a `.env` file based on `.env.example`:
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="..."
```

### 3. Installation
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 4. Database Seeding
```bash
npx tsx prisma/seed.ts
```

## Features
- **Smart Onboarding**: Tailored experience based on user goals.
- **ATS Diagnostic**: Get a real score of your CV and identify lost opportunities.
- **CV Builder**: Build and export optimized resumes.
- **Job Tracker**: Manage your applications in a professional Kanban board.
- **AI Cover Letters**: Generate personalized letters for every job.

## Admin
Access `/admin` with a user that has `role: 'ADMIN'` to monitor metrics and manage prompts.
