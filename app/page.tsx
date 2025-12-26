import { getTimelineData } from '@/lib/api';
import { Timeline } from '@/components/Timeline';

export default async function Home() {
    const events = await getTimelineData();

    return (
        <div className="min-h-screen">
            <section className="relative py-32 md:py-48 text-center px-4 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-drupal-blue/10 blur-[120px] rounded-full pointers-events-none" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-purple/5 blur-[100px] rounded-full pointers-events-none" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-drupal-light text-sm font-medium mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        History of Drupal
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
                        25 Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-drupal-light via-blue-400 to-accent-purple">Drupal</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        A visual journey through the evolution of the code, the community, and the milestones that defined a generation of the web.
                    </p>

                    <div className="pt-8">
                        <a
                            href="https://github.com/weitzman/drupal-timeline/issues/new"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-drupal-blue hover:bg-blue-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-drupal-blue/30"
                        >
                            <span>Submit an Event</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <Timeline events={events} />
        </div>
    );
}
