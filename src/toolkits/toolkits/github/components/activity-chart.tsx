"use client";

import React, { useMemo } from "react";

import {
  Area,
  AreaChart,
  Customized,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import equal from "fast-deep-equal";

import { InfoTooltip } from "@/components/ui/info-tooltip";

import { cn } from "@/lib/utils";

const CHART_HEIGHT = 100;
const Y_AXIS_BUFFER = 0;
const DECAY_RATE = 0.95; // Decay rate for activity score (tune as needed)

interface Props {
  data: {
    timestamp: string;
    count: number;
  }[];
  hideDescription?: boolean;
  overlayColor?: string;
}

export const ActivityChart: React.FC<Props> = React.memo(
  ({ data, hideDescription = false, overlayColor }) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const chartData = useMemo(() => {
      // Calculate decaying activity score
      let score = 0;
      return data.map((day, index) => {
        score = score * DECAY_RATE + day.count;
        return {
          index,
          date: day.timestamp,
          count: score + Y_AXIS_BUFFER,
        };
      });
    }, [data]);

    return (
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "flex flex-row items-start justify-between gap-2 pb-0",
            hideDescription && "items-center",
          )}
        >
          <div className="flex flex-col">
            <div className="flex flex-row items-end gap-2">
              <h1 className="text-xl font-bold md:text-2xl">
                {hoveredIndex !== null
                  ? chartData[hoveredIndex]?.count.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  : chartData[chartData.length - 1]?.count.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 2,
                      },
                    )}
              </h1>
              {hoveredIndex !== null && chartData?.[hoveredIndex]?.date && (
                <p className="text-md text-muted-foreground/60 hidden md:block">
                  {new Date(chartData[hoveredIndex].date).toLocaleDateString()}
                </p>
              )}
            </div>
            {!hideDescription && (
              <div className="text-muted-foreground/60 flex items-center gap-1 font-bold">
                <h1 className="text-sm">Activity Index</h1>
                <InfoTooltip
                  content={`An approximation of commit momentum over time.`}
                  className="text-muted-foreground/60 size-4"
                  contentClassName="text-xs font-normal"
                />
              </div>
            )}
          </div>
        </div>
        <ResponsiveContainer width={"100%"} height={CHART_HEIGHT}>
          <AreaChart
            data={chartData}
            margin={{ top: 6, right: 0, bottom: -24, left: 0 }}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex != null) {
                setHoveredIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient
                id="contributionGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--primary)"
              fill="url(#contributionGradient)"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
              activeDot={false}
            />
            {/* Overlay faded rectangle to the right of hovered index using Customized for perfect alignment */}
            {hoveredIndex !== null && (
              <Customized
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={({ xAxisMap }: any) => {
                  if (!xAxisMap || !Array.isArray(xAxisMap) || !xAxisMap[0])
                    return null;
                  const xAxis = xAxisMap[0] as {
                    scale: (index: number) => number;
                    x: number;
                    width: number;
                  };
                  if (!xAxis?.scale || !chartData[hoveredIndex]) return null;
                  const x = xAxis.scale(chartData[hoveredIndex].index);
                  const width = xAxis.x + xAxis.width - x;
                  return (
                    <rect
                      x={x}
                      y={0}
                      width={width}
                      height={CHART_HEIGHT}
                      fill={overlayColor ?? "var(--card)"}
                      fillOpacity={0.7}
                      pointerEvents="none"
                    />
                  );
                }}
              />
            )}
            <XAxis
              dataKey="index"
              tick={false}
              tickLine={false}
              axisLine={false}
              interval={0}
              height={30}
            />
            <YAxis hide={true} allowDataOverflow={false} />
            <Tooltip content={() => null} cursor={false} />
            {hoveredIndex !== null && (
              <ReferenceLine
                x={chartData[hoveredIndex]?.index ?? 0}
                stroke="var(--primary)"
                strokeDasharray="2 2"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return equal(prevProps, nextProps);
  },
);

ActivityChart.displayName = "ActivityChart";

export const LoadingActivityChart: React.FC = React.memo(() => {
  const simulatedData = Array.from({ length: 15 }, (_, i) => ({
    date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    count: Math.floor(Math.random() * 5),
  }));

  const data = useMemo(() => {
    let sum = 0;
    return simulatedData.map((d) => ({
      ...d,
      count: (sum += d.count),
    }));
  }, [simulatedData]);

  return (
    <div className="h-full w-full animate-pulse">
      <ResponsiveContainer width={"100%"} height={CHART_HEIGHT}>
        <AreaChart
          data={data}
          margin={{ top: 6, right: 0, bottom: -24, left: 0 }}
          className="animate-pulse"
        >
          <defs>
            <linearGradient
              id="loadingCommitGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="rgb(var(--foreground))"
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor="rgb(var(--foreground))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="count"
            stroke="rgb(var(--foreground))"
            fill="url(#loadingCommitGradient)"
            strokeWidth={1.5}
            strokeOpacity={0.5}
            dot={false}
            isAnimationActive={false}
            connectNulls={false}
          />
          <XAxis
            dataKey="date"
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, "dataMax + 10"]}
            hide={true}
            scale="sqrt"
            allowDataOverflow={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

LoadingActivityChart.displayName = "LoadingActivityChart";
