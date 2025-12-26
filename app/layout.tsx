import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DrupalLogo } from '@/components/DrupalLogo';
import { Heart } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '25 Years of Drupal',
    description: 'Celebrating the history and evolution of Drupal.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-drupal-dark/50 border-b border-white/10 shadow-lg shadow-blue-900/10">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-white">
                            <DrupalLogo className="h-10 w-auto text-drupal-light hover:text-white transition-colors" />
                        </div>
                    </div>
                </header>
                <main className="pt-20 pb-10 min-h-screen">
                    {children}
                </main>
                <footer className="py-8 text-center text-white/40 text-sm flex items-center justify-center gap-2">
                    <span>Made with</span>
                    <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                    <span>by</span>
                    <a href="https://www.drupal.org/u/vijaycs85" target="_blank" rel="noopener noreferrer" className="hover:text-drupal-light transition-colors underline decoration-dotted underline-offset-4">
                        vijaycs85
                    </a>
                    <span>&</span>
                    <a href="https://www.drupal.org/u/moshe-weitzman" target="_blank" rel="noopener noreferrer" className="hover:text-drupal-light transition-colors underline decoration-dotted underline-offset-4">
                        moshe
                    </a>
                </footer>
            </body>
        </html>
    );
}
