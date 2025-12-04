// src/components/RegionMap.tsx
import { useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type RegionName =
  | "West Region"
  | "Midwest Region"
  | "Northeast Region"
  | "Southeast Region"
  | "South Region";

type Region = {
  name: RegionName;
  people: { name: string; title: string; avatar?: string }[];
};

type Props = {
  regions: Region[];
};

const REGION_BY_STATE: Record<string, RegionName> = {
  // West
  California: "West Region",
  Oregon: "West Region",
  Washington: "West Region",
  Nevada: "West Region",
  Idaho: "West Region",
  Montana: "West Region",
  Wyoming: "West Region",
  Utah: "West Region",
  Colorado: "West Region",
  Arizona: "West Region",
  "New Mexico": "West Region",

  // Midwest
  "North Dakota": "Midwest Region",
  "South Dakota": "Midwest Region",
  Nebraska: "Midwest Region",
  Kansas: "Midwest Region",
  Minnesota: "Midwest Region",
  Iowa: "Midwest Region",
  Missouri: "Midwest Region",
  Wisconsin: "Midwest Region",
  Illinois: "Midwest Region",
  Michigan: "Northeast Region",
  Indiana: "Midwest Region",
  Ohio: "Midwest Region",

  // Northeast
  Maine: "Northeast Region",
  Vermont: "Northeast Region",
  "New Hampshire": "Northeast Region",
  Massachusetts: "Northeast Region",
  "Rhode Island": "Northeast Region",
  Connecticut: "Northeast Region",
  "New York": "Northeast Region",
  "New Jersey": "Northeast Region",
  Pennsylvania: "Northeast Region",
  Delaware: "Northeast Region",
  Maryland: "Northeast Region",

  // Southeast
  Virginia: "Southeast Region",
  "West Virginia": "Southeast Region",
  Kentucky: "South Region",
  Tennessee: "South Region",
  "North Carolina": "Southeast Region",
  "South Carolina": "Southeast Region",
  Georgia: "Southeast Region",
  Florida: "Southeast Region",
  Alabama: "South Region",

  // South
  Texas: "West Region",
  Oklahoma: "South Region",
  Arkansas: "South Region",
  Louisiana: "South Region",
  Mississippi: "South Region",
};

const REGION_COLORS: Record<RegionName, string> = {
  "West Region": "#812E8A",      // purple
  "Midwest Region": "#1D3A7A",   // navy blue
  "Northeast Region": "#48C7B1", // teal / mint
  "Southeast Region": "#6D97E9", // light blue
  "South Region": "#F47B2F",     // orange
};

const RegionMap: React.FC<Props> = ({ regions }) => {
  const [hoverRegion, setHoverRegion] = useState<RegionName | null>(null);
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const regionByName = useMemo(() => {
    const map = new Map<RegionName, Region>();
    regions.forEach((r) => map.set(r.name as RegionName, r));
    return map;
  }, [regions]);

  const hovered = hoverRegion ? regionByName.get(hoverRegion) : null;
  const accentColor = hoverRegion ? REGION_COLORS[hoverRegion] : "#0f172a";

  return (
    <div ref={containerRef} className="relative w-full h-[550px] sm:h-[750px]">
      {/* MAP */}
      <ComposableMap projection="geoAlbersUsa" className="w-full h-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name as string;
              const regionName = REGION_BY_STATE[stateName];
              const fill = regionName
                ? REGION_COLORS[regionName]
                : "#e5e7eb"; // gray for unmapped

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    setHoveredStateName(stateName);
                    if (regionName) setHoverRegion(regionName);
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                    }
                  }}
                  onMouseMove={(e) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                    }
                  }}
                  onMouseLeave={() => {
                    setHoverRegion(null);
                    setHoveredStateName(null);
                    setTooltip(null);
                  }}
                  style={{
                    default: {
                      fill,
                      stroke: "#ffffff",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill,
                      stroke: "#111827",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: regionName ? "pointer" : "default",
                    },
                    pressed: {
                      fill,
                      stroke: "#111827",
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* STATE NAME LABEL (follows cursor) */}
      {hoveredStateName && tooltip && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            top: Math.max(4, Math.min(tooltip.y - 24, (containerRef.current?.clientHeight || 0) - 24)),
            left: Math.max(4, Math.min(tooltip.x + 12, (containerRef.current?.clientWidth || 0) - 160)),
          }}
        >
          <span className="inline-block rounded-md bg-slate-900/80 text-white text-[11px] leading-none px-2 py-1 shadow-md">
            {hoveredStateName}
          </span>
        </div>
      )}

      {/* HOVER PANEL (follows cursor) */}
      {hovered && tooltip && (
        <div
          className="pointer-events-none absolute"
          style={{
            top: Math.max(8, Math.min(tooltip.y + 12, (containerRef.current?.clientHeight || 0) - 120)),
            left: Math.max(8, Math.min(tooltip.x + 12, (containerRef.current?.clientWidth || 0) - 320)),
          }}
        >
          <div
            className="pointer-events-none max-w-sm w-[300px] rounded-2xl bg-white/95 shadow-xl border px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-md flex gap-3 sm:gap-4 items-start"
            style={{
              borderColor: accentColor,
              boxShadow: `0 18px 40px rgba(15,23,42,0.25)`,
            }}
          >
            {/* Accent bar */}
            <div
              className="hidden sm:block h-14 w-1.5 rounded-full mt-1"
              style={{ background: accentColor }}
            />

            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Regional leadership
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">
                {hovered.name}
              </p>

              <div className="mt-2 space-y-2">
                {hovered.people.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    {p.avatar && (
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="h-8 w-8 rounded-full object-cover border border-slate-200"
                      />
                    )}
                    <div className="leading-tight">
                      <p className="text-xs font-medium text-slate-900">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {p.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-1 text-[10px] text-slate-400">
                Hover over another region to see its leadership.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionMap;
