import * as d3 from "d3";
import { cameraFunctions } from "./cameraFunctions.js";
import { RadialTreeUI } from "../ui/RadialTreeUI.js";
import { OnboardingUI } from "../ui/OnboardingUI.js";
import desktopTutorial1Style from "../../components/onboarding/desktoptutorial1.module.css"

export const onboardingFunctions = {
  clickTutorial: (activeNode, d, camera, completedArticlesID, masteredArticlesID) => {
    //If selection was the same node; clear the highlight as well as the UI
    if (activeNode.activeElement === d) {
      RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID, masteredArticlesID)
      activeNode.activeElement = null;
      activeNode.activeTag = null;
      OnboardingUI.resetCard();
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
    OnboardingUI.updateCard(activeNode.activeElement)

    if(d3.select('#onboarding1').classed(`${desktopTutorial1Style['onboarding1']}`)){
      OnboardingUI.showOnboarding2()
    }

    cameraFunctions.zoomOnNode(camera, activeNode.activeElement)
    if (d3.select('#connections').node().checked){
      RadialTreeUI.hideOtherConnections(activeNode)
    }
    return;
  },
};
