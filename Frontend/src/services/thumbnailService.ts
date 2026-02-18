import { supabase } from "./../library/supabase";

export const uploadThumbnail = async (blob: Blob) => {
    const filePath = `thumbnails/${crypto.randomUUID()}.jpg`;

    const { error } = await supabase.storage
        .from("videos")
        .upload(filePath, blob, {
            contentType: "image/jpeg",
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from("videos")
        .getPublicUrl(filePath);

    return data.publicUrl;
};
