import {circleMarkerProperties} from "./properties.js";
import * as d3 from "d3";

function markerActive(markerRef, circleRef) {
  const marker = d3.select(markerRef.current);
  marker.attr('id', 'markerActiveCircle')
    .attr('refX', circleMarkerProperties.refX)
    .attr('refY', circleMarkerProperties.refY)
    .attr('fill', circleMarkerProperties.activeFill)
    .attr('markerWidth', circleMarkerProperties.markerWidth)
    .attr('markerHeight', circleMarkerProperties.markerHeight);

  const circle = d3.select(circleRef.current);
  circle.attr('cx', circleMarkerProperties.cx)
    .attr('cy', circleMarkerProperties.cy)
    .attr('r', circleMarkerProperties.r)
    .style('stroke', circleMarkerProperties.stroke);
}

function markerNeutral(markerRef, circleRef) {
  const marker = d3.select(markerRef.current);
  marker.attr('id', 'markerNeutralCircle')
    .attr('refX', circleMarkerProperties.refX)
    .attr('refY', circleMarkerProperties.refY)
    .attr('fill', circleMarkerProperties.neutralFill)
    .attr('markerWidth', circleMarkerProperties.markerWidth)
    .attr('markerHeight', circleMarkerProperties.markerHeight);

  const circle = d3.select(circleRef.current);
  circle.attr('cx', circleMarkerProperties.cx)
    .attr('cy', circleMarkerProperties.cy)
    .attr('r', circleMarkerProperties.r)
    .style('stroke', circleMarkerProperties.stroke);
}

export {markerActive, markerNeutral}