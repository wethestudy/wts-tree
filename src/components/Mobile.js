import * as d3 from "d3";
import React from 'react';
import { useEffect } from 'react';
import SearchInput from "./elements/SearchInput";
import TreeCard from "./elements/TreeCard";
import TreeSettings from "./elements/TreeSettings";
import TreeResources from "./elements/TreeResources";
import TreeFooter from "./elements/TreeFooter";
import { MobileUI } from "./ui/MobileUI";

const Mobile = () => {

    useEffect(()=>{
      d3.select('#open-settings-button').on('click', MobileUI.showSettings)
      d3.select('#exit-settings-button').on('click', MobileUI.hideSettings)
      d3.select('#reveal-button').on('click', MobileUI.revealModal)
      d3.select('#hide-button').on('click', MobileUI.hideModal)
    })
    return <>
        <MobileHeader/>
    </>
  }

export default Mobile;

function MobileHeader(){
    return <div className="mobile-view">
      <div className="mobile-header">
        <SearchInput/>
        <div className="mobile-secondary">
          <div className="mobile-header-left">
              <div className='mobile-container'>
                  <div className="mobile-clear-wrapper" id="clear-button"></div>
              </div>
          </div>
          <div className="mobile-header-right">
              <div className="mobile-container">
                  <div className="mobile-settings-wrapper" id="open-settings-button"></div>
              </div>
          </div>
        </div>
      </div>
      <div className="mobile-modal">
        <TreeCard/>
      </div>
      <div className="mobile-settings-overlay" id="mobile-settings-overlay"></div>
      <div className="mobile-settings" id="mobile-settings">
        <div className="mobile-settings-close">
          <div className="mobile-exit-container">
            <div className="mobile-exit-wrapper" id="exit-settings-button"></div>
          </div>
        </div>
        <TreeSettings/>
        <TreeResources/>
        <TreeFooter/>
      </div>
    </div>
}