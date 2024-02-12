import * as d3 from "d3";
import { cameraUtilities } from "./cameraUtilities.js";

function Camera(svg, cameraPosition) {
  let zoom = cameraUtilities.initCamera(svg, cameraPosition)

  svg.call(zoom)
    .call(zoom.translateTo, cameraPosition.x, cameraPosition.y)
    .call(zoom.scaleTo, cameraPosition.k);
  d3.select('#navigation-button-zoomin')
    .on('click', () => {
      svg.transition().call(zoom.scaleBy, 2);
    });
  d3.select('#navigation-button-zoomout')
    .on('click', () => {
      svg.transition().call(zoom.scaleBy, 0.5);
    });
  d3.select('#navigation-button-center')
    .on('click', () => {
      svg.transition()
        .call(zoom.scaleTo, cameraUtilities.zoomProperties.defaultZoomScale)
        .call(zoom.translateTo, 0, 0);
    });
}

export {Camera}