'use client';

import { useState } from 'react';
import { TimelineEvent } from '@/lib/api';
import { EventCard } from './EventCard';
import { SearchFilter } from './SearchFilter';
import { motion, AnimatePresence } from 'framer-motion';

export function Timeline({ events }: { events: TimelineEvent[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = events.filter(event => {
        const searchLower = searchTerm.toLowerCase();
        return (
            event.title.toLowerCase().includes(searchLower) ||
            event.description.toLowerCase().includes(searchLower) ||
            (event.username && event.username.toLowerCase().includes(searchLower)) ||
            new Date(event.date).getFullYear().toString().includes(searchLower)
        );
    });

    // Group by year
    const groupedEvents = filteredEvents.reduce((acc, event) => {
        const year = new Date(event.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(event);
        return acc;
    }, {} as Record<number, TimelineEvent[]>);

    const years = Object.keys(groupedEvents).map(Number).sort((a, b) => b - a);

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 pb-32">
            <div className="mb-16">
                <SearchFilter value={searchTerm} onChange={setSearchTerm} />
            </div>

            <div className="space-y-24">
                <AnimatePresence>
                    {years.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-slate-400 py-20"
                        >
                            <p className="text-xl">No events found matching "{searchTerm}"</p>
                        </motion.div>
                    ) : (
                        years.map((year) => (
                            <motion.div
                                key={year}
                                className="relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Year Marker */}
                                <div className="sticky top-24 z-20 flex justify-center mb-12 pointer-events-none">
                                    <span className="bg-gradient-to-r from-drupal-blue to-blue-600 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg shadow-blue-900/20 backdrop-blur-md border border-white/10">
                                        {year}
                                    </span>
                                </div>

                                <div className="relative space-y-12 md:space-y-0">
                                    {/* Connecting Line (Desktop) */}
                                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent -translate-x-1/2" />

                                    {groupedEvents[year].map((event, idx) => {
                                        const isEven = idx % 2 === 0;
                                        return (
                                            <motion.div
                                                id={event.id}
                                                key={event.id}
                                                className={`relative flex items-center md:justify-between md:gap-8 ${isEven ? 'md:flex-row-reverse' : ''} scroll-mt-32`}
                                                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            >

                                                {/* Mobile Connector */}
                                                <div className="md:hidden absolute left-[-20px] top-0 bottom-0 w-px bg-slate-800">
                                                    <div className="absolute top-8 -left-[4px] w-2 h-2 rounded-full bg-drupal-blue ring-4 ring-slate-950" />
                                                </div>

                                                {/* Empty Space for Desktop layout balance */}
                                                <div className="hidden md:block w-5/12" />

                                                {/* Center Node (Desktop) */}
                                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                                                    <a
                                                        href={`#${event.id}`}
                                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-700 shadow-xl hover:border-drupal-light hover:bg-slate-800 transition-all group/node"
                                                        aria-label={`Link to ${event.title}`}
                                                    >
                                                        <div className="w-2.5 h-2.5 rounded-full bg-drupal-light animate-pulse group-hover/node:bg-white transition-colors" />
                                                    </a>
                                                </div>

                                                {/* Card Container */}
                                                <div className="w-full md:w-5/12 pl-6 md:pl-0">
                                                    <EventCard event={event} />
                                                </div>

                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

