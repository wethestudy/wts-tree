import React from 'react';
import navigationControlsStyle from './styles/navigationcontrols.module.css'

const NavigationControls = () => {
  return <div className={navigationControlsStyle["navigation-control"]}>
  <div className={navigationControlsStyle["navigation-wrapper"]}>
    <div className={navigationControlsStyle['button-container']}>
      <div className={navigationControlsStyle['zoomin-wrapper']} id="navigation-button-zoomin"></div>
    </div>
    <div className={navigationControlsStyle['button-container']}>
      <div className={navigationControlsStyle['zoomout-wrapper']} id="navigation-button-zoomout"></div>
    </div>
  </div>
  <div className={navigationControlsStyle['button-container']}>
    <div className={navigationControlsStyle['center-wrapper']} id="navigation-button-center"></div>
  </div>
</div>;
}

export default NavigationControls