# India Business Case Programme Portal

This repository contains the full-stack portal for the **India Business Case Programme**. 

The application is structured as a unified **Next.js App Router** project that handles the responsive user interfaces, serverless API routes, PostgreSQL database connections, and AI integrations (Gemini for the FAQ chatbot).

---

## Technical Stack

- **Core & Routing:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** PostgreSQL (using `pg` client pool)
- **Email Delivery:** Brevo SMTP (configured via REST API)
- **AI Brain (Chatbot):** Gemini 2.5 Flash (`@google/genai`)
- **Architecture:** Monolithic / Serverless API routes

---

## Directory Structure

```text
sy-internship/
├── database/            # Database schema & migrations
│   ├── schema.sql       # Active PostgreSQL table definitions
│   └── seed.sql         # Seed data for local prototyping
├── docs/                # Design specs & user guides
│   ├── api-design.md
│   ├── database-design.md
│   ├── requirements.md
│   └── workflow.md
├── frontend/            # Next.js Full-Stack Application
│   ├── app/             # App Router pages and API routes
│   │   ├── api/         # Serverless API routes (e.g., auth, chatbot)
│   │   ├── register/    # OTP team registration wizard
│   │   └── faq/         # Chatbot and FAQ list page
│   ├── components/      # UI components
│   ├── knowledge/       # FAQ & programme knowledge for Gemini context
│   └── lib/             # Database connection, Brevo & Gemini integration
├── uploads/             # Directory for local file storage mocks
└── package.json         # Root package file delegating to /frontend
```

---

## Getting Started

### Prerequisites

- **Node.js:** Ensure Node.js is installed.
- **PostgreSQL:** Ensure a PostgreSQL instance is running and has the tables defined in [database/schema.sql](file:///home/nishantraheja/sy-internship/database/schema.sql) configured.

### Installation

1. Install dependencies inside the `frontend` folder:
   ```bash
   cd frontend
   npm install
   ```

2. Configure environment variables. Create a `frontend/.env.local` file with the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
   GEMINI_API_KEY="your-gemini-api-key"
   BREVO_API_KEY="your-brevo-api-key"
   BREVO_SENDER_EMAIL="sender@yourdomain.com"
   BREVO_SENDER_NAME="Sender Name"
   ```

### Running the App

You can run commands directly from the **root directory** of the project:

- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Build Production Bundle:**
  ```bash
  npm run build
  ```
- **Run Linter:**
  ```bash
  npm run lint
  ```
