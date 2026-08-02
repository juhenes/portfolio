# Portfolio

Personal portfolio website showcasing my experience, projects, technical skills, certifications, and achievements in software development, cybersecurity, and artificial intelligence.

Built with modern frontend technologies and deployed using Cloudflare Pages.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* React Icons

### Development Tools

* ESLint
* Prettier
* Git

### Deployment

* Cloudflare Pages

## Features

* Responsive design for desktop, tablet, and mobile
* Dark-themed developer-focused interface
* Animated sections and transitions
* Project showcase
* Experience timeline
* Skills and technology overview
* Certifications and achievements section
* Resume download
* Contact section

## Project Structure

```
src/
├── assets/
├── components/
│   └── *.tsx
├── data/
│   └── *.ts
├── pages/
│   └── *.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
```

Navigate to the project folder:

```bash
cd portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This project is deployed using Cloudflare Pages.

Every push to the main branch automatically triggers a new deployment.

Build configuration:

```
Framework:
Vite

Build command:
npm run build

Output directory:
dist
```