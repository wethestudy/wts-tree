import React from 'react';
import '../index.css';

const SearchBar = () => {
    return <>
      <div id="search-field">
        <textarea id="search-textarea" placeholder="Type Something Here!"></textarea>
        <button id="search-button">
          <svg id="search-icon" viewBox="0 0 2263.29485 2143.2201">
            <path d="M2263.13,1995.4501a140.35521,140.35521,0,0,0-46-97.73,1.07315,1.07315,0,0,1-.1099-.1001l-650-586.26A851.38074,851.38074,0,0,0,530.8299,62.33,850.77192,850.77192,0,0,0,249.3,1452.8199a848.44267,848.44267,0,0,0,
            601.72,249.25h.03a848.29386,848.29386,0,0,0,579.0399-227.32l591.5901,626.54c.2.2202.4099.4302.6101.6401,1.3199,1.3101,2.98,2.91,4.3699,4.23.1599.1499.3301.3101.5.46a141.19436,141.19436,0,0,0,235.97-111.1699ZM851.05,
            1498.14c-356.8099,0-647.1-290.29-647.1-647.1001C203.95,494.22,494.2401,203.94,851.05,203.94c356.81,0,647.1,290.28,647.1,647.0999C1498.15,1207.85,1207.86,1498.14,851.05,1498.14Z"/>
          </svg>
        </button>
      </div>
      <div id="search-wrapper">
        <div id="search-results"></div>
        <div id="no-results">
          <p>No results found :/</p>
        </div>
      </div>
    </>
}

export default SearchBar