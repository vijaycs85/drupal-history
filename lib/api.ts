export interface TimelineEvent {
    id: string;
    priority: number;
    date: string;
    title: string;
    username?: string;
    avatar?: string;
    href?: string;
    description: string;
    comment?: string;
    thumbnail?: string;
}

const DATA_URL = 'https://github.com/weitzman/drupal-timeline/raw/main/drupal-timeline.json';

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
}

export async function getTimelineData(): Promise<TimelineEvent[]> {
    try {
        const res = await fetch(DATA_URL, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const rawData: Omit<TimelineEvent, 'id'>[] = await res.json();

        const data: TimelineEvent[] = rawData.map(event => ({
            ...event,
            id: slugify(event.title)
        }));

        // Sort by date descending
        return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error fetching timeline data:', error);
        return [];
    }
}
