import { useState } from "react";
import axios from "axios";
import Header1 from "../components/Header1/Header1";
import Header from "../components/UploadPageComponents/Header";
import Main from "../components/UploadPageComponents/Main";

export default function Upload() {
    const [video, setVideo] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState(""); // store public URL

    const handleUpload = async () => {
        if (!video) return alert("Pick a video");

        const form = new FormData();
        form.append("video", video);
        form.append("title", title);

        console.log("FormData keys:", Array.from(form.entries()));

        try {
            const res = await axios.post("http://localhost:4000/upload", form, {
                headers: {
                    "Content-Type": "multipart/form-data", // ensures Multer handles it correctly
                },
            });

            console.log("Upload response:", res.data);
            alert("Uploaded!");
            setUploadedUrl(res.data.video_url); // save public URL to show video
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
    };

    return (
        <div>
            <Header1 />
            <Header />
            <Main />

            <div>
                <label>Video title:</label>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Choose video:</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;
                        console.log("Selected file:", selected);
                        setVideo(selected);
                    }}
                />
            </div>

            <button onClick={handleUpload}>Upload</button>

            {uploadedUrl && (
                <div style={{ marginTop: 20 }}>
                    <h3>Uploaded Video Preview:</h3>
                    <video src={uploadedUrl} controls width={480}></video>
                </div>
            )}
        </div>
    );
}
