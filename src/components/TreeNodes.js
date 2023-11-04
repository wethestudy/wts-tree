import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { nodeFunctions } from "./utilities/nodeFunctions.js";
import { nodeUI } from "./ui/nodeUI.js";

const Node = ({ node, completedArticlesID, activeNode, cameraPosition }) => {
  const linkRef = useRef();
  const circleRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    let label = d => d.courseMapName;
    const L = label == null ? null : label(node.data);
    d3.select(linkRef.current)
      .attr("id", "node-wrapper")
      .attr("transform", `rotate(${node.x * 180 / Math.PI - 90}) translate(${node.y},0)`);
    d3.select(circleRef.current)
      .attr("id", `circle-${node.data.id}`)
      .attr("fill", ()=>nodeUI.fillNode(node, completedArticlesID))
      .attr("opacity", ()=>nodeUI.opacityNode(node, completedArticlesID, false))
      .attr("stroke", "transparent")
      .attr("stroke-width", 0)
      .attr("r", nodeUI.nodeProperties.r)
      .on("click", (event) => nodeFunctions.click(activeNode, node, completedArticlesID, cameraPosition))
      .on("mouseenter", (event) => {
        nodeFunctions.mouseover(node)
        nodeUI.fillNode(node, completedArticlesID)
      })
      .on("mouseleave", (event) => {
        nodeFunctions.mouseleave(node, completedArticlesID)
        nodeUI.fillNode(node, completedArticlesID)
      })
      .classed("", function () {
        node.data.lockHover = false;
      });
    d3.select(textRef.current)
      .attr("transform", `rotate(${node.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.32em")
      .attr("x", (node.x < Math.PI) === !node.children ? nodeUI.nodeProperties.textOffset : -nodeUI.nodeProperties.textOffset)
      .attr("text-anchor", (node.x < Math.PI) === !node.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", nodeUI.nodeProperties.halo)
      .attr("stroke-width", nodeUI.nodeProperties.haloWidth)
      .attr("font-size", "1rem")
      .text(L);
  });

  return (
    <a href="" onClick={(e) => e.preventDefault()} ref={linkRef}>
      <circle ref={circleRef}></circle>
      <text ref={textRef}></text>
    </a>
  );
};

const TreeNodes = ({treeDescendants, activeNode, completedArticlesID, cameraPosition}) => {
  return(
    <>
      <g id="node-group">
          {treeDescendants.map((node, index)=>{
            return <Node 
              key={index}
              node={node} 
              index={index}
              completedArticlesID={completedArticlesID} 
              activeNode={activeNode}
              cameraPosition={cameraPosition}
            />
          })}
      </g>
    </>
  );
}

export {TreeNodes}