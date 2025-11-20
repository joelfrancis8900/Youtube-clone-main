import { useEffect, useRef, useState } from "react";
import GridItem from "../GridItem/GridItem";
import { allVideos } from "../../data/videos";
import type { Video } from "../../data/videos";
import "./GridContainer.css";

function GridContainer() {
    // Show the first 12 videos initially
    const [visibleVideos, setVisibleVideos] = useState<Video[]>(allVideos.slice(0, 12));
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // Whenever "page" increases, show more videos
    useEffect(() => {
        const newVideos = allVideos.slice(0, page * 12);
        setVisibleVideos(newVideos);
    }, [page]);

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

    return (
        <div className="grid-container">
            {visibleVideos.map((video) => (
                <GridItem key={video.id} title={video.title} thumbnail={video.thumbnail} />
            ))}

            {/* The invisible "trigger" div that detects bottom scroll */}
            <div ref={loaderRef} style={{ height: "50px" }}></div>

            {/* Optional loading message */}
            {page * 12 < allVideos.length ? (
                <p style={{ textAlign: "center", margin: "1rem" }}>Loading more videos...</p>
            ) : (
                <p style={{ textAlign: "center", margin: "1rem" }}>No more videos!</p>
            )}
        </div>
    );
}

export default GridContainer;
