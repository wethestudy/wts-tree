import * as d3 from "d3";

export const MobileUI = {
    showSettings: ()=>{
        d3.select('#mobile-settings').style('visibility', 'visible')
        d3.select('#mobile-settings-overlay').style('visibility', 'visible')
    },
    hideSettings: ()=>{
        d3.select('#mobile-settings').style('visibility', 'hidden')
        d3.select('#mobile-settings-overlay').style('visibility', 'hidden')
    },
    revealModal: ()=>{
        d3.select('.mobile-modal #sidebar-card')
            .style('bottom', '32rem')
        d3.select('#reveal-button')
            .style('visibility', 'hidden')
        d3.select('#hide-button')
            .style('visibility', 'visible')
    },
    hideModal: ()=>{
        d3.select('#sidebar-card')
            .transition()
            .style('bottom', '10rem')
        d3.select('#reveal-button')
            .style('visibility', 'visible')
        d3.select('#hide-button')
            .style('visibility', 'hidden')
    }
}