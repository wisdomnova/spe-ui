# SPE UI — Public Portal

The official web portal for the Society of Petroleum Engineers, University of Ibadan Student Chapter (SPE UI). Built to serve student engineers with event registrations, student chapter elections, interactive technical calculation tools, academic resources, technical publications, and membership onboarding.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com/)

---

## Features

### 1. Industry Week and Event Ticketing System
- **Multi-Day Access Registration**: Registration for 5-day Industry Week conferences and technical symposiums.
- **Compulsory Attendee Verification**: Robust client and server-side validation ensuring complete attendee contact information (WhatsApp / Phone, Department, Membership Status).
- **Automated Access Code Generation**: Unique cryptographic access codes (`SPE-XXXXXX`) generated per attendee.
- **Transactional Invite Tickets**: Automated HTML/plain-text email tickets with boarding-pass styling dispatched instantly via Nodemailer.
- **Real-Time Admin Dispatch**: Instant administrative alerts dispatched to chapter executives on every registration.

### 2. Digital Elections and Student Voting
- **Secure Voter Authentication**: OTP-based and matric-verified voter authentication with fraud prevention.
- **Custom 3D Avatar Trait System**: Interactive Block Character generators and accessories built with Framer Motion.
- **Multi-Position Ballots**: Intuitive voting flow across executive positions with instant submission verification.

### 3. Petro-Tools and Interactive Student Hub
- **PetroCalc Suite**: Interactive engineering calculation engines for drilling hydraulics, reservoir estimations, and production flow metrics.
- **Academic Timetable and Notes**: Departmental timetable viewer and downloadable class notes library.
- **Interactive Engineering Games**:
  - *Barrel Stacker*: Physics-based balance mini-game.
  - *Emoji Decode*: Petroleum and Nigerian energy industry puzzle game.
  - *Reaction Test*: Reflex challenge for students.
- **Career Compass**: Guided career paths, internship directories, and industry mentorship resources.

### 4. Technical Blog and Publications
- Petroleum engineering articles, student spotlights, and chapter news.
- Real-time anonymous view counting with bot filtering and interactive like counters.

### 5. Sponsorship and Corporate Partnerships
- Digital sponsorship prospectus download engine with lead capture and executive alerts.

### 6. User Experience and Aesthetics
- Fluid dark/light theme transitions.
- Custom Three.js 3D space particles and glitter confetti canvas.
- Smooth Framer Motion spring physics and interactive peeled sticker effects.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Core Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations and 3D**: Framer Motion, Three.js
- **Database and Storage**: Supabase PostgreSQL
- **Email Delivery**: Nodemailer (SMTP)
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**, **pnpm**, or **yarn**
- A configured **Supabase** project instance

### 1. Clone the Repository

```bash
git clone https://github.com/wisdomnova/spe-ui.git
cd spe-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Public App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SECRET_ROLE=your-supabase-service-role-key

# Transactional Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

```bash
npm run build
npm run start
```

---

## Project Architecture

```
spe-ui/
├── app/
│   ├── api/                   # Backend Route Handlers
│   │   ├── events/register/   # Registration and ticket dispatch API
│   │   ├── elections/         # Voting and OTP verification
│   │   ├── blog-views/        # View counter and telemetry
│   │   ├── timetable/         # Timetable and notes endpoints
│   │   └── sponsor/           # Sponsorship brochure lead capture
│   ├── events/                # Events directory and /events/register page
│   ├── programs/              # PetroCalc, Games, Timetable, Sponsor
│   ├── blog/                  # Blog post directory and reader [slug]
│   ├── membership/            # Chapter membership onboarding
│   ├── about/                 # About SPE UI and Executive Team
│   └── page.tsx               # Interactive landing page
├── components/                # Reusable UI component library
│   ├── ConfettiSpaceBackground.tsx # 3D Three.js particle canvas
│   ├── GlitterConfetti.tsx   # Framer motion celebration confetti
│   ├── PeeledSticker.tsx      # Interactive peelable sticker CTA
│   ├── Header.tsx             # Responsive global navigation
│   └── Footer.tsx             # Global footer with newsletter signup
├── lib/                       # Utility libraries
│   ├── mailer.ts              # Nodemailer ticket and notification generator
│   └── supabase.ts            # Supabase client instances
└── supabase/migrations/       # Database schemas and SQL migration scripts
```

---

## Security and Best Practices

- **Row Level Security (RLS)**: Enforced across Supabase tables to safeguard user information and voting ballots.
- **Server-Only Execution**: Sensitive database mutations and email credentials are strictly isolated within Next.js server route handlers.
- **Strict Input Validation**: Sanity checks on all public forms preventing incomplete or malformed registration submissions.

---

## Society of Petroleum Engineers — University of Ibadan

- **Website**: [spe-ui.vercel.app](https://spe-ui.vercel.app)
- **Chapter**: University of Ibadan Student Chapter (#SPEUI)
- **Admin Portal**: [spe-ui-admin](https://github.com/wisdomnova/spe-ui-admin)

---

## License

This project is developed and maintained for the Society of Petroleum Engineers, University of Ibadan Student Chapter. All rights reserved.
