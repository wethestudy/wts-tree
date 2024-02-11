import * as d3 from "d3";
import { UI } from "./UI.js";
import { cameraFunctions } from "../utilities/cameraFunctions.js";

export const PopupUI = {
  updatePopup: (d) => {
    let popupTitle = d3.select('#popup-title');
    let popupBlock = d3.select('#popup-block');
    let popupButton = d3.select('#popup-button');

    popupTitle.text(d.data.name);
    if (d.data.seoPostSummary) {
      popupBlock.text(d.data.seoPostSummary);
      popupBlock.style('background-color', 'transparent');
      popupBlock.style('height', 'auto');
    }
    if (d.data.link) {
      popupButton.attr('href', d.data.link);
    }
  },
  revealPopup: (d)=>{
    PopupUI.updatePopup(d)
    let popupCard = d3.select('#popup-card');
    popupCard.style("visibility", "visible")
    popupCard.style("top", "10%")
    popupCard.style("left", "10%")
  },
  resetPopup: () => {
    let popupTitle = d3.select('#popup-title');
    let popupBlock = d3.select('#popup-block');
    let popupButton = d3.select('#popup-button');

    popupTitle.text("Tree Node");
    UI.defaultBlock(popupBlock);
    popupButton.attr('href', "");
  },
  hidePopup: (camera) => {
    PopupUI.resetPopup()
    let popupCard = d3.select('#popup-card');
    popupCard.style("visibility", "hidden")
    cameraFunctions.unlockCamera(camera)
  },
//   clearPopup: ()=>{
//     PopupUI.resetPopup()
//     let popupCard = d3.select('#popup-card');
//     popupCard.style("visibility", "hidden")
//   },
};
