import { SidebarUI } from "./SidebarUI";
import { RadialTreeUI } from "./RadialTreeUI";

export const TreeUI = {
    onClickNode: (activeNode, completedArticlesID)=>{
        RadialTreeUI.activateActiveNode(activeNode, completedArticlesID);
        SidebarUI.updateCard(activeNode.activeElement)
        SidebarUI.hideSearch()
        SidebarUI.clearSearch()
    },
    onChangeTree: (activeNode)=>{
        SidebarUI.clearUI()
        RadialTreeUI.displayConnections(activeNode)
    },
    onClearTreeAndSidebar: (activeNode, completedArticlesID)=>{
        SidebarUI.clearUI()
        try{
            RadialTreeUI.deactivateActiveNode(activeNode, completedArticlesID)
            activeNode.activeElement = null
            activeNode.activeTag = null
        } catch {
            return
        }
    }
};
