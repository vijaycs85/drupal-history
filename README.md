# 25 Years of Drupal - History Site

Celebrating 25 years of Drupal with a modern, interactive timeline. This project fetches history data from the community-maintained `drupal-timeline.json` and presents it in a beautiful, responsive interface.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Static Export)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## specific Features

- **Data Fetching**: Consumes live data from `https://github.com/weitzman/drupal-timeline`.
- **Modern Design**: Glassmorphism, scroll animations, and "Drupal Blue" branding.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Static Export**: Configured for easy deployment to GitHub Pages or similar static hosting.

## Getting Started

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run the development server**:
    ```bash
    pnpm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3.  **Build for production**:
    ```bash
    pnpm run build
    ```

## Data Source

The timeline data is sourced from [weitzman/drupal-timeline](https://github.com/weitzman/drupal-timeline). We fetch the raw JSON at build time to generate the static site.

## License

ISC
