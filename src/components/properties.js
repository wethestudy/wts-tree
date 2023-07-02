import * as d3 from "d3";
import { nodeUIFunctions, searchUIFunctions } from "./UIFunctions";
import { zoomOnNode } from "./zoomControls.js";
import evaluateLinks from "./evaluateLinks";

const relatedLinkProperties = {
  strokeWidth: 2,
  dasharray: "20, 5",
  strokeColor: (d)=>{
    let defaultStroke = "#555"
    return defaultStroke
  },
  strokeOpacity: (d)=>{
    let defaultOpacity = 0.25  
    return defaultOpacity
  }
}
const circleMarkerProperties = {
    refX: '5',
    refY: '5',
    activeFill: 'teal',
    neutralFill: "#555",
    markerWidth: '10',
    markerHeight: '10',
    cx: '5',
    cy: '5',
    r: '3',
    stroke: 'none'
  }
const pathProperties = {
  strokeWidth: 2,
  strokeColor: (d, member)=>{
    let defaultStroke = "#555"
    let completedList = member.completedArticlesID
    if (completedList.includes(d.source.id) 
        && completedList.includes(d.target.id)
        ) {
            defaultStroke = "teal"
        }
    return defaultStroke
  },
  strokeOpacity: (d, member)=>{
    let defaultOpacity = 0.1
      let completedList = member.completedArticlesID
      if (completedList.includes(d.source.id) 
          && completedList.includes(d.target.id)
          ) {
              defaultOpacity = 1
          }
      return defaultOpacity
  }
}
const nodeProperties = {
  r: 15,
  halo: "#fff",
  haloWidth: 3,
  textOffset: 6,
  fillColor: (d, member) => {
    let color = "lightgrey"
    switch(d.data.category){
        case "Mathematics" :
            color = "burlywood"
            break
        case "Physics" :
            color = "lightslategrey"
            break
        case "Engineering" :
            color = "darkgoldenrod"
            break
        default:
            color = "lightgrey"
            break
    }
    member.completedArticlesID.forEach(element => {
        if(element === d.data.id){     
            color = 'teal'
        }
    });
    return color
  },
  fillHover: () => {
    return 'teal'
  },
  opacity: (d, member) => {
    let opacity = 0.25
      member.completedArticlesID.forEach(element => {
          if(element === d.data.id){     
              opacity = 1.0
          }
      });
      return opacity
  },
  opacityHover: ()=>{
    return 1
  },
  activeState: (activeNode)=>{
    activeNode.activeElement.data.isClicked = true
    d3.select(activeNode.activeTag)
        .attr("r", nodeProperties.r*2)
        .attr("fill", nodeProperties.fillHover())
        .attr("opacity", nodeProperties.opacityHover())
  },
  hideActiveUI: () => {
    nodeUIFunctions.hideSidebar()
    searchUIFunctions.hideSearchUI()
  },
  mouseover: (node) => {
    d3.select(`#${node}`).transition()
      .attr("r", nodeProperties.r * 2)
      .attr("fill", "teal")
  },
  mouseleave: (node, d, member) => {
    if(!d.data.isClicked){
      d3.select(`#${node}`).transition()
      .attr("r", nodeProperties.r)
      .attr("fill", nodeProperties.fillColor(d, member))
  } else {
      d3.select(`#${node}`).transition()
      .attr("r", nodeProperties.r*2)
      .attr("fill", "teal")
  }},
  neutralState: (activeNode, member) => {
    activeNode.activeElement.data.isClicked = false
    d3.select(activeNode.activeTag)
      .transition()
      .attr("r", nodeProperties.r)
      .attr("fill", nodeProperties.fillColor(activeNode.activeElement, member))
      .attr("opacity", nodeProperties.opacity(activeNode.activeElement, member))
  },
  click: (activeNode, d, member, camera) => {
    //If selection was the same node; clear the highlight as well as the UI
    if(activeNode.activeElement === d){
      nodeProperties.neutralState(activeNode, member)
      activeNode.activeElement = null
      activeNode.activeTag = null
      evaluateLinks(activeNode)
      nodeProperties.hideActiveUI()
      return
    }

    //If there was a selection before selecting new one, clear properties of previous selected node
    if(activeNode.activeElement){
        nodeProperties.neutralState(activeNode, member)
        d3.selectAll('[id^=line]').style('visibility', 'hidden')
    }

    //Update properties of clicked element
    activeNode.activeElement = d
    activeNode.activeTag = d3.select(`#circle-${d.id}`).node()
    nodeProperties.activeState(activeNode)
    evaluateLinks(activeNode)
    nodeUIFunctions.showSidebar(activeNode.activeElement)
    searchUIFunctions.hideSearchUI()
    zoomOnNode(camera, activeNode.activeElement)
  },
}
const zoomProperties = {
  radius: 1750,
  minScale: 0.5,
  maxScale: 4,
  radiusFactor: 1.5,
  centerOffsetX: 3.75,
  centerOffsetY: 7
}

export {relatedLinkProperties, circleMarkerProperties, pathProperties, nodeProperties, zoomProperties}