import * as d3 from "d3";
import { searchUIFunctions } from "./UIFunctions.js";

// Improvements
// Show number of search results
// Only display a certain number of items
// Sort function

function treeSearch (dataArray, linkProps, camera, handleActiveNode){
    let searchTextArea = document.getElementById("search-textarea");
    searchTextArea.addEventListener("input", handleSearch);
    searchTextArea.addEventListener("click", handleSearch);
    d3.select("#search-button").on("click", handleSearch);

    function handleSearch() {
        searchUIFunctions.clearSearchResults()
        let searchTerm = searchTextArea.value;
        if (searchTerm.length===0) {
            searchUIFunctions.hideSearchUI()
            return
        }
        let filteredResults = search(dataArray, searchTerm);
        searchUIFunctions.constructSearchUI(filteredResults, linkProps, camera, handleActiveNode)
    }
}

function search(dataArray, keyword){
    // Split the input into separate keywords
    let keywords = keyword.toLowerCase().split(" ");
    // Filter the array based on the keywords matching any value in the objects
    let filteredData = dataArray.filter(function(obj) {
        let objValues = Object.values(obj).map(String);
        // Check if the keywords appear in the same order in any value of the object
        return objValues.some(function(value) {
        let valueLower = value.toLowerCase();
        let lastIndex = -1;
        // Sequentially check the occurrence of keywords in the value
        return keywords.every(function(keyword) {
            lastIndex = valueLower.indexOf(keyword, lastIndex + 1);
            return lastIndex !== -1;
        });
        });
    });
    return filteredData;
}

export {treeSearch, searchUIFunctions}