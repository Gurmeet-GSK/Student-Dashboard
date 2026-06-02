# Scholar Board — Next-Gen Learning Dashboard

A futuristic, dark-themed student learning dashboard.

**Live Demo:** [student-dashboard-gilt-three.vercel.app/](https://student-dashboard-gilt-three.vercel.app/)  
**Repository:** [github.com/Gurmeet-GSK/Student-Dashboard](https://github.com/Gurmeet-GSK/Student-Dashboard)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework with Server/Client component model |
| TypeScript | Type safety across all components and data payloads |
| Supabase | PostgreSQL database for course data |
| Framer Motion | Animations with spring physics |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icon library |
| Recharts | Data visualization for learning analytics |

---

## Architecture

### Server / Client Component Split

This project carefully separates server and client concerns following Next.js App Router conventions.

**Server Components** (no `'use client'` directive):
- `app/page.tsx` — root entry point, renders `DashboardShell`
- `app/components/views/DashboardView.tsx` — layout wrapper for the bento grid
- `app/components/views/CoursesView.tsx` — fetches and renders all courses from Supabase
- `app/components/CoursesGrid.tsx` — async Server Component, fetches course data
- `app/components/SkeletonCard.tsx` — static loading placeholder

**Client Components** (`'use client'` directive):
- `app/components/DashboardShell.tsx` — owns the `activeView` state for view-state navigation
- `app/components/Sidebar.tsx` — interactive navigation, collapse state, Framer Motion animations
- `app/components/HeroTile.tsx` — Framer Motion entrance animation
- `app/components/CourseCard.tsx` — hover animations with spring physics
- `app/components/CoursesStagger.tsx` — staggered entrance animation wrapper
- `app/components/ActivityTile.tsx` — interactive heatmap with hover tooltips
- `app/components/ProgressBar.tsx` — animated progress bar
- `app/components/LearningVelocity.tsx` — Recharts line chart with time-period filters
- `app/components/views/ActivityView.tsx` — analytics dashboard with charts
- `app/components/views/SettingsView.tsx` — controlled inputs and toggle state

### Why This Split?

The rule followed throughout: **if a component fetches data, it is a Server Component. If it has animations, hover effects, or state, it is a Client Component.**

`CoursesGrid` fetches from Supabase using `async/await` on the server before the page reaches the browser. It passes the data down to `CoursesStagger`, a Client Component that handles the Framer Motion stagger animation. This keeps data fetching on the server (faster, more secure) while keeping animations on the client (where they need the browser).

### View-State Navigation (No Routes)

Instead of creating separate Next.js routes for each sidebar item, the app uses a single `activeView` state string in `DashboardShell.tsx`. When a user clicks a nav item, the Sidebar calls `onNavigate(view)`, which updates the state and swaps which view component renders inside `<main>`. This means zero URL changes and zero page reloads — the experience feels like a native app.

### Data Flow
```
Supabase PostgreSQL
    ↓
CoursesGrid (Server Component — async fetch)
    ↓
CoursesStagger (Client Component — stagger animation)
    ↓
CourseCard (Client Component — hover + progress bar animation)
```

---

## Key Features

- **Bento Grid Layout** — responsive CSS grid with Hero, Course, and Activity tiles
- **Staggered Page Load** — tiles animate in sequentially using Framer Motion `staggerChildren`
- **Spring Physics** — all hover and entrance animations use `type: 'spring', stiffness: 300, damping: 20`
- **Sidebar `layoutId`** — sliding nav highlight uses Framer Motion's `layoutId` for smooth transitions
- **Activity Heatmap** — 12-week contribution grid with hours-logged tooltips on hover
- **Animated Progress Bars** — animate from 0% to real Supabase value on mount
- **Learning Velocity Chart** — Recharts line graph with time-period toggles (7D, 30D, ALL)
- **Skeleton Loading** — `<Suspense>` boundary shows pulsing skeleton cards while Supabase responds
- **Collapsible Sidebar** — smooth spring-animated width transition, icons-only mode
- **Responsive Design** — desktop sidebar, tablet-optimized layout, mobile single-column grid
- **Zero Layout Shifts** — all animations use `transform` and `opacity` only
- **Settings Management** — accessible form with email notifications and streak reminders

---

## Challenges & Solutions

**1. Async Server Component inside a Client Component tree**  
When `page.tsx` became a Client Component to hold `useState`, it broke `CoursesGrid` because async Server Components cannot be bundled for the client. The fix was to extract the client state into a separate `DashboardShell.tsx` and use Next.js `dynamic()` imports for the view components. This keeps `CoursesGrid` fully server-rendered while the shell handles interactivity.

**2. Framer Motion and Server Components**  
Framer Motion requires browser APIs so it cannot run in Server Components. Every component using `motion.*` has `'use client'` and is kept as a leaf in the component tree so it does not pull server components into the client bundle.

**3. Zero Layout Shifts with Animations**  
The assignment required animations using `transform` and `opacity` only. Card hover glows were implemented using a CSS `::after` pseudo-element that transitions its `opacity` rather than animating `box-shadow` directly, which would trigger repaints.

**4. Dynamic Icon Rendering**  
Course icons are stored as strings in Supabase (`"BookOpen"`, `"Code2"`, etc.) and resolved at runtime using `import * as LucideIcons from 'lucide-react'` and bracket notation: `LucideIcons[icon_name]`. A fallback to `BookOpen` handles any invalid icon names.

**5. Chart Container Sizing**  
Recharts `ResponsiveContainer` requires explicit pixel heights to measure properly. Set fixed heights (e.g., `height={350}`) to avoid width/height -1 errors.

**6. Font Preloading**  
Next's `next/font/google` automatically injects preload links. Set `preload: false` on font definitions to prevent browser warnings about unused preloaded resources.

---

## Database Schema

```sql
create table courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0,
  icon_name   text not null,
  created_at  timestamp with time zone default now()
);
```

### Seed Data

```sql
insert into courses (title, progress, icon_name) values
  ('Advanced Algorithms',  64, 'Code2'),
  ('System Design',        32, 'Server'),
  ('React Patterns',       78, 'Layers'),
  ('TypeScript Mastery',   45, 'FileCode'),
  ('Web Performance',      56, 'Zap'),
  ('Database Design',      82, 'Database');
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

See `.env.example` for the required variable names.

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Gurmeet-GSK/Student-Dashboard
cd learning-dashboard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and fill in your Supabase URL and publishable key

# 4. Run the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## Project Structure

```
learning-dashboard/
├── app/
│   ├── page.tsx                          # Root Server Component
│   ├── layout.tsx                        # App layout with font setup
│   ├── loading.tsx                       # Global skeleton screen
│   ├── globals.css                       # Dark theme base styles
│   ├── lib/
│   │   └── supabase.ts                   # Supabase client + Course interface
│   └── components/
│       ├── DashboardShell.tsx            # Client — view-state navigation controller
│       ├── Sidebar.tsx                   # Client — collapsible nav with layoutId
│       ├── HeroTile.tsx                  # Client — welcome banner
│       ├── CourseCard.tsx                # Client — animated course tile
│       ├── CoursesGrid.tsx               # Server — fetches from Supabase
│       ├── CoursesStagger.tsx            # Client — stagger animation wrapper
│       ├── ActivityTile.tsx              # Client — heatmap
│       ├── ProgressBar.tsx               # Client — animated bar
│       ├── LearningVelocity.tsx          # Client — Recharts line chart
│       ├── SkeletonCard.tsx              # Server — loading placeholder
│       └── views/
│           ├── DashboardView.tsx         # Server — bento grid layout
│           ├── CoursesView.tsx           # Server — full courses list
│           ├── ActivityView.tsx          # Client — analytics dashboard
│           └── SettingsView.tsx          # Client — settings form
├── public/                               # Static assets
├── .env.example                          # Environment variable template
├── next.config.ts                        # Next.js configuration
├── tsconfig.json                         # TypeScript configuration
├── postcss.config.mjs                    # PostCSS/Tailwind config
└── package.json                          # Dependencies and scripts
```

---

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

---

## Accessibility

- Form inputs have unique `id` and `name` attributes for proper autofill
- Labels are associated with inputs via `htmlFor`
- Toggle buttons have `role="switch"` and `aria-checked`
- ARIA labels provided for interactive elements

---

## Responsive Breakpoints

- **Mobile:** single-column layout, full-width cards
- **Tablet (sm, 640px+):** adjusted grid, stacked controls
- **Desktop (md, 768px+):** sidebar + main content, multi-column grid
- **Large (lg, 1024px+):** full bento grid layout

---

## Performance Considerations

- **Server Components** fetch data at build/request time, reducing client-side queries
- **Suspense Boundaries** enable incremental streaming of UI
- **Skeleton Cards** provide perceived performance during data fetch
- **Transform & Opacity Only** animations prevent layout recalculations
- **Image Optimization** via Next.js `next/image` (when applicable)
- **Font Optimization** via `next/font` with `preload: false` to avoid unnecessary preloads

---

## Future Enhancements

- [ ] User authentication and profiles via Supabase Auth
- [ ] Real-time streak counter with daily notifications
- [ ] Export learning data as PDF or CSV
- [ ] Dark/Light theme toggle
- [ ] Course progress forecasting with AI
- [ ] Mobile app version using React Native

---

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request with your improvements.

---

## License

This project is open source and available under the MIT License.

---

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainers directly.
