import * as d3 from "d3";
import { parameters } from "../../database/parameters";

export const cameraUtilities = {
    zoomProperties: parameters.zoomProperties,
    handleZoom: (svg, camera, e) => {
        camera.k = e.transform.k
        camera.x = ((window.innerWidth/2) - e.transform.x)/e.transform.k
        camera.y = ((window.innerHeight/2) - e.transform.y)/e.transform.k
        svg.selectAll('g')
          .attr('transform', e.transform);
    },
    initCamera: (svg, camera) => {
        let zoom = d3.zoom()
          .scaleExtent([cameraUtilities.zoomProperties.minScale, cameraUtilities.zoomProperties.maxScale])
          .translateExtent([
            [-cameraUtilities.zoomProperties.radius * 1.5, -cameraUtilities.zoomProperties.radius * 1.5],
            [cameraUtilities.zoomProperties.radius * 1.5, cameraUtilities.zoomProperties.radius * 1.5]
        ])
          .on('zoom', (e)=>{cameraUtilities.handleZoom(svg, camera, e)});
        return zoom
    }
}