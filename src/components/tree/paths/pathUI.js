import { parameters } from "../../../database/parameters";

export const pathUI = {
  pathProperties: parameters.pathProperties,
  defStroke: () => {
    return pathUI.pathProperties.defaultColor;
  },
  strokePath: (link, completedArticlesID, masteredArticlesID)=>{
    let color = pathUI.defStroke()
    if (completedArticlesID.includes(link.source.id)
      && completedArticlesID.includes(link.target.id)) {
      color = pathUI.pathProperties.completedColor;
    }
    if (masteredArticlesID.includes(link.source.id)
      && masteredArticlesID.includes(link.target.id)) {
      color = pathUI.pathProperties.masteredColor;
    }
    return color
  },
  defOpacity: () => {
    return pathUI.pathProperties.defaultOpacity;
  },
  opacityPath: (link, completedArticlesID, masteredArticlesID)=>{
    let opacity = pathUI.defOpacity()
    if (completedArticlesID.includes(link.source.id)
      && completedArticlesID.includes(link.target.id)) {
        opacity = pathUI.pathProperties.completedOpacity;
    }
    if (masteredArticlesID.includes(link.source.id)
      && masteredArticlesID.includes(link.target.id)) {
        opacity = pathUI.pathProperties.masteredOpacity;
    }
    return opacity
  },
};
