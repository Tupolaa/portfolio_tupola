import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,

  // Automated orbit options
  autoAnimate = true,
  autoSpeed = 0.8,
  autoScale = 1.06,

  // NEW: control pausing behavior
  pauseWhenHidden = true
}) {
  const ref = useRef(null);

  // motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  const [lastY, setLastY] = useState(0);

  // ---- FIX: track visibility and RAF id safely
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const isVisibleRef = useRef(true);               // IntersectionObserver result
  const isPageVisibleRef = useRef(true);           // Page Visibility API

  // Observe element visibility within viewport
  useEffect(() => {
    if (!pauseWhenHidden || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = !!entry?.isIntersecting;
        // Soft-dim when off-screen
        if (!isVisibleRef.current && autoAnimate) {
          opacity.set(0);
          scale.set(1); // avoid “stuck zoomed” when navigating away
        } else if (autoAnimate) {
          opacity.set(1);
          scale.set(autoScale);
        }
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [pauseWhenHidden, autoAnimate, autoScale, opacity, scale]);

  // Observe page/tab visibility
  useEffect(() => {
    if (!pauseWhenHidden) return;
    const onVis = () => {
      isPageVisibleRef.current = document.visibilityState === 'visible';
      // When user returns, bump opacity/scale back
      if (isPageVisibleRef.current && autoAnimate) {
        opacity.set(1);
        scale.set(autoScale);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    onVis();
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [pauseWhenHidden, autoAnimate, autoScale, opacity, scale]);

  // ===== Mouse interactions stay the same =====
  function handleMouse(e) {
    if (!ref.current || autoAnimate) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (autoAnimate) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    if (autoAnimate) return;
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  // ===== Automated orbiting tilt (RAFs safely started/stopped) =====
  useEffect(() => {
    // Always cancel any previous loop before starting a new one
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (!autoAnimate) {
      // Reset to neutral when disabling auto mode
      scale.set(1);
      opacity.set(0);
      rotateX.set(0);
      rotateY.set(0);
      return;
    }

    startRef.current = performance.now();
    scale.set(autoScale);
    opacity.set(1);

    const tick = (now) => {
      // Pause updates when off-screen or tab hidden
      const shouldRun =
        !pauseWhenHidden ||
        (isVisibleRef.current && isPageVisibleRef.current);

      if (shouldRun) {
        const t = (now - startRef.current) / 1000;
        const rx = Math.sin(t * autoSpeed) * rotateAmplitude;
        const ry = Math.cos(t * autoSpeed) * rotateAmplitude;

        rotateX.set(rx);
        rotateY.set(ry);

        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          x.set(rect.width / 2);
          y.set(rect.height / 2);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Ensure nothing stays “tilted” across page switches
      rotateX.set(0);
      rotateY.set(0);
      opacity.set(0);
      scale.set(1);
    };
  }, [autoAnimate, autoSpeed, rotateAmplitude, autoScale, pauseWhenHidden]); // deps intentionally exclude motion values

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{ width: imageWidth, height: imageHeight }}
        />
        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
