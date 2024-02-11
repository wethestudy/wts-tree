import { PopupUI } from "../ui/PopupUI.js";
import { RadialTreeUI } from "../ui/RadialTreeUI.js";

export const popupFunctions = {
  click: (activeNode, completedArticlesID, masteredArticlesID, camera) => {
    RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID, masteredArticlesID);
    PopupUI.hidePopup(camera)
    activeNode.activeElement = null;
    activeNode.activeTag = null;
    return;
  },
};
