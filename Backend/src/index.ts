import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});

const supabase = createClient(
    // process.env.SUPABASE_URL!,
    // process.env.SUPABASE_SERVICE_ROLE!
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
);

app.post("/upload", upload.single("video"), async (req: any, res) => {
    const file = req.file;
    const title = req.body.title ?? "Untitled Video";

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // const cloudStream = cloudinary.uploader.upload_stream(
    //     {
    //         resource_type: "video",
    //         folder: "youtube-clone"
    //     },
    //     async (error, result) => {
    //         if (error || !result) return res.status(500).json({ error });

    //         const { data, error: dbError } = await supabase
    //             .from("videos")
    //             .insert({
    //                 title,
    //                 video_url: result.secure_url,
    //                 cloudinary_public_id: result.public_id
    //             })
    //             .select("*")
    //             .single();

    //         if (dbError) return res.status(500).json({ error: dbError });

    //         res.json(data);
    //     }
    // );

    const cloudStream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "youtube-clone" },
        async (error, result) => {
            try {
                if (error || !result) {
                    console.error("Cloudinary error:", error);
                    return res.status(500).json({ error });
                }

                console.log("Cloudinary result:", result);

                const { data, error: dbError } = await supabase
                    .from("videos")
                    .insert({
                        title,
                        video_url: result.secure_url,
                        cloudinary_public_id: result.public_id
                    })
                    .select("*")
                    .single();

                if (dbError) {
                    console.error("Supabase error:", dbError);
                    return res.status(500).json({ error: dbError });
                }

                console.log("Inserted video in Supabase:", data);
                res.json(data);
            } catch (err) {
                console.error("Unexpected error in upload callback:", err);
                res.status(500).json({ error: err });
            }
        }
    );

    cloudStream.end(file.buffer);
});

app.listen(4000, () => console.log("Server running on port 4000"));

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});






// Be able to delete uploads
app.delete("/videos/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Video ID is required" });

    // 1. Get the video from Supabase to retrieve Cloudinary public_id
    const { data: video, error: fetchError } = await supabase
        .from("videos")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !video) return res.status(404).json({ error: "Video not found" });

    try {
        // 2. Delete video from Cloudinary
        await cloudinary.uploader.destroy(video.cloudinary_public_id, { resource_type: "video" });

        // 3. Delete video record from Supabase
        const { error: deleteError } = await supabase
            .from("videos")
            .delete()
            .eq("id", id);

        if (deleteError) return res.status(500).json({ error: deleteError });

        res.json({ message: "Video deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete video" });
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

        const cloudStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: "youtube-clone"
            },
            async (error, result) => {
                if (error || !result) {
                    console.error("Cloudinary error:", error);
                    return res.status(500).json({ error });
                }

                console.log("Cloudinary result:", result);

                const { data, error: dbError } = await supabase
                    .from("videos")
                    .insert({
                        title,
                        video_url: result.secure_url,
                        cloudinary_public_id: result.public_id
                    })
                    .select("*")
                    .single();

                if (dbError) {
                    console.error("Supabase error:", dbError);
                    return res.status(500).json({ error: dbError });
                }

                res.json(data);
            }
        );

        cloudStream.end(file.buffer);
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
