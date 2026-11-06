import type { LineNode, Point } from "@/lib/design-types";

const same = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y) < 0.001;

export function connectorPoints(line: LineNode): Point[] {
  const points: Point[] = [line.start];
  let current = { ...line.start };

  for (const bend of line.bends) {
    current = { ...current, [bend.axis]: bend.value };
    if (!same(current, points[points.length - 1])) points.push(current);
  }

  if (line.bends.length && current.x !== line.end.x && current.y !== line.end.y) {
    const lastAxis = line.bends[line.bends.length - 1].axis;
    current = lastAxis === "x" ? { x: current.x, y: line.end.y } : { x: line.end.x, y: current.y };
    if (!same(current, points[points.length - 1])) points.push(current);
  }

  if (!same(line.end, points[points.length - 1])) points.push(line.end);
  return points;
}

export function roundedConnector(points: Point[], radius: number): string {
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const before = points[i - 1];
    const corner = points[i];
    const after = points[i + 1];
    const inLength = Math.hypot(corner.x - before.x, corner.y - before.y);
    const outLength = Math.hypot(after.x - corner.x, after.y - corner.y);
    const r = Math.min(radius, inLength / 2, outLength / 2);
    if (!r) {
      d += ` L ${corner.x} ${corner.y}`;
      continue;
    }
    const start = { x: corner.x - ((corner.x - before.x) / inLength) * r, y: corner.y - ((corner.y - before.y) / inLength) * r };
    const end = { x: corner.x + ((after.x - corner.x) / outLength) * r, y: corner.y + ((after.y - corner.y) / outLength) * r };
    d += ` L ${start.x} ${start.y} Q ${corner.x} ${corner.y} ${end.x} ${end.y}`;
  }

  const end = points[points.length - 1];
  return `${d} L ${end.x} ${end.y}`;
}
