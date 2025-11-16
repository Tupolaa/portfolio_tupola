// MediaCarousel.js
import React, { useCallback, useEffect, useRef, useState } from "react";

function inferIsVideo(src = "") {
  const isYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(src);
  const isVideoFile = /\.(mp4|webm|ogg)$/i.test(src);
  return isYouTube || isVideoFile;
}

function getYouTubeEmbedUrl(url) {
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1`
    : url;
}

export default function MediaCarousel({ media = [] }) {
  const [index, setIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [fade, setFade] = useState(false);
  const count = media.length;
  const startX = useRef(null);

  const go = useCallback(
    (delta, user = false) => {
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
    (e) => {
      if (e.key === "ArrowRight") go(1, true);
      if (e.key === "ArrowLeft") go(-1, true);
    },
    [go]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Auto-rotate until user interacts
  useEffect(() => {
    if (!count || userInteracted) return;

    const timer = setInterval(() => {
      go(1);
    }, 10000);

    return () => clearInterval(timer);
  }, [count, go, userInteracted]);

  if (!count) return null;

  const safeIndex = ((index % count) + count) % count;
  const item = media[safeIndex];

  const isText = item.type === "text";
  const isHobbies = item.type === "hobbies";
  const isVideo =
    !isText &&
    !isHobbies &&
    (item.type ? item.type === "video" : inferIsVideo(item.src));
  const isYouTube = isVideo && /youtube|youtu\.be/.test(item.src);

  const onTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    setUserInteracted(true);
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const viewportStyle =
    isText || isHobbies
      ? {
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "#111",
          padding: "24px",
          boxSizing: "border-box",
        }
      : {
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          display: "grid",
          placeItems: "center",
          background: "#111",
          padding: 0,
          boxSizing: "border-box",
        };

  // 🔹 Build image list for text slides: support `image` and `images`
  let textImages = [];
  if (Array.isArray(item?.images)) {
    item.images.forEach((img, idx) => {
      if (!img) return;
      if (typeof img === "string") {
        textImages.push({
          src: img,
          alt: item.title || `Image ${idx + 1}`,
        });
      } else if (typeof img === "object" && img.src) {
        textImages.push({
          src: img.src,
          alt: img.alt || item.title || `Image ${idx + 1}`,
        });
      }
    });
  }
  if (item?.image) {
    // keep backward compatibility, add single image as first
    textImages.unshift({
      src: item.image,
      alt: item.imageAlt || item.title || "Image",
    });
  }

  return (
    <div
      className="mc-root"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Profile carousel"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        margin: "16px 0",
        borderRadius: 12,
        overflow: "hidden",
        background: "#0b0b0b",
      }}
    >
      {/* smooth transition wrapper */}
      <div
        className="mc-viewport"
        style={{
          ...viewportStyle,
          transition: "opacity 0.2s ease",
          opacity: fade ? 0 : 1,
        }}
      >
        {/* ---- CONTENT ---- */}
        {isHobbies ? (
          <div className="mc-hobbies-wrapper" style={{ width: "100%" }}>
            {item.title && (
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "16px",
                  color: "#00ffdd",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {item.title}
              </h3>
            )}
            <div
              className="mc-hobbies-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                width: "100%",
              }}
            >
              {Array.isArray(item.hobbies) &&
                item.hobbies.map((hobby, i) => (
                  <div
                    key={i}
                    className="mc-hobby-card"
                    style={{
                      borderRadius: 16,
                      border: "1px solid rgba(11, 240, 240, 1)",
                      padding: "16px",
                      background:
                        "radial-gradient(circle at top, #1e1e1e, #0b0b0b)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 12,
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "1.1rem",
                        margin: 0,
                        color: "#00ffdd",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {hobby.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.98rem",
                        lineHeight: 1.6,
                        margin: 0,
                        color: "#f5f5f5",
                      }}
                    >
                      {hobby.text}
                    </p>

                    {hobby.image && (
                      <img
                        src={hobby.image}
                        alt={hobby.name}
                        style={{
                          marginTop: 8,
                          width: "100%",
                          maxWidth: 160,
                          height: "auto",
                          borderRadius: 12,
                          objectFit: "cover",
                          border: "1px solid rgba(0, 58, 250, 0.16)",
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        ) : isText ? (
          <div
            className="mc-text-slide"
            style={{
              maxWidth: 1000,
              textAlign: "left",
              color: "#f5f5f5",
              margin: "0 auto",
            }}
          >
            {item.title && (
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "12px",
                  color: "#00ffdd",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {item.title}
              </h3>
            )}

            {Array.isArray(item.content)
              ? item.content
                  .filter(Boolean)
                  .map((p, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: "1.05rem",
                        lineHeight: 1.6,
                        marginBottom: "1px",
                        textAlign: "center",
                      }}
                    >
                      {p}
                    </p>
                  ))
              : item.content && (
                  <p
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      marginBottom: 0,
                      textAlign: "center",
                    }}
                  >
                    {item.content}
                  </p>
                )}

            {textImages.length > 0 && (
              <div
                className="mc-text-images"
                style={{
                  marginTop: 24,
                  display: "grid",
                  gridTemplateColumns:
                    textImages.length > 1
                      ? "repeat(auto-fit, minmax(180px, 1fr))"
                      : "1fr",
                  gap: 16,
                  justifyItems: "center",
                }}
              >
                {textImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      maxWidth: "700px",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "20%",
                      border: "3px solid #00ffdd",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : isVideo ? (
          isYouTube ? (
            <iframe
              key={item.src}
              src={getYouTubeEmbedUrl(item.src)}
              title={item.alt || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          ) : (
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
          )
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
        aria-label="Previous"
        onClick={() => go(-1, true)}
        className="mc-arrow mc-left"
        style={arrowStyle("left")}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(1, true)}
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
            onClick={() => {
              setUserInteracted(true);
              go(i - safeIndex);
            }}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: 0,
              background:
                i === safeIndex ? "white" : "rgba(255, 0, 0, 0.5)",
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
    background: "rgba(8, 62, 240, 1)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 22,
    lineHeight: 1,
    userSelect: "none",
  };
}
