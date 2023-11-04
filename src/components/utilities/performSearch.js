const performSearch = (list, keyword) => {
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
  };

export default performSearch;