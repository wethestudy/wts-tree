import {pathProperties} from "./properties.js";
import * as d3 from "d3";

function pathGroup(ref, data, member) {
    const pathGroup = d3.select(ref.current);
    pathGroup.attr("fill", "none")
      .attr("stroke-width", pathProperties.strokeWidth)
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("stroke", d => pathProperties.strokeColor(d, member))
      .attr("stroke-opacity", d => pathProperties.strokeOpacity(d, member))
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));
  }

export default pathGroup