import React from 'react';

const NavigationControls = ({}) => {
  return <div id="navigation-control">
    <button id="navigation-button-center" className="tree-button">
      <svg viewBox="0 0 100 100">
        <path d="m0.819 38.314a0.819 0.819 0 0 1-0.819-0.819v-24.897a6.3434 6.3434 0 0 1 6.3362-6.3362h24.897a0.819 0.819 0 0 1 0 1.638h-24.897a4.7035 4.7035 0 0 0-4.6981 4.6982v24.897a0.819 0.819 0 0 1-0.81905 0.81902z" />
        <path d="m67.948 7.0814a0.819 0.819 0 0 1 0.819-0.819h24.897a6.3434 6.3434 0 0 1 6.3362 6.3362v24.897a0.819 0.819 0 0 1-1.638 0v-24.897a4.7035 4.7035 0 0 0-4.6981-4.6981h-24.897a0.819 0.819 0 0 1-0.81902-0.81903z" />
        <path d="m99.181 61.686a0.819 0.819 0 0 1 0.819 0.819v24.897a6.3434 6.3434 0 0 1-6.3362 6.3362h-24.897a0.819 0.819 0 0 1 0-1.638h24.897a4.7035 4.7035 0 0 0 4.6981-4.6982v-24.897a0.819 0.819 0 0 1 0.81905-0.81902z" />
        <path d="m32.052 92.919a0.819 0.819 0 0 1-0.819 0.819h-24.897a6.3434 6.3434 0 0 1-6.3362-6.3362v-24.897a0.819 0.819 0 0 1 1.638 0v24.897a4.7035 4.7035 0 0 0 4.6981 4.6981h24.897a0.819 0.819 0 0 1 0.81902 0.81903z" />
        <circle cx="50" cy="50" r="20.128" />
      </svg>
    </button>
    <div id="navigation-wrapper">
      <button id="navigation-button-zoomin" className="tree-button">+</button>
      <button id="navigation-button-zoomout" className="tree-button">-</button>
    </div>
  </div>;
}

export default NavigationControls