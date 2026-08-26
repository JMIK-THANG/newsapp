# Chinlung Today

Chinlung Today is a modern, community-focused news platform for stories about Chin people, culture, education, business, and global affairs. The interface combines a clean editorial layout with responsive navigation, featured reporting, curated quick reads, and a latest-stories section.

## Features

- Responsive editorial homepage
- Mobile navigation menu and expandable search
- Featured hero story and curated quick reads
- Latest stories with category filters
- Newsletter sign-up interface
- Reusable, data-driven React components
- Responsive Tailwind CSS design
- Accessible semantic HTML and controls

## Built With

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) version 20 or newer.

### Installation

```bash
git clone git@github.com:JMIK-THANG/newsapp.git
cd newsapp/chinlung-news-frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Check the code with ESLint
```

## Project Structure

```text
src/
├── components/
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   └── LatestStories.jsx
│   ├── layout/
│   │   └── Navbar.jsx
│   └── ui/
│       └── Icon.jsx
├── data/
│   └── news.js
├── App.jsx
├── index.css
└── main.jsx
```

## Design Direction

The visual direction is inspired by modern editorial and news-media interfaces. Chinlung Today uses generous spacing, strong typography, warm neutral colors, rounded imagery, and a clear reading hierarchy to create an identity of its own.

## Current Status

The homepage navbar, hero, quick reads, newsletter card, and latest-stories section are complete. Article pages, category pages, working search, and backend news data can be added next.

## Author

Created by [JMIK-THANG](https://github.com/JMIK-THANG).

## License

This project is currently intended for personal and educational use.
