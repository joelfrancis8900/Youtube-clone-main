import { useState } from "react";
import axios from "axios";
import { generateThumbnail } from "../../utilities/generateThumbnail";
import { uploadThumbnail } from "../../services/thumbnailService";


export default function Main() {


    const [video, setVideo] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState(""); // store public URL

    const handleUpload = async () => {
        if (!video) return alert("Pick a video");

        try {
            // 1️⃣ Generate thumbnail from selected video
            const thumbnailBlob = await generateThumbnail(video);

            // 2️⃣ Upload thumbnail to Supabase
            const thumbnailUrl = await uploadThumbnail(thumbnailBlob);

            // 3️⃣ Create form data for backend
            const formData = new FormData();
            formData.append("video", video);
            formData.append("title", title);
            formData.append("thumbnail_url", thumbnailUrl);

            // 4️⃣ Send everything to backend
            const res = await axios.post(
                "http://localhost:4000/upload",
                formData
            );

            console.log("Upload response:", res.data);
            alert("Uploaded!");

            setUploadedUrl(res.data.video_url);

        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed.");
        }
    };

    return (
        <main>
            <div>
                <div>Select video files to upload</div>
                <div>Your videos will be private until you publish them.</div>
            </div>
            <div>Select a video file to start uploading</div>






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
        </main>
    )

}
