import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import cors from "cors";
import { supabase } from "./lib/supabase";

import crypto from "crypto";


// import storageTestRoute from "./routes/storage-test";
import { storageTestRoute } from "./routes/storage-test";






const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });


app.listen(4000, () => console.log("Server running on port 4000"));

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});



app.delete("/videos/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Video ID is required" });

    try {
        // 1. Fetch the video row to get storage_path
        const { data: video, error: fetchError } = await supabase
            .from("videos")
            .select("*")
            .eq("id", id)
            .single();

        if (fetchError || !video) {
            return res.status(404).json({ error: "Video not found" });
        }

        // 2. Delete the file from Supabase Storage
        const { error: storageError } = await supabase.storage
            .from("videos")
            .remove([video.storage_path]);

        if (storageError) {
            console.error("Supabase Storage deletion error:", storageError);
            return res.status(500).json({ error: storageError.message });
        }

        // 3. Delete the video row from the database
        const { error: deleteError } = await supabase
            .from("videos")
            .delete()
            .eq("id", id);

        if (deleteError) {
            console.error("Supabase DB deletion error:", deleteError);
            return res.status(500).json({ error: deleteError.message });
        }

        // 4. Success
        res.json({ message: "Video deleted successfully" });
    } catch (err) {
        console.error("Unexpected deletion error:", err);
        res.status(500).json({ error: "Unexpected server error" });
    }
});



// Adding console.log of errors 
app.post("/upload", upload.single("video"), async (req: any, res) => {
    try {
        const file = req.file;
        const title = req.body.title ?? "Untitled Video";

        console.log("Received file:", file?.originalname);
        console.log("Received title:", title);

        if (!file) return res.status(400).json({ error: "No file uploaded" });


        // 1. Create a unique storage path
        const filePath = `videos/${crypto.randomUUID()}-${file.originalname}`;

        // 2. Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from("videos")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            return res.status(500).json({ error: uploadError.message });
        }

        // 3. Get public URL
        const { data } = supabase.storage
            .from("videos")
            .getPublicUrl(filePath);

        if (!data?.publicUrl) {
            return res.status(500).json({ error: "Failed to get public URL" });
        }

        // 4. Save video record in database
        const { data: video, error: dbError } = await supabase
            .from("videos")
            .insert({
                title,
                video_url: data.publicUrl,
                storage_path: filePath,
            })
            .select("*")
            .single();

        if (dbError) {
            console.error("Supabase DB error:", dbError);

            // Cleanup orphaned file
            await supabase.storage.from("videos").remove([filePath]);

            return res.status(500).json({ error: dbError.message });
        }

        // 5. Respond with saved video
        res.json(video);

    } catch (err) {
        console.error("Unexpected server error:", err);
        res.status(500).json({ error: "Unexpected server error" });
    }
});





app.get("/videos", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("videos")
            .select("*"); // get all columns

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ error });
        }

        res.json(data);
    } catch (err) {
        console.error("Backend error:", err);
        res.status(500).json({ error: err });
    }
});

app.use("/api", storageTestRoute);