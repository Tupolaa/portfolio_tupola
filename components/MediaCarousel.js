import React, { useCallback, useEffect, useRef, useState } from "react";

function inferIsVideo(src = "") {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

export default function MediaCarousel({ media = [] }) {
  const [index, setIndex] = useState(0);
  const count = media.length;
  const startX = useRef(null);

  if (!count) return null;
  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  // Keyboard nav
  const onKey = useCallback((e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }, [count]);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Touch swipe
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const item = media[index];
  const isVideo = item.type ? item.type === "video" : inferIsVideo(item.src);

  return (
    <div
      className="mc-root"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Project media carousel"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 900,
        margin: "16px auto",
        borderRadius: 12,
        overflow: "hidden",
        background: "#0b0b0b",
      }}
    >
      {/* viewport */}
      <div
        className="mc-viewport"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          display: "grid",
          placeItems: "center",
          background: "#111",
        }}
      >
        {isVideo ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="modal-video"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt || ""}
            className="modal-image"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {/* arrows */}
      <button
        type="button"
        aria-label="Previous media"
        onClick={() => go(-1)}
        className="mc-arrow mc-left"
        style={arrowStyle("left")}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next media"
        onClick={() => go(1)}
        className="mc-arrow mc-right"
        style={arrowStyle("right")}
      >
        ›
      </button>

      {/* dots */}
      <div
        className="mc-dots"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 8,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {media.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: 0,
              background: i === index ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    width: 36,
    height: 36,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 22,
    lineHeight: 1,
    userSelect: "none",
  };
}
