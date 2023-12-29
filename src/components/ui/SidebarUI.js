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
  clearElement: (element)=>{
    element.text("");
    element.style('background-color', '#d7d3d0');
  },
  resetCard: () => {
    let cardTitle = d3.select('#card-title');
    cardTitle.text("Select a Tree Node");

    let cardBlock = d3.select('#card-block');
    cardBlock.text("");
    cardBlock.style('background-color', '#d7d3d0');
    cardBlock.style('height', '2rem');

    let cardCategory = d3.select('#card-category');
    let cardSubcategory = d3.select('#card-subcategory');
    let cardTopic = d3.select('#card-topic');
    let cardRevision = d3.select('#card-revision');
    let cardOrder = d3.select('#card-order');
    let cardPostType = d3.select('#card-posttype');
    let cardButton = d3.select('#card-button');
    let mobileCardButton = d3.select('#mobile-card-button');

    SidebarUI.clearElement(cardCategory)
    SidebarUI.clearElement(cardSubcategory)
    SidebarUI.clearElement(cardTopic)
    SidebarUI.clearElement(cardRevision)
    SidebarUI.clearElement(cardOrder)
    SidebarUI.clearElement(cardPostType)

    cardButton.attr('href', "");
    mobileCardButton.attr('href', "");
  },
  updateCard: (d) => {
    let cardTitle = d3.select('#card-title');
    let cardBlock = d3.select('#card-block');
    let cardCategory = d3.select('#card-category');
    let cardSubcategory = d3.select('#card-subcategory');
    let cardTopic = d3.select('#card-topic');
    let cardRevision = d3.select('#card-revision');
    let cardOrder = d3.select('#card-order');
    let cardPostType = d3.select('#card-posttype');
    let cardButton = d3.select('#card-button');
    let mobileCardButton = d3.select('#mobile-card-button');

    cardTitle.text(d.data.name);
    if (d.data.seoPostSummary) {
      cardBlock.text(d.data.seoPostSummary);
      cardBlock.style('background-color', 'transparent');
      cardBlock.style('height', 'auto');
    }
    if (d.data.category) {
      cardCategory.text(d.data.category);
      cardCategory.style('background-color', 'transparent');
    } else {
      SidebarUI.clearElement(cardCategory)
    }
    if (d.data.subcategory) {
      cardSubcategory.text(d.data.subcategory);
      cardSubcategory.style('background-color', 'transparent');
    } else {
      SidebarUI.clearElement(cardSubcategory)
    }
    if (d.data.topic) {
      cardTopic.text(d.data.topic);
      cardTopic.style('background-color', 'transparent');
    } else {
      SidebarUI.clearElement(cardTopic)
    }
    if (d.data.revision) {
      cardRevision.text(d.data.revision);
      cardRevision.style('background-color', 'transparent');
    } else {
      SidebarUI.clearElement(cardRevision)
    }
    if (d.data.siblingOrder) {
      cardOrder.text(d.data.siblingOrder);
      cardOrder.style('background-color', 'transparent');
    } else {
      SidebarUI.clearElement(cardOrder)
    }
    if (d.data.posttype) {
      cardPostType.text(d.data.posttype);
      cardPostType.style('background-color', 'transparent');
    } else {
      SidebarUI.clearElement(cardPostType)
    }
    if (d.data.link) {
      cardButton.attr('href', d.data.link);
    }
    if (d.data.link) {
      mobileCardButton.attr('href', d.data.link);
    }
  },
  clearUI: ()=>{
    SidebarUI.hideSearch()
    SidebarUI.clearSearch()
    SidebarUI.resetCard()
  },
};
