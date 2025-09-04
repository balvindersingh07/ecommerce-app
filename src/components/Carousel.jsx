import { useRef } from "react";

export default function Carousel({ children }) {
  const scroller = useRef(null);
  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 py-2"
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            scroller.current.scrollLeft += e.deltaY; // vertical wheel => horizontal
          }
        }}
      >
        {Array.isArray(children)
          ? children.map((c, i) => (
              <div key={i} className="shrink-0 snap-start">{c}</div>
            ))
          : children}
      </div>
    </div>
  );
}
