import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { connectionUI } from "./connectionUI.js";
import { coordinates } from "../../utilities/coordinates.js";

const Connections = ({originNode, targetNode}) => {
  const linksRef = useRef();

  useEffect(()=>{
    let [originCoordinates, targetCoordinates] = coordinates.getConnectionCoordinates(originNode, targetNode)
    d3.select(linksRef.current)
      .transition()
      .attr("id", `line-${originNode.data.id}-${targetNode.data.id}`)
      .style("visibility", d3.select('#connections').node().checked ? 'visible' : 'hidden')
      .attr("stroke", connectionUI.defColor)
      .attr("stroke-dasharray", connectionUI.connectionProperties.dasharray)
      .attr("opacity", connectionUI.defOpacity)
      .attr("stroke-width", connectionUI.connectionProperties.strokeWidth)
      .attr("x1",`${originCoordinates.x}`)
      .attr("y1",`${originCoordinates.y}`)
      .attr("x2",`${targetCoordinates.x}`)
      .attr("y2",`${targetCoordinates.y}`)
      .attr("marker-start", "url(#markerNeutralCircle)")
      .attr("marker-end", "url(#markerNeutralCircle)")
  })
  return (<line ref={linksRef}></line>);
}

export const TreeConnections = ({treeConnections, activeNode}) => {
  return(
    <g>
      {treeConnections.map((object, index) => {
          return <Connections 
            key={index} 
            originNode={object.originNode} 
            targetNode={object.targetNode} 
          />
      })}
    </g>
  );
}