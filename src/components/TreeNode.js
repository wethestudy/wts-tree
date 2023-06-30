import React, { useRef, useEffect } from "react";
import {nodeProperties} from "./properties.js";
import * as d3 from "d3";

const TreeNode = ({node, member, activeNode, camera, handleActiveNode}) => {
  const linkRef = useRef()
  const circleRef = useRef();
  const textRef = useRef();

  useEffect(()=>{
    let label = d => d.courseMapName
    const L = label == null ? null : label(node.data);
    d3.select(linkRef.current)
        .attr("transform", `rotate(${node.x * 180 / Math.PI - 90}) translate(${node.y},0)`);
    d3.select(circleRef.current)
        .attr("id", `circle-${node.data.id}`)
        .attr("fill", nodeProperties.fillColor(node, member))
        .attr("opacity", nodeProperties.opacity(node, member))
        .attr("stroke", "transparent")
        .attr("stroke-width", 0)
        .attr("r", nodeProperties.r)
        .on("click", (event) => nodeProperties.click(activeNode, node, member, camera, handleActiveNode))
        .on("mouseenter", (event) => nodeProperties.mouseover(`circle-${node.data.id}`))
        .on("mouseleave", (event) => nodeProperties.mouseleave(`circle-${node.data.id}`, node, member))
        .classed("", function(){
          node.data.isClicked = false
      }) 
    d3.select(textRef.current)
        .attr("transform", `rotate(${node.x >= Math.PI ? 180 : 0})`)
        .attr("dy", "0.32em")
        .attr("x", (node.x < Math.PI) === !node.children ? nodeProperties.textOffset : -nodeProperties.textOffset)
        .attr("text-anchor", (node.x < Math.PI) === !node.children ? "start" : "end")
        .attr("paint-order", "stroke")
        .attr("stroke", nodeProperties.halo)
        .attr("stroke-width", nodeProperties.haloWidth)
        .attr("font-size", "1rem") 
        .text(L);
  })

  return (
    <a href="#!" onClick={(e) => e.preventDefault()} ref={linkRef}>
      <circle ref={circleRef}></circle>
      <text ref={textRef}></text>
    </a>
  );
}

export default TreeNode