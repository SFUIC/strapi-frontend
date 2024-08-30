import { parseMediaExt } from "../utils/media-ext-parser";

interface PageHeaderProps {
  headingMain: string;
  headingSub: string;
  text?: string;
  font?: string;
  mediaSrc: string | null; // Media source URL (image, gif, or video)
  mediaExt: string | null; // Type of media: image or video
}

export default function PageHeader({
  headingMain,
  headingSub,
  text,
  font,
  mediaSrc,
  mediaExt,
}: PageHeaderProps) {
  const mediaType = parseMediaExt(mediaExt);
  return (
    <div className="relative w-full text-left overflow-hidden flex items-center justify-left" style={{ height: '160px' }}>
      {/* Background Media */}
      {mediaType === "video" ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={mediaSrc ? mediaSrc : ""}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="absolute top-0 left-0 w-full object-cover z-0"
          src={mediaSrc ? mediaSrc : ""}
          alt="Background Media"
        />
      )}

      {/* Overlay for darkening the background media */}
      <div className="absolute inset-0 ml-36 bg-black w-80 h-full -skew-x-12 opacity-50 z-10"></div>
      {/* Text Content */}
      <div className="relative ml-40 z-20" style={{ width: '300px' }}>
        <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white"
          style={{ fontFamily: font ? font : "Trebuchet MS" }}>
          {headingMain}
          <br />
          {headingSub}
        </h2>
        {text && (
          <p className="mt-4 text-lg lg:text-xl text-white">
            {text}
          </p>
        )}
      </div>

    </div>
  );
}
