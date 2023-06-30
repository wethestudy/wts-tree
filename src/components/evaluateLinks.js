import * as d3 from "d3";

function evaluateLinks(activeNode){
    let linkBoolean = d3.select("#related-links").node().checked
    if (linkBoolean){
      if(activeNode.activeElement!=null){
        d3.selectAll('[id^="line"]')
          .transition()
          .style('opacity', 0)
        d3.selectAll(`#line-${activeNode.activeElement.data.id}`)
          .transition()
          .style('opacity', 1)
          .style('visibility', 'visible')
      } else {
        d3.selectAll('[id^="line"]')
          .transition()
          .style('opacity', 1)
          .style('visibility', 'visible')
      }
    } else {
      d3.selectAll('[id^="line"]')
        .transition()
        .style('opacity', 0)
    }
  }

export default evaluateLinks
  

