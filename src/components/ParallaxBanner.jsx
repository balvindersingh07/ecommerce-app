import { useEffect, useRef, useState } from "react";

export default function ParallaxBanner({ imageUrl, height = 360, children }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setOffset(progress * 40); // parallax strength
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden rounded-2xl shadow-sm" style={{ height }}>
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${imageUrl})`, transform: `translateY(${offset}px)` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-center justify-center text-white px-6">
        {children}
      </div>
    </section>
  );
}
