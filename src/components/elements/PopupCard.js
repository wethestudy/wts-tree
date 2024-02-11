import * as d3 from "d3";
import React, { useEffect } from 'react';
import { popupFunctions } from "../utilities/popupFunctions";
import { nodeFunctions } from "../utilities/nodeFunctions";
import { treeUtilities } from "../utilities/treeUtilities";
import popupCardStyle from './popupcard.module.css'

function PopupCard({treeState}) {

    // Initial Zoom
    const initializeZoom = () => {
      if(treeState.view.parameters.object !== null){
        nodeFunctions.click(
          treeState.activeNode.current, 
          treeUtilities.findNodeById(treeState.root, treeState.view.parameters.object), 
          treeState.member.data.completedArticlesID, 
          treeState.member.data.masteredArticlesID, 
          treeState.cameraPosition, 
          treeState.view.type
        )
      }
    }
    useEffect(()=>{
      initializeZoom()
    },[])

    // UI
    useEffect(()=>{
      d3.select('#popup-exit-button').on('click', ()=>{popupFunctions.click(
        treeState.activeNode.current, 
        treeState.member.data.completedArticlesID, 
        treeState.member.data.masteredArticlesID, 
        treeState.cameraPosition)})
    }, [])

    return <div className={popupCardStyle["popup-card"]} id="popup-card">
      <div className={popupCardStyle["popup-scroll"]}>
          <div className={popupCardStyle["popup-close"]}>
            <div className={popupCardStyle["popup-exit-container"]}>
              <div className={popupCardStyle["popup-exit-wrapper"]} id="popup-exit-button"></div>
            </div>
          </div>
          <div className={popupCardStyle["popup-title"]} id="popup-title">Tree Node</div>
          <div className={popupCardStyle["popup-seo"]}>
            <div className={popupCardStyle["popup-border"]}></div>
            <div className={popupCardStyle["popup-block"]} id="popup-block"></div>
          </div>
          <a href="" className={popupCardStyle["popup-button"]} id="popup-button" target="_blank">EXPLORE</a>
        </div>
      </div>;
  }

export default PopupCard