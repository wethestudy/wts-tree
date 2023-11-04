import * as d3 from "d3";
import performSearch from "./performSearch";
import { SidebarUI } from "../ui/SidebarUI";

export const searchUtilities = {
    handleSearch: (descendants, completedArticlesID, activeNode, cameraPosition) =>{
        let searchInput = d3.select('#search-input').property('value');
        SidebarUI.clearSearchResults()
        if (searchInput.length===0) {
            SidebarUI.hideSearch()
            return
        }
        let filteredResults = performSearch(descendants, searchInput);
        let slicedFilteredResults = filteredResults.slice(0, 30);
        SidebarUI.constructSearch(slicedFilteredResults, activeNode, completedArticlesID, cameraPosition)
    }
}