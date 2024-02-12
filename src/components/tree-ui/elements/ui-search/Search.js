import React from 'react';
import searchStyle from './styles/search.module.css'

export function Search() {
  return <div className={searchStyle['search-wrapper']} id="search-wrapper">
    <div className={searchStyle['results']} id="results">
      <p className={searchStyle['search-count']} id="search-count"></p>
      <div className={searchStyle['search-results']} id="search-results"></div>
    </div>
    <div className={searchStyle['no-results']} id="no-results">
      <p>No results found :/</p>
    </div>
  </div>;
}
