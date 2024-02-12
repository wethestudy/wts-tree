import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { nodeFunctions } from "./nodeFunctions.js";
import { onboardingFunctions } from "../../tree-ui/elements/ui-onboarding/onboardingFunctions.js";
import { nodeUI } from "./nodeUI.js";

const Node = ({ node, completedArticlesID, masteredArticlesID, activeNode, cameraPosition, viewType, tutorial, selectedTrack }) => {
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
      .attr("fill", ()=>nodeUI.fillNode(node, completedArticlesID, masteredArticlesID))
      .attr("fill-opacity", ()=>nodeUI.opacityNode(node, completedArticlesID, masteredArticlesID, false))
      .attr("stroke", ()=>{
        switch(viewType){
          case "default":
            return nodeUI.strokeFill(node, selectedTrack)
          case "popup":
            return "transparent"
          default:
            break;
        }
      })
      .attr("stroke-width", "0.4%")
      .attr("stroke-opacity", 1)
      .attr("r", nodeUI.nodeProperties.r)
      .on("click", (event) => {
        if(tutorial){
          onboardingFunctions.clickTutorial(activeNode, node, cameraPosition, completedArticlesID, masteredArticlesID)
        } else {
          nodeFunctions.click(activeNode, node, completedArticlesID, masteredArticlesID, cameraPosition, viewType)
        }
      })
      .on("mouseenter", (event) => {
        nodeFunctions.mouseover(node)
        nodeUI.fillNode(node, completedArticlesID, masteredArticlesID)
      })
      .on("mouseleave", (event) => {
        nodeFunctions.mouseleave(node, completedArticlesID, masteredArticlesID)
        nodeUI.fillNode(node, completedArticlesID, masteredArticlesID)
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

const TreeNodes = ({treeDescendants, activeNode, completedArticlesID, masteredArticlesID, cameraPosition, viewType, tutorial, selectedTrack}) => {
  return(
    <>
      <g id="node-group">
          {treeDescendants.map((node, index)=>{
            return <Node 
              key={index}
              node={node} 
              index={index}
              completedArticlesID={completedArticlesID} 
              masteredArticlesID={masteredArticlesID}
              activeNode={activeNode}
              cameraPosition={cameraPosition}
              viewType={viewType}
              tutorial={tutorial}
              selectedTrack={selectedTrack}
            />
          })}
      </g>
    </>
  );
}

export {TreeNodes}