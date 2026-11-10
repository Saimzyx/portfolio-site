import type { LineNode } from "@/lib/design-types";

export type CanvasViewport = { top?: number; bottom?: number };

// Trim only the outer paper in Canva coordinates; keep artwork positions and
// typography unchanged. Negative insets give cropped decorations room to finish.
export const chapterViewports: Record<number, CanvasViewport> = {
  6: { bottom: 120 },
  10: { bottom: 28 },
};

export const desktopViewports: Record<number, CanvasViewport> = {
  ...chapterViewports,
  2: { top: 202.053543 },
  3: { bottom: -48 },
  4: { top: 56, bottom: 64 },
  5: { bottom: 54 },
  7: { bottom: 24 },
  8: { bottom: 54 },
  9: { bottom: 94 },
  11: { bottom: 214 },
  12: { bottom: 20 },
  14: { bottom: 108 },
  15: { bottom: 76 },
};

// Adjacent Canva pages differ by a few pixels at their shared line endpoints.
// Use the existing timeline's position to make those joins continuous.
export function connectSectionLine(line: LineNode, top: number, height: number): LineNode {
  const timelineX = 615.1123496310818;
  const toolsX = 79.37007874015748;

  switch (line.id) {
    case "LBNxjfpl2wYSQQ0W":
      return { ...line, end: { ...line.end, x: timelineX, y: top + height }, bends: [{ axis: "x", value: timelineX }] };
    case "LBDqcJcyxMjJ4MHq":
      return { ...line, end: { ...line.end, x: toolsX, y: top + height }, bends: [{ axis: "x", value: toolsX }] };
    case "LBDr1qgBHXNqLH9K":
    case "LBl4KXT3kX9JV2jf":
      return { ...line, start: { ...line.start, y: top }, end: { ...line.end, y: top + height } };
    case "LBgpKHYgJcll8WWs":
      return { ...line, start: { ...line.start, x: toolsX, y: top } };
    case "LB82jJySJSYrYMrz":
      return { ...line, start: { ...line.start, x: timelineX, y: top }, bends: [{ axis: "x", value: timelineX }, ...line.bends.slice(1)] };
    default:
      return line;
  }
}
