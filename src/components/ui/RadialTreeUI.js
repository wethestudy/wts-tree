import * as d3 from "d3";
import { nodeUI } from "./nodeUI";

export const RadialTreeUI = {
    colorNodes: (descendants, completedArticlesID, activeNode)=>{
        d3.selectAll('#node-wrapper circle').nodes().forEach(node => {
            let id = d3.select(node).property('id').replace("circle-","")
            let nodeData = descendants.find(item=>item.id===id)
            d3.select(`#circle-${id}`)
              .attr("fill", ()=>nodeUI.fillNode(nodeData, completedArticlesID))
              .attr("opacity", ()=>nodeUI.opacityNode(nodeData, completedArticlesID, false))
          });
        try{
            d3.select(activeNode.activeTag)
              .attr("opacity", ()=>nodeUI.opacityNode(activeNode.activeElement, completedArticlesID, true))
        } catch{
            return
        }
    },
    activateActiveNode: (activeNode, completedArticlesID) => {
        activeNode.activeElement.data.lockHover = true;
        d3.select(activeNode.activeTag)
            .attr("r", nodeUI.nodeProperties.r * 3)
            .attr("fill", ()=>nodeUI.fillNode(activeNode.activeElement, completedArticlesID))
            .attr("opacity", ()=>nodeUI.opacityNode(activeNode.activeElement, completedArticlesID, true));
    },
    deactivateActiveNode: (activeNode, completedArticlesID) => {
        activeNode.activeElement.data.lockHover = false;
        d3.select(activeNode.activeTag)
            .transition()
            .attr("r", nodeUI.nodeProperties.r)
            .attr("fill", ()=>nodeUI.fillNode(activeNode.activeElement, completedArticlesID))
            .attr("opacity", ()=>nodeUI.opacityNode(activeNode.activeElement, completedArticlesID, false));
    },
    displayConnections: (activeNode)=> {
        let isChecked = d3.select('#connections').node().checked;
        switch (isChecked) {
          case true:
            if(activeNode.activeElement === null || activeNode.activeElement === undefined){
              RadialTreeUI.showAllConnections()
              
            } else {
              RadialTreeUI.showThisConnection(activeNode)
              RadialTreeUI.hideOtherConnections(activeNode)
            }
            break;
          case false:
            RadialTreeUI.hideAllConnections();
            break;
          default:
            RadialTreeUI.hideAllConnections();
            break;
        }
    },
    showAllConnections: ()=>{
        d3.selectAll('[id^=line]').style('visibility', 'visible')
    },
    hideAllConnections: ()=>{
        d3.selectAll('[id^=line]').style('visibility', 'hidden')
    },
    showThisConnection: (selectedNode) => {
        d3.selectAll('[id^=line]').style('visibility', 'visible')
        d3.selectAll('[id^=line]')
        .filter(function(){
            return this.id.includes(selectedNode.activeElement.id);
        })
        .style('visibility', 'visible')
    },
    hideThisConnection: (selectedNode) => {
        d3.selectAll('[id^=line]').style('visibility', 'visible')
        d3.selectAll('[id^=line]')
        .filter(function(){
            return this.id.includes(selectedNode.activeElement.id);
        })
        .style('visibility', 'hidden')
    },
    hideOtherConnections: (selectedNode) => {
        d3.selectAll('[id^=line]')
        .filter(function(){
            return !this.id.includes(selectedNode.activeElement.id);
        })
        .style('visibility', 'hidden')
    }
};
