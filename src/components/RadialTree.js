import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import TreeNode from "./TreeNode.js";
import {markerActive, markerNeutral} from "./markerCircle.js";
import pathGroup from "./pathGroup.js";
import {zoomControls} from "./zoomControls.js";
import {treeSearch} from "./treeSearch.js";
import RelatedLinks from "./RelatedLinks.js";

const RadialTree = ({treeProps, camera, activeNode, handleActiveNode}) => {
  const svgRef = useRef();
  const markerActiveRef = useRef();
  const markerNeutralRef = useRef();
  const circleActiveRef = useRef();
  const circleNeutralRef = useRef();
  const pathRef = useRef();
  const nodeRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr('id', 'course-map')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
    markerActive(markerActiveRef, circleActiveRef);
    markerNeutral(markerNeutralRef, circleNeutralRef);
    zoomControls(svg, camera);
    pathGroup(pathRef, treeProps.root.links(), treeProps.member);
    treeSearch(treeProps.root.descendants(), {activeNode: activeNode, member: treeProps.member}, camera, handleActiveNode)
    // d3.select("#filter-button").on("click", constructFilterUI);
    // function constructFilterUI(){
    //   const wrapperVanilla = document.querySelector('#filter-wrapper')
    //   const visibilityBool = getComputedStyle(wrapperVanilla).visibility
    //   if (visibilityBool === "hidden"){
    //     d3.select('#filter-wrapper').style('visibility', 'visible')
    //   } else {
    //     d3.select('#filter-wrapper').style('visibility', 'hidden')
    //   }
    // }
    // d3.select("#related-links").property("checked",true)
});

  let linkArray = constructLinkArray(treeProps);

  return (
    <>
      <svg ref={svgRef}>
        <defs>
          <marker ref={markerActiveRef}>
            <circle ref={circleActiveRef}></circle>
          </marker>
          <marker ref={markerNeutralRef}>
            <circle ref={circleNeutralRef}></circle>
          </marker>
        </defs>
        <g ref={pathRef}></g>
        <g ref={nodeRef}>
          {treeProps.root.descendants().map((node, index)=>{
            return <TreeNode 
            node={node} 
            key={index}
            index={index}
            member={treeProps.member} 
            activeNode={activeNode}
            camera={camera}
            handleActiveNode={handleActiveNode}
            />
          })}
        </g>
        <g ref={linkRef}>
          {linkArray.map((object, index) => {
              return <RelatedLinks originNode={object.originNode} targetNode={object.targetNode} key={index} activeNode={activeNode}/>
          })}
        </g>
      </svg>
    </>
  );
};

function constructLinkArray(treeProps) {
  let linkArray = [];
  treeProps.root.descendants().forEach(originNode => {
    if (originNode.data.relatedLinks.length) {
      originNode.data.relatedLinks.forEach(originLink => {
        let targetNode = treeProps.root.descendants().find(node => node.id === originLink);
        linkArray.push({
          originNode: originNode,
          targetNode: targetNode
        });
      });
    }
  });
  return linkArray;
}

export default RadialTree;