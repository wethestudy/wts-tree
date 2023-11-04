import * as d3 from "d3";
import { cameraFunctions } from "./cameraFunctions.js";
import { nodeUI } from "../ui/nodeUI.js";
import { SidebarUI } from "../ui/SidebarUI.js";
import { RadialTreeUI } from "../ui/RadialTreeUI.js";
import { TreeUI } from "../ui/TreeUI.js";

export const nodeFunctions = {
  click: (activeNode, d, completedArticlesID, camera) => {
    //If selection was the same node; clear the highlight as well as the UI
    if (activeNode.activeElement === d) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID);
      activeNode.activeElement = null;
      activeNode.activeTag = null;
      SidebarUI.resetCard();
      if (d3.select('#connections').node().checked) {
        RadialTreeUI.showAllConnections()
      }
      return;
    }

    //If there was a selection before selecting new one, clear properties of previous selected node
    if (activeNode.activeElement) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID);
      if (d3.select('#connections').node().checked) {
        RadialTreeUI.hideThisConnection(activeNode)
      }
    }
    
    //Update properties of clicked element
    activeNode.activeElement = d;
    activeNode.activeTag = d3.select(`#circle-${d.id}`).node();
    TreeUI.onClickNode(activeNode, completedArticlesID)
    cameraFunctions.zoomOnNode(camera, activeNode.activeElement)
    if (d3.select('#connections').node().checked){
      RadialTreeUI.hideOtherConnections(activeNode)
    }
    return;
  },
  mouseover: (node) => {
    d3.select(`#circle-${node.data.id}`).transition()
      .attr("r", nodeUI.nodeProperties.r * 3)
  },
  mouseleave: (node) => {
    if (node.data.lockHover) {
      d3.select(`#circle-${node.data.id}`).transition()
        .attr("r", nodeUI.nodeProperties.r * 3)
    } else {
      d3.select(`#circle-${node.data.id}`).transition()
        .attr("r", nodeUI.nodeProperties.r)
    }
  },
};
