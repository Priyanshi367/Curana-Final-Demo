// src/components/RegionMap.tsx
import { type CSSProperties } from "react";
import mapdetails from "@/assets/mapdetails.png";
import defaultAvatar from "@/assets/profile-avatar.jpg";

type RegionPerson = {
  name: string;
  title: string;
  avatar?: string;
};

export type Region = {
  name: string;
  people: RegionPerson[];
};

type RegionMapProps = {
  regions: Region[];
};

type Side = "top" | "bottom" | "left" | "right";

type RegionLayout = {
  anchor: { top: number; left: number }; // where the region is on the map
  side: Side;                             // where the card will sit relative to anchor
};

const REGION_LAYOUT: Record<string, RegionLayout> = {
  "West Region": {
    anchor: { top: 58, left: 10 },
    side: "left",
  },
  "Midwest Region": {
    anchor: { top: 12, left: 51 },
    side: "top",
  },
  "Northeast Region": {
    anchor: { top: 33, left: 85 },
    side: "right",
  },
  "Southeast Region": {
    anchor: { top: 60, left: 80 },
    side: "right",
  },
  "South Region": {
    anchor: { top: 80, left: 60 },
    side: "bottom",
  },
};

const RegionMap = ({ regions }: RegionMapProps) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-32">
      <div className="relative rounded-3xl  from-primary/10 via-primary/5 to-transparent ring-primary/20">
        {/* MAP */}
        <div className="relative mx-auto max-w-5xl aspect-[16/9]">
          <img
            src={mapdetails}
            alt="Regional leadership map"
            className="w-full h-full object-contain"
          />

          {/* dots + anchor points */}
          {regions.map((region) => {
            const layout = REGION_LAYOUT[region.name];
            if (!layout) return null;

            const { anchor } = layout;

            return (
              <div
                key={region.name + "-dot"}
                className="absolute z-10"
                style={{
                  top: `${anchor.top}%`,
                  left: `${anchor.left}%`,
                }}
              >
                <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary border-2 border-background shadow" />
              </div>
            );
          })}
        </div>

        {/* CARDS (positioned from same anchor points, but OUTSIDE the image) */}
        {regions.map((region) => {
          const layout = REGION_LAYOUT[region.name];
          if (!layout) return null;

          const { anchor, side } = layout;
          const offset = 14; // distance in px from the region point to card edge

          const cardStyle: CSSProperties = (() => {
            if (side === "top") {
              return {
                position: "absolute",
                top: `calc(${anchor.top}% - ${offset}px)`,
                left: `${anchor.left}%`,
                transform: "translate(-50%, -100%)",
              };
            }
            if (side === "bottom") {
              return {
                position: "absolute",
                top: `calc(${anchor.top}% + ${offset}px)`,
                left: `${anchor.left}%`,
                transform: "translate(-50%, 0)",
              };
            }
            if (side === "left") {
              return {
                position: "absolute",
                top: `${anchor.top}%`,
                left: `calc(${anchor.left}% - ${offset}px)`,
                transform: "translate(-100%, -50%)",
              };
            }
            // right
            return {
              position: "absolute",
              top: `${anchor.top}%`,
              left: `calc(${anchor.left}% + ${offset}px)`,
              transform: "translate(0, -50%)",
            };
          })();

          let arrowClass =
            "absolute h-3 w-3 bg-background border-primary/30 rotate-45";

          if (side === "left") {
            arrowClass +=
              " -right-2 top-1/2 -translate-y-1/2 border-r border-t";
          } else if (side === "right") {
            arrowClass +=
              " -left-2 top-1/2 -translate-y-1/2 border-l border-b";
          } else if (side === "top") {
            arrowClass +=
              " -bottom-2 left-1/2 -translate-x-1/2 border-b border-l";
          } else if (side === "bottom") {
            arrowClass +=
              " -top-2 left-1/2 -translate-x-1/2 border-t border-r";
          }

          return (
            <div key={region.name + "-card"} style={cardStyle}>
              <div className="relative w-72 max-w-xs rounded-2xl bg-background/95 border border-primary/30 shadow-xl px-4 py-4 backdrop-blur-sm">
                {/* this diamond sits right where the map edge is, so it looks like
                    the card is physically “touching” that region inside the map */}
                <div className={arrowClass} />

                <h4 className="text-sm font-semibold text-primary mb-3">
                  {region.name}
                </h4>
                <div className="space-y-3">
                  {region.people.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-3 text-left"
                    >
                      <img
                        src={p.avatar || defaultAvatar}
                        alt={p.name}
                        className="h-9 w-9 rounded-full object-cover border"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-xs font-medium leading-tight">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-tight">
                          {p.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionMap;
