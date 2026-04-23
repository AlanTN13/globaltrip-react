import { useEffect, useRef } from 'react';

const CURSOR_SIZE = 32;
const CURSOR_OFFSET_X = 6;
const CURSOR_OFFSET_Y = 6;
const CURSOR_ANGLE = -35;

export default function CursorAvion() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (!hasFinePointer) {
      return undefined;
    }

    const moveMouse = (event) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - CURSOR_OFFSET_X}px, ${event.clientY - CURSOR_OFFSET_Y}px) rotate(${CURSOR_ANGLE}deg)`;
      }
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

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    handleMouseEnter();

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
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
        transform: `translate(-100px, -100px) rotate(${CURSOR_ANGLE}deg)`,
        transformOrigin: `${CURSOR_OFFSET_X}px ${CURSOR_OFFSET_Y}px`,
        willChange: 'transform',
      }}
    />
  );
}
