export function parseMediaExt(
  mediaExt: string | null
): "image" | "video" | null {
  if (!mediaExt) return null;

  const videoExtensions = ["mp4", "webm", "ogg"];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg", "bmp"];

  if (videoExtensions.includes(mediaExt.toLowerCase())) {
    return "video";
  } else if (imageExtensions.includes(mediaExt.toLowerCase())) {
    return "image";
  } else {
    return null;
  }
}
