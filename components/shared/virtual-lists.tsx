
import { useCallback, useRef, useState, useMemo, useEffect } from "react";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function VirtualList({
  items,
  itemHeight,
  containerHeight,
  renderItem,
}: VirtualListProps<any>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef(0);
  const isScrollingRef = useRef(false);
  const requestRef = useRef<number>(null);

  const prevItemsLengthRef = useRef(items.length);

  const { startIndex, endIndex, visibleItems, offsetY, totalHeight } =
    useMemo(() => {
      const start = Math.max(0, Math.floor(scrollTop / itemHeight));
      const end = Math.ceil((scrollTop + containerHeight) / itemHeight);
      
  
      const maxItems = 6;
      const visible = items.slice(start, Math.min(start + maxItems, items.length));
      const offset = start * itemHeight;
      const total = items.length * itemHeight;

      return {
        startIndex: start,
        endIndex: start + maxItems,
        visibleItems: visible,
        offsetY: offset,
        totalHeight: total,
      };
    }, [scrollTop, itemHeight, containerHeight, items]);

  useEffect(() => {
    if (containerRef.current && prevItemsLengthRef.current !== items.length) {
      const currentScrollTop = scrollTopRef.current;
      if (currentScrollTop > 0) {
        containerRef.current.scrollTop = currentScrollTop;
      }
      prevItemsLengthRef.current = items.length;
    }
  }, [items.length]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    isScrollingRef.current = true;
    const newScrollTop = e.currentTarget.scrollTop;
    scrollTopRef.current = newScrollTop;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      setScrollTop(newScrollTop);
      isScrollingRef.current = false;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="border rounded-sm col-span-1 bg-white border-gray-300 h-full p-2 overflow-y-auto"
      style={{
        height: `${containerHeight}px`,
        position: "relative",
      }}
    >
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: `${offsetY}px`,
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          {visibleItems.length > 0 ? (
            visibleItems.map((item: any, idx: number) => (
              <div
                key={item.id}
                style={{
                  height: `${itemHeight}px`,
                  boxSizing: "border-box",
                }}
              >
                {renderItem(item, startIndex + idx)}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}