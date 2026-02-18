export const generateThumbnail = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.playsInline = true;

        video.addEventListener("loadeddata", () => {
            // previous time
            // video.currentTime = 1;
            video.currentTime = 4;
        });

        video.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) return reject("Canvas context error");

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                if (!blob) return reject("Thumbnail blob failed");
                resolve(blob);
            }, "image/jpeg", 0.8);
        });

        video.addEventListener("error", (err) => reject(err));
    });
};
