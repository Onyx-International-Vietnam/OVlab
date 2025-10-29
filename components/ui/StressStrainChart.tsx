// components/rooms/StressStrainChart.tsx
"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { STRESS_STRAIN } from "@/lib/data";

type Point = { strain: number; stress: number };

export default function StressStrainChart({
  data = STRESS_STRAIN,
}: {
  data?: Point[];
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 24, left: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="strain"
            type="number"
            domain={[0, 1]}
            tickCount={5}
            tickFormatter={(v) => String(v)}
            label={{ value: "Strain (%)", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            domain={[0, "dataMax + 10"]}
            tickCount={6}
            label={{ value: "Stress (MPa)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(v: number) => [`${v} MPa`, "Stress"]}
            labelFormatter={(l) => `Strain ${l}`}
          />
          <Line
            type="monotone"
            dataKey="stress"
            stroke="#2563eb" // brand.500
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
