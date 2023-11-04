import * as d3 from "d3";
import { nodeFunctions } from "../utilities/nodeFunctions";

export const SidebarUI = {
  constructSearch: (filteredResults, activeNode, completedArticlesID, camera)=>{
    d3.select('#search-wrapper').style('visibility', 'visible')
    d3.select('#no-results').style('visibility', 'hidden')
    d3.select('#search-count')
      .text(`Showing ${filteredResults.length} results`)
    filteredResults.forEach(element => {
        if(filteredResults.length){
            let resultWrapper = d3.select('#search-results')
            let linkContainer = resultWrapper.append('a')
              .data(element)
              .on("click", (event) => nodeFunctions.click(activeNode, element, completedArticlesID, camera))
            linkContainer.append('p')
              .attr('id', `search-category-${element.data.id}`)
              .text(element.data.category)
            linkContainer.append('p')
              .attr('id', `search-name-${element.data.id}`)
              .text(element.data.name)
        }
    });
    if(filteredResults.length === 0) {
        d3.select('#no-results').style('visibility', 'visible')
    }
  },
  clearSearchResults: ()=>{
    d3.select('#search-results').selectAll("*").remove()
  },  
  hideSearch: ()=>{
    d3.select('#search-wrapper').style('visibility', 'hidden')
    d3.select('#search-results').selectAll("*").remove()
    d3.select('#no-results').style('visibility', 'hidden')
  },
  clearSearch: ()=>{
    let searchTextArea = document.getElementById("search-input");
    searchTextArea.value = "";
  },
  resetCard: () => {
    let cardTitle = d3.select('#card-title');
    cardTitle.text("Select a Tree Node");

    let cardBlock = d3.select('#card-block');
    cardBlock.text("");
    cardBlock.style('background-color', '#d7d3d0');
    cardBlock.style('height', '6rem');

    let cardCategory = d3.select('#card-category');
    cardCategory.text("");
    cardCategory.style('background-color', '#d7d3d0');

    let cardSubcategory = d3.select('#card-subcategory');
    cardSubcategory.text("");
    cardSubcategory.style('background-color', '#d7d3d0');

    let cardTopic = d3.select('#card-topic');
    cardTopic.text("");
    cardTopic.style('background-color', '#d7d3d0');

    let cardRevision = d3.select('#card-revision');
    cardRevision.text("");
    cardRevision.style('background-color', '#d7d3d0');

    let cardOrder = d3.select('#card-order');
    cardOrder.text("");
    cardOrder.style('background-color', '#d7d3d0');

    let cardButton = d3.select('#card-button');
    cardButton.attr('href', "");

    let mobileCardButton = d3.select('#mobile-card-button');
    mobileCardButton.attr('href', "");
  },
  updateCard: (d) => {
    let cardTitle = d3.select('#card-title');
    cardTitle.text(d.data.name);
    if (d.data.seoPostSummary) {
      let cardBlock = d3.select('#card-block');
      cardBlock.text(d.data.seoPostSummary);
      cardBlock.style('background-color', 'transparent');
      cardBlock.style('height', 'auto');
    }
    if (d.data.category) {
      let cardCategory = d3.select('#card-category');
      cardCategory.text(d.data.category);
      cardCategory.style('background-color', 'transparent');
    }
    if (d.data.subcategory) {
      let cardSubcategory = d3.select('#card-subcategory');
      cardSubcategory.text(d.data.subcategory);
      cardSubcategory.style('background-color', 'transparent');
    }
    if (d.data.topic) {
      let cardTopic = d3.select('#card-topic');
      cardTopic.text(d.data.topic);
      cardTopic.style('background-color', 'transparent');
    }
    if (d.data.revision) {
      let cardRevision = d3.select('#card-revision');
      cardRevision.text(d.data.revision);
      cardRevision.style('background-color', 'transparent');
    }
    if (d.data.siblingOrder) {
      let cardOrder = d3.select('#card-order');
      cardOrder.text(d.data.siblingOrder);
      cardOrder.style('background-color', 'transparent');
    }
    if (d.data.link) {
      let cardButton = d3.select('#card-button');
      cardButton.attr('href', d.data.link);
    }
    if (d.data.link) {
      let mobileCardButton = d3.select('#mobile-card-button');
      mobileCardButton.attr('href', d.data.link);
    }
  },
  clearUI: ()=>{
    SidebarUI.hideSearch()
    SidebarUI.clearSearch()
    SidebarUI.resetCard()
  },
};
