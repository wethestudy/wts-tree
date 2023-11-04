import * as d3 from "d3";
import { coordinates } from "./coordinates.js";
import { cameraUtilities } from "./cameraUtilities.js";

export const cameraFunctions = {
    zoomOnNode: (camera, d) => {
        let svg = d3.select('svg')
        let zoom = cameraUtilities.initCamera(svg, camera)
        svg.transition().call(
            zoom.translateTo, 
            coordinates.getCartesianCoordinate(d.x, d.y).x, 
            coordinates.getCartesianCoordinate(d.x, d.y).y)
    }
}