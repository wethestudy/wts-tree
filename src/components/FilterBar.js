import React from 'react';
import '../index.css';

const FilterBar = ({}) => {
    return <div id="filter-wrapper">
      <button id="categorymath" className="category-button">Mathematics</button>
      <button id="categoryphysics" className="category-button">Physics</button>
      <button id="categoryengineering" className="category-button">Engineering</button>
      <button id="categoryall" className="category-button">All</button>
    </div>;
  }

export default FilterBar