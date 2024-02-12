import * as d3 from "d3";
import React from 'react';
import { useEffect } from 'react';
import SearchInput from "../elements/ui-search/SearchInput.js";
import TreeCard from "../elements/ui-tree-card/TreeCard.js";
import TreeSettings from "../elements/ui-settings/Settings.js";
import TreeResources from "../elements/ui-resources/Resources.js";
import TreeFooter from "../elements/ui-footer/Footer.js";
import { MobileUI } from "./MobileUI.js";
import mobileStyle from './styles/mobile.module.css'
import { TrackItem } from "../elements/ui-tracks/Tracks.js";
import trackStyle from "../elements/ui-tracks/styles/track.module.css"

const Mobile = ({tracksDatabase, selectedTrack}) => {

    useEffect(()=>{
      d3.select('#open-settings-button').on('click', MobileUI.showSettings)
      d3.select('#exit-settings-button').on('click', MobileUI.hideSettings)
      d3.select('#reveal-button').on('click', MobileUI.revealModal)
      d3.select('#hide-button').on('click', MobileUI.hideModal)
      d3.select('#open-track-button').on('click', MobileUI.showTracks)
      d3.select('#exit-track-button').on('click', MobileUI.hideTracks)
    })
    return <>
        <MobileHeader tracksDatabase={tracksDatabase} selectedTrack={selectedTrack}/>
    </>
  }

export default Mobile;

function MobileHeader({tracksDatabase, selectedTrack}){
    return <div className={mobileStyle["mobile-view"]}>
      <div className={mobileStyle["mobile-header"]}>
        <SearchInput/>
        <div className={mobileStyle["mobile-secondary"]}>
          <div className={mobileStyle["mobile-header-left"]}>
              <div className={mobileStyle['mobile-container']}>
                  <div className={mobileStyle["mobile-clear-wrapper"]} id="clear-button"></div>
              </div>
          </div>
          <div className={mobileStyle["mobile-header-right"]}>
              <div className={mobileStyle["mobile-container"]}>
                  <div className={mobileStyle["mobile-settings-wrapper"]} id="open-settings-button"></div>
              </div>
              <div className={mobileStyle["mobile-container"]}>
                  <div className={mobileStyle["mobile-tracks-wrapper"]} id="open-track-button"></div>
              </div>
          </div>
        </div>
      </div>
      <TreeCard/>
      <div className={mobileStyle["mobile-settings-overlay"]} id="mobile-settings-overlay"></div>
      <div className={mobileStyle["mobile-settings"]} id="mobile-settings">
        <div className={mobileStyle["mobile-settings-close"]}>
          <div className={mobileStyle["mobile-exit-container"]}>
            <div className={mobileStyle["mobile-exit-wrapper"]} id="exit-settings-button"></div>
          </div>
        </div>
        <TreeSettings/>
        <TreeResources/>
        <TreeFooter/>
      </div>
      <div className={mobileStyle["mobile-settings"]} id="mobile-tracks">
        <div className={mobileStyle["mobile-tracks-close"]}>
          <div className={mobileStyle["mobile-exit-container"]}>
            <div className={mobileStyle["mobile-exit-wrapper"]} id="exit-track-button"></div>
          </div>
        </div>
        <div className={trackStyle['track-header']}>Tracks</div>
        {tracksDatabase.map((track, index)=>{
        if(selectedTrack===track){
          return <TrackItem
            key={index}
            track={track}
            id={`track-item-wrapper-${index}`}
            text={"Track"}
            isSelected={true}
          />
        } else {
          return <TrackItem
            key={index}
            track={track}
            id={`track-item-wrapper-${index}`}
            text={"Track"}
            isSelected={false}
          />
        }
      })}
      </div>
    </div>
}