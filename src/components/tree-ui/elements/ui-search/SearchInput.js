import React from 'react';
import searchInputStyle from './styles/searchinput.module.css'

function SearchInput(){
    return <>
        <div className={searchInputStyle['input-container']}>
            <div className={searchInputStyle["input-wrapper"]}>
                <input className={searchInputStyle["input-field"]} type="text" id="search-input" placeholder="Type to start searching" />
            </div>
        </div>
    </>
}

export default SearchInput