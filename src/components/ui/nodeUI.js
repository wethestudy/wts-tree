import * as d3 from "d3";
import { parameters } from "../../database/parameters";

export const nodeUI = {
  nodeProperties: parameters.nodeProperties,
  defFill: () => {
    return nodeUI.nodeProperties.defaultColor;
  },
  fillCategory: (category) => {
    let color = nodeUI.defFill()
    switch (category) {
      case "Mathematics":
        color = "burlywood";
        break;
      case "Physics":
        color = "lightslategrey";
        break;
      case "Engineering":
        color = "#1e90ff";
        break;
      default:
        break;
    }
    return color
  },
  fillTopic: (topic) => {
    let color = nodeUI.defFill()
    switch (topic){
      case "Relations and Functions":
        color = "#2f4f4f";
        break;
      case "Algebra":
        color = "#a52a2a";
        break;
      case "Trigonometry":
        color = "#006400";
        break;
      case "Analytic Geometry":
        color = "#00008b";
        break;
      case "Differential Calculus":
        color = "#ff0000";
        break;
      case "Integral Calculus":
        color = "#ffa500";
        break;
      case "Differential Equations":
        color = "#ffff00";
        break;
      case "Kinematics":
        color = "#00ff00";
        break;
      case "Kinetics":
        color = "#00fa9a";
        break;
      case "Work and Energy":
        color = "#00ffff";
        break;
      case "Fluid Mechanics":
        color = "#0000ff";
        break;
      case "Structure":
        color = "#da70d6";
        break;
      case "Structural Loads":
        color = "#ff00ff";
        break;
      case "Structural Analysis":
        color = "#1e90ff";
        break;
      case "Structural Modeling":
        color = "#f0e68c";
        break;
      case "Strength of Materials":
        color = "#ffc0cb";
        break;
      default:
        break;
    }
    return color
  },
  fillPostType: (category) => {
    let color = nodeUI.defFill()
    switch (category) {
      case "Example":
        color = "burlywood";
        break;
      case "Concept":
        color = "darkgoldenrod";
        break;
      case "Crossroad":
        break;
      case "Guide":
        color = "#1e90ff";
        break;
      default:
        break;
    }
    return color
  },
  fillByCode: (node) => {
    let color
    let checkedValue = d3.select('input[name="color"]:checked').node().value
    switch(checkedValue){
      case "category":
        color = nodeUI.fillCategory(node.data.category);
        break;
      case "topic":
        color = nodeUI.fillTopic(node.data.topic);
        break;
      case "posttype":
        color = nodeUI.fillPostType(node.data.posttype);
        break;
      default:
        color = nodeUI.defFill()
        break;
    }
    return color
  },
  fillNode: (node, completedArticlesID) => {
    let color = nodeUI.fillByCode(node);
    if (completedArticlesID.includes(node.data.id)){
      color = nodeUI.nodeProperties.completedColor;
    }
    return color
  },
  defOpacity: () => {
    return nodeUI.nodeProperties.defaultOpacity;
  },
  opacityActive: ()=>{
    return nodeUI.nodeProperties.activeOpacity;
  },
  opacityNode: (node, completedArticlesID, activate) => {
    let opacity = nodeUI.defOpacity();
    if (activate) {
      opacity = nodeUI.opacityActive()
    }
    if (completedArticlesID.includes(node.data.id)){
      opacity = nodeUI.nodeProperties.completedOpacity;
    }
    return opacity
  }
};
