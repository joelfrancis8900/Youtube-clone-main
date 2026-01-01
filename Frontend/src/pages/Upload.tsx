import { useState } from "react";
import axios from "axios";

export default function Upload() {
    const [video, setVideo] = useState<File | null>(null);
    const [title, setTitle] = useState("");

    const handleUpload = async () => {
        if (!video) return alert("Pick a video");

        const form = new FormData();
        form.append("video", video);
        form.append("title", title);

        console.log("FormData keys:", Array.from(form.entries()));

        try {
            const res = await axios.post("http://localhost:4000/upload", form);
            console.log("Upload response:", res.data);
            alert("Uploaded!");
        } catch (err: any) {
            console.error("Upload failed:", err.message);
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
            } else if (err.request) {
                console.error("No response received. Request:", err.request);
            }
            alert("Upload failed. Check console for details.");
        }


        // await axios.post("http://localhost:4000/upload", form);

        // alert("Uploaded!");
    };

    return (
        <div>
            <h1>Upload videos</h1>
            <div>Post a video on your channel</div>


            <div>Video title:</div>
            <input
                type="text"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="file"
                accept="video/*"
                // onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
                onChange={(e) => {
                    const selected = e.target.files?.[0] ?? null;
                    console.log("Selected file:", selected);
                    setVideo(selected);
                }}
            />

            <button onClick={handleUpload}>Upload</button>

        </div>
    );
}
