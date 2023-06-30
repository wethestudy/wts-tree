import * as d3 from "d3";
import { nodeProperties } from "./properties.js";

let nodeUIFunctions = {
    hideSidebar: () => {
         d3.select('#sidebar')
            .style('visibility', 'hidden')
            .selectAll("*").remove()
    },
    showSidebar: (d) => {
        //Reorganize sidebar
        let container = d3.select('#sidebar')
        container.style('visibility', 'visible')
            .selectAll("*")
            .remove()
        container.append('div')
            .attr('id', 'container-order')
            .text('1'); //Change in production
        container.append('h2')
            .text(d.data.name);
        container.append('p')
            .text(d.data.courseSummary);
        container.append('div')
            .attr('id', 'container-wrapper')
            .append('a')
            .attr('id', 'container-link')
            .text("Explore")
            .attr('href', d.data.link);
    }
}

let searchUIFunctions = {
    constructSearchUI: (filteredResults, linkProps, camera, handleActiveNode)=>{
        d3.select('#search-wrapper').style('visibility', 'visible')
        d3.select('#no-results').style('visibility', 'hidden')
        filteredResults.forEach(element => {
            if(filteredResults.length){
                let linkContainer = d3.select('#search-results').append('a').data(element)
                linkContainer.append('p')
                    .attr('id', `search-category-${element.data.id}`)
                    .text(element.data.category)
                linkContainer.append('p')
                    .attr('id', `search-name-${element.data.id}`)
                    .text(element.data.name)
                    .on("click", (event) => nodeProperties.click(linkProps.activeNode, element, linkProps.member, camera, handleActiveNode))
            }
        });
        if(filteredResults.length === 0) {
            d3.select('#no-results').style('visibility', 'visible')
        }
    },
    clearSearchResults: ()=>{
        d3.select('#search-results').selectAll("*").remove()
    },
    hideSearchUI: ()=>{
        d3.select('#search-wrapper').style('visibility', 'hidden')
        d3.select('#search-results').selectAll("*").remove()
        d3.select('#no-results').style('visibility', 'hidden')
    }
}

export {nodeUIFunctions, searchUIFunctions}