// import { v4 as uuidv4 } from "uuid";
// import { supabase } from "../library/supabase";

// export const uploadThumbnail = async (blob: Blob) => {
//     const filePath = `${uuidv4()}.jpg`;

//     const { error } = await supabase.storage
//         .from("thumbnails")
//         .upload(filePath, blob, { contentType: "image/jpeg" });

//     if (error) throw error;

//     const { data } = supabase.storage.from("thumbnails").getPublicUrl(filePath);

//     if (!data?.publicUrl) throw new Error("Failed to get thumbnail URL");

//     return data.publicUrl;
// };

import { supabase } from "../library/supabase"; // adjust path
import { v4 as uuidv4 } from "uuid"; // use uuid instead of crypto

export const uploadThumbnail = async (blob: Blob) => {
    const filePath = `thumbnails/${uuidv4()}.jpg`; // generate unique filename

    // Upload to thumbnails bucket
    const { error } = await supabase.storage
        .from("thumbnails") // make sure this bucket exists
        .upload(filePath, blob, {
            contentType: "image/jpeg",
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from("thumbnails")
        .getPublicUrl(filePath);

    return data.publicUrl;
};
