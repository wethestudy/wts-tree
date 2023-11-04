import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { markerUI } from "./ui/markerUI.js";

const TreeDefs = () => {
  const markerNeutralRef = useRef();
  const circleNeutralRef = useRef();

  useEffect(()=>{
    d3.select(markerNeutralRef.current)
      .attr('id', 'markerNeutralCircle')
      .attr('refX', markerUI.markerProperties.refX)
      .attr('refY', markerUI.markerProperties.refY)
      .attr('fill', markerUI.markerProperties.neutralFill)
      .attr('markerWidth', markerUI.markerProperties.markerWidth)
      .attr('markerHeight', markerUI.markerProperties.markerHeight);
    d3.select(circleNeutralRef.current)
      .attr('cx', markerUI.markerProperties.cx)
      .attr('cy', markerUI.markerProperties.cy)
      .attr('r', markerUI.markerProperties.r)
      .style('stroke', markerUI.markerProperties.stroke);
  })

  return (<defs>
    <marker ref={markerNeutralRef}>
      <circle ref={circleNeutralRef}></circle>
    </marker>
  </defs>);
}

export {TreeDefs}