import * as d3 from "d3";
import { cameraFunctions } from "./cameraFunctions.js";
import { nodeUI } from "../ui/nodeUI.js";
import { DesktopUI } from "../ui/DesktopUI.js";
import { RadialTreeUI } from "../ui/RadialTreeUI.js";
import { PopupUI } from "../ui/PopupUI.js";
import { OnboardingUI } from "../ui/OnboardingUI.js";

export const nodeFunctions = {
  click: (activeNode, d, completedArticlesID, masteredArticlesID, camera, viewType) => {
    switch(viewType){
      case "default":
        nodeFunctions.clickDefault(activeNode, d, completedArticlesID, masteredArticlesID, camera)
        break;
      case "popup":
        nodeFunctions.clickPopup(activeNode, d, completedArticlesID, masteredArticlesID, camera)
        break;
      default:
        break;
    }
  },
  clickDefault: (activeNode, d, completedArticlesID, masteredArticlesID, camera) => {
    //If selection was the same node; clear the highlight as well as the UI
    if (activeNode.activeElement === d) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
      activeNode.activeElement = null;
      activeNode.activeTag = null;
      DesktopUI.resetCard();
      if (d3.select('#connections').node().checked) {
        RadialTreeUI.showAllConnections()
      }
      return;
    }

    //If there was a selection before selecting new one, clear properties of previous selected node
    if (activeNode.activeElement) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
      if (d3.select('#connections').node().checked) {
        RadialTreeUI.hideThisConnection(activeNode)
      }
    }
    
    //Update properties of clicked element
    activeNode.activeElement = d;
    activeNode.activeTag = d3.select(`#circle-${d.id}`).node();

    RadialTreeUI.activateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
    DesktopUI.updateCard(activeNode.activeElement)
    DesktopUI.hideSearch()
    DesktopUI.clearSearch()

    cameraFunctions.zoomOnNode(camera, activeNode.activeElement)
    if (d3.select('#connections').node().checked){
      RadialTreeUI.hideOtherConnections(activeNode)
    }
    return;
  },
  clickPopup: (activeNode, d, completedArticlesID, masteredArticlesID, camera) => {
    //If selection was the same node; clear the highlight as well as the UI
    if (activeNode.activeElement === d) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
      PopupUI.hidePopup(camera)
      activeNode.activeElement = null;
      activeNode.activeTag = null;
      return;
    }

    //If there was a selection before selecting new one, clear properties of previous selected node
    if (activeNode.activeElement) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
      PopupUI.hidePopup(camera)
    }
    
    //Update properties of clicked element
    activeNode.activeElement = d;
    activeNode.activeTag = d3.select(`#circle-${d.id}`).node();

    RadialTreeUI.activateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
    cameraFunctions.zoomOnNode(camera, activeNode.activeElement)
    PopupUI.revealPopup(activeNode.activeElement)
    cameraFunctions.lockCamera()
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
