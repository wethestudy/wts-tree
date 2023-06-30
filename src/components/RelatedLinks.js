import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { relatedLinkProperties } from "./properties.js";
import getCartesianCoordinate from "./getCartesianCoordinates.js";

const RelatedLinks = ({originNode, targetNode}, activeNode) => {
    const linksRef = useRef();
    useEffect(()=>{
      let originCoordinates = getCartesianCoordinate(originNode.x, originNode.y)
      let targetCoordinates
      try {
        targetCoordinates = getCartesianCoordinate(targetNode.x, targetNode.y)
      } catch {
        return;
      }
      d3.select(linksRef.current)
        .transition()
        .attr("id", `line-${originNode.data.id}`)
        .style("visibility", d3.select('#related-links').node().checked ? 'visible' : 'hidden')
        .attr("stroke", relatedLinkProperties.strokeColor)
        .attr("stroke-dasharray", relatedLinkProperties.dasharray)
        .attr("opacity", relatedLinkProperties.strokeOpacity)
        .attr("stroke-width", relatedLinkProperties.strokeWidth)
        .attr("x1",`${originCoordinates.x}`)
        .attr("y1",`${originCoordinates.y}`)
        .attr("x2",`${targetCoordinates.x}`)
        .attr("y2",`${targetCoordinates.y}`)
        .attr("marker-start", activeNode.activeElement != null ? "url(#markerActiveCircle)" : "url(#markerNeutralCircle)")
        .attr("marker-end", activeNode.activeElement != null ? "url(#markerActiveCircle)" : "url(#markerNeutralCircle)")
    })
  
    return (
      <line ref={linksRef}></line>
    );
  }

export default RelatedLinks