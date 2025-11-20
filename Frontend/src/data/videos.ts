export interface Video {
    id: number;
    title: string;
    thumbnail: string;
}

export const allVideos: Video[] = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    title: `Video ${i + 1} title`,
    thumbnail: `https://picsum.photos/300/200?random=${i + 1}`,
}));
