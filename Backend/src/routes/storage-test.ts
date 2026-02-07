import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import { supabase } from "../lib/supabase";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/storage-test", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const fileName = `test/${crypto.randomUUID()}-${req.file.originalname}`;

  const { error } = await supabase.storage
    .from("videos")
    .upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const { data } = supabase.storage
    .from("videos")
    .getPublicUrl(fileName);

  res.json({
    success: true,
    url: data.publicUrl,
  });
});

// export default router;
export const storageTestRoute = router;
