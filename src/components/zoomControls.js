import {zoomProperties} from "./properties.js";
import getCartesianCoordinate from "./getCartesianCoordinates.js";
import * as d3 from "d3";

function initCamera (svg, camera) {
  function handleZoom(e) {
    camera.lastKnownCamera.k = e.transform.k
    camera.lastKnownCamera.x = ((window.innerWidth/2) - e.transform.x)/e.transform.k
    camera.lastKnownCamera.y = ((window.innerHeight/2) - e.transform.y)/e.transform.k
    svg.selectAll('g')
      .attr('transform', e.transform);
  }
  let zoom = d3.zoom()
    .scaleExtent([zoomProperties.minScale, zoomProperties.maxScale])
    .translateExtent([[-zoomProperties.radius * 1.5, -zoomProperties.radius * 1.5],
    [zoomProperties.radius * 1.5, zoomProperties.radius * 1.5]])
    .on('zoom', handleZoom);
  return zoom
}

function zoomControls(svg, camera) {
    let zoom = initCamera(svg, camera)
    svg.call(zoom)
      .call(zoom.translateTo, camera.lastKnownCamera.x, camera.lastKnownCamera.y)
      .call(zoom.scaleTo, camera.lastKnownCamera.k);
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
          .call(zoom.scaleTo, 1)
          .call(zoom.translateTo, 0, 0);
      });
  }

  function zoomOnNode(camera, d){
    let svg = d3.select('svg')
    let zoom = initCamera(svg, camera)
    svg.transition().call(zoom.translateTo, getCartesianCoordinate(d.x, d.y).x, getCartesianCoordinate(d.x, d.y).y)
  }

  export {zoomControls, zoomOnNode}