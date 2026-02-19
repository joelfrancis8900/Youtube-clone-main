// import { useState } from "react";
// import axios from "axios";
// import { generateThumbnail } from "../../utilities/generateThumbnail";
// import { uploadThumbnail } from "../../services/thumbnailService";

// export default function Main() {
//     const [video, setVideo] = useState<File | null>(null);
//     const [title, setTitle] = useState("");
//     const [uploadedUrl, setUploadedUrl] = useState(""); // store public URL

//     const handleUpload = async () => {
//         if (!video) return alert("Pick a video");

//         try {
//             // 1️⃣ Generate thumbnail from selected video
//             const thumbnailBlob = await generateThumbnail(video);

//             // 2️⃣ Upload thumbnail to Supabase and get its public URL
//             const thumbnailUrl = await uploadThumbnail(thumbnailBlob);

//             console.log("Thumbnail URL:", thumbnailUrl);

//             // 3️⃣ Create form data for backend
//             const formData = new FormData();
//             formData.append("video", video);
//             formData.append("title", title);
//             formData.append("thumbnail_url", thumbnailUrl); // ✅ send URL to backend

//             // 4️⃣ Send everything to backend
//             const res = await axios.post("http://localhost:4000/upload", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             console.log("Upload response:", res.data);
//             alert("Uploaded!");

//             setUploadedUrl(res.data.video_url);

//         } catch (err) {
//             console.error("Upload failed:", err);
//             alert("Upload failed. Check console for details.");
//         }
//     };

//     return (
//         <main>
//             <div>
//                 <div>Select video files to upload</div>
//                 <div>Your videos will be private until you publish them.</div>
//             </div>

//             <div>
//                 <label>Video title:</label>
//                 <input
//                     type="text"
//                     placeholder="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <label>Choose video:</label>
//                 <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
//                 />
//             </div>

//             <button onClick={handleUpload}>Upload</button>

//             {uploadedUrl && (
//                 <div style={{ marginTop: 20 }}>
//                     <h3>Uploaded Video Preview:</h3>
//                     <video src={uploadedUrl} controls width={480}></video>
//                 </div>
//             )}
//         </main>
//     );
// }


import { useState } from "react";
import axios from "axios";
import { generateThumbnail } from "../../utilities/generateThumbnail";
import { uploadThumbnail } from "../../services/thumbnailService";

export default function Main() {
    const [video, setVideo] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState(""); // uploaded video URL
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null); // for preview

    const handleUpload = async () => {
        if (!video) return alert("Pick a video");

        try {
            // 1️⃣ Generate thumbnail from the selected video
            const thumbnailBlob = await generateThumbnail(video);
            const thumbnailUrl = await uploadThumbnail(thumbnailBlob);

            // Show preview
            setThumbnailPreview(thumbnailUrl);
            console.log("Thumbnail URL:", thumbnailUrl);

            // 2️⃣ Create form data to send to backend
            const formData = new FormData();
            formData.append("video", video);
            formData.append("title", title);
            formData.append("thumbnail_url", thumbnailUrl); // send thumbnail URL

            // 3️⃣ Send video + thumbnail to backend
            const res = await axios.post("http://localhost:4000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Upload response:", res.data);
            alert("Upload successful!");

            // 4️⃣ Save uploaded video URL for preview
            setUploadedUrl(res.data.video_url);

            // 5️⃣ Reset form inputs
            setVideo(null);
            setTitle("");
            setThumbnailPreview(null);

        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Check console for details.");
        }
    };

    return (
        <main>
            <h2>Upload a Video</h2>
            <div>
                <label>Video Title:</label>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Select Video:</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
                />
            </div>

            {thumbnailPreview && (
                <div style={{ marginTop: 10 }}>
                    <h4>Thumbnail Preview:</h4>
                    <img src={thumbnailPreview} alt="Thumbnail Preview" width={200} />
                </div>
            )}

            <button onClick={handleUpload} style={{ marginTop: 10 }}>
                Upload
            </button>

            {uploadedUrl && (
                <div style={{ marginTop: 20 }}>
                    <h3>Uploaded Video Preview:</h3>
                    <video
                        src={uploadedUrl}
                        controls
                        width={480}
                        muted
                        autoPlay
                        loop
                        preload="metadata"
                    ></video>
                </div>
            )}
        </main>
    );
}
