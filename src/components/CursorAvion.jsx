import { useEffect, useRef } from 'react';

const CURSOR_SIZE = 32;
const CURSOR_OFFSET_X = 6;
const CURSOR_OFFSET_Y = 6;
const FOLLOW_SPEED = 0.16;

export default function CursorAvion() {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (!hasFinePointer) {
      return undefined;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    const moveMouse = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    const animate = () => {
      posX += (mouseX - posX) * FOLLOW_SPEED;
      posY += (mouseY - posY) * FOLLOW_SPEED;

      const dx = mouseX - posX;
      const dy = mouseY - posY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posX - CURSOR_OFFSET_X}px, ${posY - CURSOR_OFFSET_Y}px) rotate(${angle}deg)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    handleMouseEnter();
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={cursorRef}
      src="/avion-pro.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden select-none sm:block"
      style={{
        width: `${CURSOR_SIZE}px`,
        opacity: 0,
        transform: 'translate(-100px, -100px)',
        transformOrigin: `${CURSOR_OFFSET_X}px ${CURSOR_OFFSET_Y}px`,
        willChange: 'transform',
      }}
    />
  );
}
