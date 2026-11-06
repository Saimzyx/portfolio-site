import Image from "next/image";
import type { CSSProperties } from "react";
import { ArtworkImage } from "@/components/artwork-viewer";
import { connectorPoints, roundedConnector } from "@/lib/connector-path";
import type { DesignNode, DesignPage, LineNode, Point, ShapeNode } from "@/lib/design-types";
import { artworkLabels } from "@/lib/portfolio";

type Context = { width: number; height: number; scaleX: number; scaleY: number; pageWidth: number; page: number };
const percent = (value: number, total: number) => `${(value / total) * 100}%`;
const cqw = (value: number, width: number) => `${(value / width) * 100}cqw`;

function placement(node: DesignNode, context: Context): CSSProperties {
  return {
    position: "absolute",
    left: percent(node.x, context.width),
    top: percent(node.y, context.height),
    width: percent(node.width, context.width),
    height: percent(node.height, context.height),
    ...(node.rotation ? { transform: `rotate(${node.rotation}deg)` } : {}),
    ...(node.opacity !== undefined ? { opacity: node.opacity } : {}),
  };
}

function LineMarker({ point, adjacent, line }: { point: Point; adjacent: Point; line: LineNode }) {
  const size = line.strokeWidth * 2.8;
  const angle = (Math.atan2(point.y - adjacent.y, point.x - adjacent.x) * 180) / Math.PI;

  if (point.marker === "F") {
    return <rect x={point.x - size / 2} y={point.y - size / 2} width={size} height={size} fill="#ededed" stroke={line.stroke} strokeWidth={line.strokeWidth} />;
  }
  if (point.marker === "B" || point.marker === "C") {
    return <path d={`M ${-size} ${-size / 1.8} L 0 0 L ${-size} ${size / 1.8}${point.marker === "C" ? " Z" : ""}`} transform={`translate(${point.x} ${point.y}) rotate(${angle})`} fill={point.marker === "C" ? line.stroke : "none"} stroke={line.stroke} strokeWidth={line.strokeWidth * 0.75} strokeLinejoin="round" strokeLinecap="round" />;
  }
  return null;
}

