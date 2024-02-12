import * as d3 from "d3";
import { DesktopUI } from "../../desktop/DesktopUI";

export const searchUtilities = {
    performSearch: (list, keyword) => {
        const extractedData = list.map(item => item.data)
        const filteredList = extractedData.filter(item => {
        const itemValues = Object.values(item).map(value => {
            
            if (Array.isArray(value)) {
            return JSON.stringify(value);
            } else if (value === true) {
                return ""
            } else if (value === false) {
                return ""
            } else if (value === undefined){
                return ""
            }
            
            return value.toString().toLowerCase();
        });
    
        const keywords = keyword.toLowerCase().split(' ');
    
        const keywordMatch = keywords.every(keyword =>
            itemValues.some(value => value.includes(keyword))
        );
    
        return keywordMatch;
        });
    
        const output = list.filter(item => filteredList.includes(item.data));
        return output;
    },
    handleSearch: (descendants, completedArticlesID, masteredArticlesID, activeNode, cameraPosition, viewType) =>{
        let searchInput = d3.select('#search-input').property('value');
        DesktopUI.clearSearchResults()
        if (searchInput.length===0) {
            DesktopUI.hideSearch()
            return
        }
        let filteredResults = searchUtilities.performSearch(descendants, searchInput);
        let slicedFilteredResults = filteredResults.slice(0, 30);
        DesktopUI.constructSearch(
            slicedFilteredResults, 
            activeNode, 
            completedArticlesID, 
            masteredArticlesID, 
            cameraPosition, 
            viewType
        )
    }
}