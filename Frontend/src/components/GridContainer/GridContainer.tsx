import { useEffect, useRef, useState } from "react";
import GridItem from "../GridItem/GridItem";
import styles from "./GridContainer.module.css";

function GridContainer() {

    type Video = {
        id: string;
        title: string;
        video_url: string;
        storage_path: string;
        created_at: string;
        thumbnail_url: string;
    };

    const [videos, setVideos] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const visibleVideos = videos.slice(0, page * 12);

    // Observe when the loader div comes into view (user scrolled to bottom)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting) {
                    // Load the next "page" of videos
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, []);


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("http://localhost:4000/videos");
                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error("Error fetching videos:", err);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className={styles['grid-container']}>

            {visibleVideos.map((video) => (
                <GridItem
                    key={video.id}
                    title={video.title}
                    videoUrl={video.video_url}
                    thumbnailUrl={video.thumbnail_url}
                />
            ))}

            {/* The invisible "trigger" div that detects bottom scroll */}
            <div ref={loaderRef} style={{ height: "50px" }}></div>

            {/* Optional loading message */}
            {/* {page * 12 < allVideos.length ? (
                <p style={{ textAlign: "center", margin: "1rem" }}>Loading more videos...</p>
            ) : (
                <p style={{ textAlign: "center", margin: "1rem" }}>No more videos!</p>
            )} */}
        </div>
    );
}

export default GridContainer;