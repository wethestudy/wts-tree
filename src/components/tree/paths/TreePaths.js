import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { pathUI } from "./pathUI.js";

export const TreePaths = ({ treeLinks, completedArticlesID, masteredArticlesID }) => {
  const pathRef = useRef();

  useEffect(() => {
    const pathGroup = d3.select(pathRef.current);
    pathGroup.attr("fill", "none")
      .attr("stroke-width", pathUI.pathProperties.strokeWidth)
      .selectAll("path")
      .data(treeLinks)
      .join("path")
      .attr("stroke", (d)=>pathUI.strokePath(d, completedArticlesID, masteredArticlesID))
      .attr("stroke-opacity", (d)=>pathUI.opacityPath(d, completedArticlesID, masteredArticlesID))
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));
  });

  return (
    <g ref={pathRef}></g>
  );
};
