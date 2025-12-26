'use client';

import { Search } from 'lucide-react';

interface SearchFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
    return (
        <div className="relative max-w-md mx-auto w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-drupal-light/50" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-full leading-5 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-drupal-light/50 focus:border-drupal-light/50 sm:text-sm backdrop-blur-md shadow-lg transition-all"
                placeholder="Search events, years, or contributors..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
