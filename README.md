# Next JS 15 Template

This project was created as a starting point for Next.js 15 projects. It is based on the official Next.js 15 template, but includes a few additional features and configurations. It uses Tailwind CSS and the app router from Next.js. But, adds on some additional features like:

- Supabase Integration
- ShadCN Component Library

## Getting Started

First, create a supabase instance and get the url and key from the dashboard.

Then, create a `.env.local` file in the root of the project and add the following:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=<your-anon-key>
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
