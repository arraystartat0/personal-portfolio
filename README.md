# Personal Portfolio Website

A modern personal portfolio website built with Next.js, TypeScript, and Bootstrap v5.3.

## Features

- **About Page**: Personal introduction and information
- **Projects Page**: Showcase your projects with descriptions and technologies
- **Skills & Experience Page**: Display your skills and work experience
- **Sidebar Navigation**: Easy navigation between pages
- **Responsive Design**: Built with Bootstrap for mobile-friendly layouts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Update Your Information

1. **About Page** (`app/page.tsx`): Update your name, title, and bio
2. **Sidebar** (`app/components/Sidebar.tsx`): Change the name in the sidebar
3. **Projects** (`app/projects/page.tsx`): Add your actual projects
4. **Skills & Experience** (`app/skills/page.tsx`): Update your skills and work history

### Styling

This project uses Bootstrap v5.3. You can customize the styling by:
- Modifying Bootstrap classes in the components
- Adding custom CSS in `app/globals.css`
- Using Bootstrap's utility classes for quick styling

## Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── BootstrapClient.tsx  # Bootstrap JS loader
│   │   └── Sidebar.tsx           # Navigation sidebar
│   ├── projects/
│   │   └── page.tsx              # Projects page
│   ├── skills/
│   │   └── page.tsx              # Skills & Experience page
│   ├── globals.css               # Global styles with Bootstrap
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # About/Home page
├── public/                       # Static assets
└── package.json
```

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your site will be live!

Alternatively, you can use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
