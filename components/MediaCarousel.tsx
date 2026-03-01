import React, { useCallback, useEffect, useRef, useState } from "react";

interface MediaItemBase {
  type?: string;
  src?: string;
  alt?: string;
  title?: string;
  content?: string | string[];
  images?: (string | { src: string; alt?: string })[];
  image?: string;
  imageAlt?: string;
  hobbies?: { name: string; text: string; image: string | null }[];
}

function inferIsVideo(src = "") {
  const isYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(src);
  const isVideoFile = /\.(mp4|webm|ogg)$/i.test(src);
  return isYouTube || isVideoFile;
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1`
    : url;
}

export default function MediaCarousel({ media = [] }: { media: MediaItemBase[] }) {
  const [index, setIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [fade, setFade] = useState(false);
  const count = media.length;
  const startX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number, user = false) => {
      if (!count) return;
      if (user) setUserInteracted(true);
      setFade(true);
      setTimeout(() => {
        setIndex((i) => (i + delta + count) % count);
        setFade(false);
      }, 180);
    },
    [count]
  );

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1, true);
      if (e.key === "ArrowLeft") go(-1, true);
    },
    [go]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  useEffect(() => {
    if (!count || userInteracted) return;
    const timer = setInterval(() => go(1), 10000);
    return () => clearInterval(timer);
  }, [count, go, userInteracted]);

  if (!count) return null;

  const safeIndex = ((index % count) + count) % count;
  const item = media[safeIndex];

  const isText = item.type === "text";
  const isHobbies = item.type === "hobbies";
  const isVideo =
    !isText && !isHobbies && (item.type ? item.type === "video" : inferIsVideo(item.src || ""));
  const isYouTube = isVideo && /youtube|youtu\.be/.test(item.src || "");

  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    setUserInteracted(true);
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  // Build image list for text slides
  let textImages: { src: string; alt: string }[] = [];
  if (Array.isArray(item?.images)) {
    item.images.forEach((img, idx) => {
      if (!img) return;
      if (typeof img === "string") {
        textImages.push({ src: img, alt: item.title || `Image ${idx + 1}` });
      } else if (typeof img === "object" && img.src) {
        textImages.push({ src: img.src, alt: img.alt || item.title || `Image ${idx + 1}` });
      }
    });
  }
  if (item?.image) {
    textImages.unshift({ src: item.image, alt: item.imageAlt || item.title || "Image" });
  }

  return (
    <div
      className="relative my-4 w-full overflow-hidden rounded-xl"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Media carousel"
    >
      {/* Viewport */}
      <div
        className={`w-full transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}
      >
        {isHobbies ? (
          <div className="w-full px-4 py-6">
            {item.title && (
              <h3 className="mb-6 text-center text-xl font-semibold uppercase tracking-wider text-cyan-400">
                {item.title}
              </h3>
            )}
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.isArray(item.hobbies) &&
                item.hobbies.map((hobby, i) => (
                  <div
                    key={i}
                    className="glass flex flex-col items-center gap-3 rounded-2xl p-5 text-center"
                  >
                    <h4 className="text-base font-semibold uppercase tracking-wide text-cyan-400">
                      {hobby.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {hobby.text}
                    </p>
                    {hobby.image && (
                      <img
                        src={hobby.image}
                        alt={hobby.name}
                        className="mt-2 h-auto w-full max-w-[160px] rounded-xl border border-cyan-400/10 object-cover"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ) : isText ? (
          <div className="mx-auto max-w-[1000px] px-6 py-6 text-slate-200">
            {item.title && (
              <h3 className="mb-4 text-center text-xl font-semibold uppercase tracking-wider text-cyan-400">
                {item.title}
              </h3>
            )}
            {Array.isArray(item.content)
              ? item.content.filter(Boolean).map((p, i) => (
                  <p key={i} className="mb-1 text-center text-base leading-relaxed">
                    {p}
                  </p>
                ))
              : item.content && (
                  <p className="text-center text-base leading-relaxed">{item.content}</p>
                )}
            {textImages.length > 0 && (
              <div
                className={`mt-6 grid gap-4 justify-items-center ${
                  textImages.length > 1
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {textImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    className="h-[300px] w-[90%] max-w-[700px] rounded-2xl border-2 border-cyan-400/30 object-cover md:h-[400px]"
                  />
                ))}
              </div>
            )}
          </div>
        ) : isVideo ? (
          isYouTube ? (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                key={item.src}
                src={getYouTubeEmbedUrl(item.src || "")}
                title={item.alt || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-xl border-0"
              />
            </div>
          ) : (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <video
                key={item.src}
                src={item.src}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          )
        ) : (
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <img
              key={item.src}
              src={item.src}
              alt={item.alt || ""}
              loading="lazy"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        )}
      </div>

      {/* Arrow buttons */}
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1, true)}
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/20 bg-blue-600/80 text-xl text-white backdrop-blur-sm transition-all hover:bg-blue-500"
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1, true)}
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/20 bg-blue-600/80 text-xl text-white backdrop-blur-sm transition-all hover:bg-blue-500"
          >
            &#8250;
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {media.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setUserInteracted(true);
                go(i - safeIndex);
              }}
              className={`h-3 w-3 cursor-pointer rounded-full border-0 p-1 transition-all ${
                i === safeIndex
                  ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
