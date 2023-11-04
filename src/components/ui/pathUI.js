import { parameters } from "../../database/parameters";

export const pathUI = {
  pathProperties: parameters.pathProperties,
  defStroke: () => {
    return pathUI.pathProperties.defaultColor;
  },
  strokePath: (link, completedArticlesID)=>{
    let color = pathUI.defStroke()
    if (completedArticlesID.includes(link.source.id)
      && completedArticlesID.includes(link.target.id)) {
      color = pathUI.pathProperties.completedColor;
    }
    return color
  },
  defOpacity: () => {
    return pathUI.pathProperties.defaultOpacity;
  },
  opacityPath: (link, completedArticlesID)=>{
    let opacity = pathUI.defOpacity()
    if (completedArticlesID.includes(link.source.id)
      && completedArticlesID.includes(link.target.id)) {
        opacity = pathUI.pathProperties.completedOpacity;
    }
    return opacity
  },
};
