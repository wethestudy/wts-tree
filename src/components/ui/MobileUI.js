import * as d3 from "d3";

export const MobileUI = {
    showSettings: ()=>{
        d3.select('#mobile-settings').style('visibility', 'visible')
        d3.select('#mobile-settings-overlay').style('visibility', 'visible')
        d3.select('#cert-button-show').style('visibility', 'hidden')
    },
    showTracks: ()=>{
        d3.select('#mobile-tracks').style('visibility', 'visible')
        d3.select('#mobile-settings-overlay').style('visibility', 'visible')
        d3.select('#cert-button-show').style('visibility', 'hidden')
    },
    hideSettings: ()=>{
        d3.select('#mobile-settings').style('visibility', 'hidden')
        d3.select('#mobile-settings-overlay').style('visibility', 'hidden')
        d3.select('#cert-button-show').style('visibility', 'visible')
    },
    hideTracks: ()=>{
        d3.select('#mobile-tracks').style('visibility', 'hidden')
        d3.select('#mobile-settings-overlay').style('visibility', 'hidden')
        d3.select('#cert-button-show').style('visibility', 'visible')
    },
    revealModal: ()=>{
        d3.select('#sidebar-card')
            .style('bottom', '70%')
        d3.select('#reveal-button')
            .style('visibility', 'hidden')
        d3.select('#hide-button')
            .style('visibility', 'visible')
    },
    hideModal: ()=>{
        d3.select('#sidebar-card')
            .transition()
            .style('bottom', '5%')
        d3.select('#reveal-button')
            .style('visibility', 'visible')
        d3.select('#hide-button')
            .style('visibility', 'hidden')
    }
}