function Connector({ node, context }: { node: LineNode; context: Context }) {
  const points = connectorPoints(node);
  return (
    <svg className="design-connector" viewBox={`0 0 ${context.width} ${context.height}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={roundedConnector(points, node.radius)} fill="none" stroke={node.stroke} strokeWidth={node.strokeWidth} strokeDasharray={node.dash?.map((n) => n * node.strokeWidth).join(" ")} strokeLinecap="round" strokeLinejoin="round" />
      {points.length > 1 && <><LineMarker point={node.start} adjacent={points[1]} line={node} /><LineMarker point={node.end} adjacent={points[points.length - 2]} line={node} /></>}
    </svg>
  );
}

function Shape({ node, context, style }: { node: ShapeNode; context: Context; style: CSSProperties }) {
  return (
    <svg style={style} className="design-shape" viewBox={`0 0 ${node.viewWidth} ${node.viewHeight}`} preserveAspectRatio="none" aria-hidden="true">
      {node.paths.map((part, index) => {
        const strokeStyle: CSSProperties = part.strokeWidth ? {
          strokeWidth: cqw(part.strokeWidth * context.scaleY, context.pageWidth),
          ...(part.dash ? { strokeDasharray: part.dash.map((n) => cqw(n * part.strokeWidth! * context.scaleY, context.pageWidth)).join(" ") } : {}),
        } : {};
        const props = {fill: part.fill, stroke: part.stroke, vectorEffect: "non-scaling-stroke" as const, style: strokeStyle};
        if (part.radius && part.d === "M0 0H64V64H0z") {
          return <rect key={index} width={node.viewWidth} height={node.viewHeight} rx={(part.radius / node.width) * node.viewWidth} ry={(part.radius / node.height) * node.viewHeight} {...props} />;
        }
        return <path key={index} d={part.d} {...props} />;
      })}
    </svg>
  );
}

function CanvasNode({ node, context }: { node: DesignNode; context: Context }) {
  const style = placement(node, context);
  if (node.type === "group") {
    const childContext: Context = {
      ...context,
      width: node.innerWidth,
      height: node.innerHeight,
      scaleX: context.scaleX * (node.width / node.innerWidth),
      scaleY: context.scaleY * (node.height / node.innerHeight),
    };
    return <div style={style} className="design-group" data-design-id={node.id}>{node.children.map((child) => <CanvasNode key={child.id} node={child} context={childContext} />)}</div>;
  }

  if (node.type === "line") return <Connector node={node} context={context} />;
  if (node.type === "shape") return <Shape node={node} context={context} style={style} />;

  if (node.type === "text") {
    const textStyle: CSSProperties = {
      ...style,
      fontFamily: `"${node.family}", sans-serif`,
      fontSize: cqw(node.fontSize * context.scaleY, context.pageWidth),
      fontWeight: node.weight,
      fontStyle: node.italic ? "italic" : "normal",
      lineHeight: node.lineHeight,
      textAlign: node.align,
      letterSpacing: node.letterSpacing,
      fontKerning: node.kerning,
      color: node.color,
    };
    const lines = <span className="design-text-content" style={{transform: `translateY(${cqw(node.baselineShift * context.scaleY, context.pageWidth)})`}}>{node.lines.map((line, index) => <span className="design-text-line" key={index}>{line || "\u00a0"}</span>)}</span>;
    const hidden = context.page === 1 || [6, 10, 13].includes(context.page);
    return node.href ? <a href={node.href} style={textStyle} className="design-text design-link" data-design-id={node.id}>{lines}</a> : <p style={textStyle} className="design-text" data-design-id={node.id} aria-hidden={hidden || undefined}>{lines}</p>;
  }

  const imageStyle: CSSProperties = node.crop ? {
    left: percent(node.crop.x, node.width),
    top: percent(node.crop.y, node.height),
    width: percent(node.crop.width, node.width),
    height: percent(node.crop.height, node.height),
    maxWidth: "none",
  } : { objectFit: "fill" };
  const label = artworkLabels[node.assetId];
  if (label) return <ArtworkImage src={node.src} label={label} style={style} imageStyle={imageStyle} sizes={`${Math.ceil((node.width * context.scaleX / context.pageWidth) * 100)}vw`} />;
  const {objectFit, ...cropStyle} = imageStyle;

  return (
    <div style={style} className="design-image" aria-hidden="true">
      <div style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%", ...cropStyle}}>
        <Image src={node.src} alt="" fill unoptimized sizes={`${Math.ceil((node.width * context.scaleX / context.pageWidth) * 100)}vw`} style={{objectFit}} preload={context.page === 1 && ["MAHXCsGwdCI", "MAHXCncnPwY"].includes(node.assetId)} />
      </div>
    </div>
  );
}

export function DesignCanvas({ page, className = "" }: { page: DesignPage; className?: string }) {
  const context: Context = {width: page.width, height: page.height, scaleX: 1, scaleY: 1, pageWidth: page.width, page: page.number};
  return <div className={`design-canvas ${className}`} style={{ aspectRatio: `${page.width} / ${page.height}` }} data-design-page={page.number}>{page.nodes.map((node) => <CanvasNode key={node.id} node={node} context={context} />)}</div>;
}

export function DesignFragment({ node, className = "" }: { node: DesignNode; className?: string }) {
  const context: Context = {width: node.width, height: node.height, scaleX: 1, scaleY: 1, pageWidth: node.width, page: 14};
  return <div className={`design-canvas ${className}`} style={{aspectRatio: `${node.width} / ${node.height}`}}><CanvasNode node={{...node, x: 0, y: 0}} context={context} /></div>;
}
