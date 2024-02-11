import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Camera } from "./Camera.js";
import { TreeDefs } from "./TreeDefs.js";
import { TreeNodes } from "./TreeNodes.js";
import { TreePaths } from "./TreePaths.js";
import { TreeConnections } from "./TreeConnections.js";
import radialTreeStyle from "./radialtree.module.css"

const RadialTree = ({treeState, tutorial, selectedTrack}) => {
  const svgRef = useRef();
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.attr('id', 'svg-tree')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
    Camera(svg, treeState.cameraPosition);
  });

  return (
    <div className={radialTreeStyle['radialtree-wrapper']}>
      <svg ref={svgRef}>
        <TreeDefs/>
        <TreeNodes 
          treeDescendants={treeState.root.descendants()}
          activeNode={treeState.activeNode.current}
          completedArticlesID={treeState.member.data.completedArticlesID}
          masteredArticlesID={treeState.member.data.masteredArticlesID}
          cameraPosition={treeState.cameraPosition}
          viewType={treeState.view.type}
          tutorial={tutorial}
          selectedTrack={selectedTrack}
        />
        <TreePaths 
          treeLinks={treeState.root.links()}
          completedArticlesID={treeState.member.data.completedArticlesID}
          masteredArticlesID={treeState.member.data.masteredArticlesID}
        />
        {treeState.view.type === "default" ? <TreeConnections 
          treeConnections={treeState.connections}
        /> : null}
      </svg>
    </div>
  );
};

export default RadialTree;
