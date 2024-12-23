import useActivityTimeRangeCountByTopic from "$utils/useActivityTimeRangeCountByTopic";
import React, { useRef, useEffect } from "react";
import type { FromSchema } from "json-schema-to-ts";

import * as d3 from "d3";

import { NEXT_PUBLIC_REWATCH_GRAPH_COUNT_THRESHOLD } from "$utils/env";

type Props = {
  scope: boolean;
  topicId: number;
};

const PlotSchema = {
  type: "object",
  required: ["startMs", "count"],
  properties: {
    startMs: { type: "number" },
    count: { type: "number" },
  },
  additionalProperties: false,
} as const;

export type PlotSchema = FromSchema<typeof PlotSchema>;

export function PlotAndLineChart({
  plot,
  average,
  height = 250,
  marginTop = 20,
  //  marginRight = 20,  // 横幅いっぱいのとき
  marginRight = 110, // シークバーに合わせるとき
  marginBottom = 20,
  //  marginLeft = 20,   // 横幅いっぱいのとき
  marginLeft = 150, // シークバーに合わせるとき
}: {
  plot: PlotSchema[];
  average: PlotSchema[];
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    d3.selectAll("svg#rewatch-graph > *").remove();

    const svg = d3.select(svgRef.current);
    const width = divRef.current?.offsetWidth || 1000;

    svg
      .attr("id", "rewatch-graph")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    const maxStartMs = Math.max(...average.map((a) => a.startMs));

    const x = d3
      .scaleLinear()
      .domain([0, maxStartMs / 1000])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(plot, (d) => d.count) ?? 0])
      .range([height - marginBottom, marginTop]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll("circle")
      .data(plot)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.startMs / 1000))
      .attr("cy", (d) => y(d.count))
      .attr("r", 2.5)
      .attr("fill", "gray")
      .attr("opacity", 0.3);

    svg
      .append("path")
      .datum(average)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr(
        "d",
        d3
          .line<PlotSchema>()
          .x((d: PlotSchema) => x(d.startMs / 1000))
          .y((d: PlotSchema) => y(d.count))
      )
      .attr("opacity", 0.8);
  }, [average, plot, height, marginBottom, marginLeft, marginRight, marginTop]);

  return (
    <div ref={divRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
export default function ActivityRewatchGraph(props: Props) {
  const { scope, topicId } = props;
  const { data: counts } = useActivityTimeRangeCountByTopic(topicId, scope);

  const plot: PlotSchema[] =
    counts
      ?.map((c) => ({ startMs: c.startMs, count: c?.count || 0 }))
      .filter((c) => c.count <= NEXT_PUBLIC_REWATCH_GRAPH_COUNT_THRESHOLD) ||
    [];

  const plotEachStartMs = Object.groupBy(plot, (p: PlotSchema) => p.startMs); // ES2024
  const average: PlotSchema[] = [];
  for (const key of Object.keys(plotEachStartMs)) {
    const startMs = key;
    const count =
      plotEachStartMs[key]
        .map((p: PlotSchema) => p.count)
        .reduce((a: number, b: number) => {
          return a + b;
        }, 0) / plotEachStartMs[key].length || 0;
    average.push({ startMs: Number(startMs), count: count });
  }

  return (
    <>
      <PlotAndLineChart plot={plot} average={average} />
    </>
  );
}
