'use client';

import { useState } from 'react';
import { TimelineEvent } from '@/lib/api';
import { Calendar, User, ExternalLink, Share2, Check } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export function EventCard({ event }: { event: TimelineEvent }) {
    const [copied, setCopied] = useState(false);
    const dateObj = new Date(event.date);
    const formattedDate = format(dateObj, 'MMMM d, yyyy');

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${event.id}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-slate-800/50 hover:border-drupal-light/30 hover:shadow-xl hover:shadow-drupal-blue/5 transition-all duration-300">

            {/* Share Button (Top Right) */}
            <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-drupal-light hover:bg-white/5 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                aria-label="Share event"
                title="Copy link to event"
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
            </button>

            {copied && (
                <div className="absolute top-12 right-4 px-2 py-1 bg-slate-800 text-xs text-white rounded shadow-lg border border-white/10 animate-fade-in z-20">
                    Copied!
                </div>
            )}

            {/* Header Section */}
            <div className="flex items-start gap-4 mb-5">
                <div className="shrink-0 flex flex-col items-center w-16 text-center">
                    {event.avatar ? (
                        <img
                            src={event.avatar}
                            alt={event.username || 'User'}
                            className="w-12 h-12 rounded-full border-2 border-slate-700 transition-colors object-cover shadow-sm mb-2"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border-2 border-slate-700 transition-colors mb-2">
                            <User size={20} />
                        </div>
                    )}
                    {event.username && (
                        <p className="text-[10px] leading-tight text-slate-400 font-medium break-all">
                            @{event.username}
                        </p>
                    )}
                </div>

                <div className="flex-1 min-w-0 pr-8">
                    <a href={`#${event.id}`} className="group/date flex items-center gap-2 text-drupal-light text-xs font-bold uppercase tracking-wider mb-1 hover:text-white transition-colors">
                        <Calendar size={12} className="group-hover/date:scale-110 transition-transform" />
                        <time dateTime={event.date}>{formattedDate}</time>
                    </a>
                    <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-drupal-light transition-all">
                        {event.href ? (
                            <a href={event.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:gap-3 transition-all">
                                {event.title}
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 text-drupal-light transition-opacity" />
                            </a>
                        ) : (
                            event.title
                        )}
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="text-slate-300 prose prose-invert prose-sm max-w-none prose-a:text-drupal-light prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed">
                <ReactMarkdown>{event.description}</ReactMarkdown>
            </div>

            {/* Media Section */}
            {event.thumbnail && (
                <div className="mt-5 rounded-xl overflow-hidden border border-white/5 bg-slate-950/50 shadow-inner group-hover:shadow-none transition-shadow">
                    <img
                        src={event.thumbnail}
                        alt={`Thumbnail for ${event.title}`}
                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                </div>
            )}
        </div>
    );
}
