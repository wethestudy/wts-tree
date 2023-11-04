import React from 'react';

const NavigationControls = () => {
  return <div className="navigation-control">
  <div className="navigation-wrapper">
    <div className='button-container'>
      <div className='zoomin-wrapper' id="navigation-button-zoomin"></div>
    </div>
    <div className='button-container'>
      <div className='zoomout-wrapper' id="navigation-button-zoomout"></div>
    </div>
  </div>
  <div className='button-container'>
    <div className='center-wrapper' id="navigation-button-center"></div>
  </div>
</div>;
}

export default NavigationControls