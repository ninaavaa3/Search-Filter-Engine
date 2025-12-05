import { useCallback, useRef, useState } from "react";

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function  VirtualList ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
}: VirtualListProps<any>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
  const visibleItems = items.slice(
    startIndex,
    Math.min(endIndex + 1, items.length)
  );
  console.log({ visibleItems });

  const offsetY = startIndex * itemHeight;
  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="border rounded-sm col-span-1 bg-white border-gray-300 h-full p-2 grid grid-cols-1 gap-2 overflow-y-scroll"
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
            visibleItems.map((item:any, idx:number) => (
              <div key={item.id}>{renderItem(item, startIndex + idx)}</div>
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
};