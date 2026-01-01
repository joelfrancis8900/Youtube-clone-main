import { useEffect, useState } from "react";
import axios from "axios";

type Video = {
    id: string;
    title: string;
    video_url: string;
};

export default function UploadVideosHome() {

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/videos/${id}`);
            // Remove deleted video from local state to update UI immediately
            setVideos(videos.filter(v => v.id !== id));
        } catch (err) {
            console.error("Failed to delete video:", err);
        }
    };





    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/videos")
            .then((res) => {
                console.log("Backend videos:", res.data);
                setVideos(res.data);
            })
            .catch((err) => {
                console.error("Error fetching videos:", err);
            });
    }, []);

    return (
        <div>
            <h1>Videos</h1>

            {Array.isArray(videos) &&
                videos.map((v) => (
                    <div key={v.id}>
                        <h3>{v.title}</h3>
                        <video width="500" controls src={v.video_url} />
                        <button onClick={() => handleDelete(v.id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
