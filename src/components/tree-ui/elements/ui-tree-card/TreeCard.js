import React from 'react';
import treeCardStyle from './styles/treecard.module.css'

function TreeCard() {
    return <div className={treeCardStyle["sidebar-card"]} id="sidebar-card">
      <div className={treeCardStyle["card-scroll"]}>
          <div className={treeCardStyle["sidebar-buttons"]}>
            <div className={treeCardStyle["reveal-button"]}>
              <div className={treeCardStyle["mobile-reveal-container"]}>
                <div className={treeCardStyle["mobile-reveal-wrapper"]} id="reveal-button"></div>
              </div>
            </div>
            <div className={treeCardStyle["hide-button"]}>
              <div className={treeCardStyle["mobile-hide-container"]}>
                <div className={treeCardStyle["mobile-hide-wrapper"]} id="hide-button"></div>
              </div>
            </div>
            <a href="" className={treeCardStyle["card-button"]} id="mobile-card-button">EXPLORE</a>
          </div>
          <div className={treeCardStyle["card-title"]} id="card-title">Select a Tree Node</div>
          <div className={treeCardStyle["card-seo"]}>
            <div className={treeCardStyle["card-border"]}></div>
            <div className={treeCardStyle["card-block"]} id="card-block"></div>
          </div>
          <div className={treeCardStyle["card-wrapper"]}>
            <div className={treeCardStyle["card-label"]}>Category</div>
            <div className={treeCardStyle["card-field"]} id="card-category"></div>
          </div>
          <div className={treeCardStyle["card-wrapper"]}>
            <div className={treeCardStyle["card-label"]}>Subcategory</div>
            <div className={treeCardStyle["card-field"]} id="card-subcategory"></div>
          </div>
          <div className={treeCardStyle["card-wrapper"]}>
            <div className={treeCardStyle["card-label"]}>Topic</div>
            <div className={treeCardStyle["card-field"]} id="card-topic"></div>
          </div>
          <div className={treeCardStyle["card-wrapper"]}>
            <div className={treeCardStyle["card-label"]}>Revision</div>
            <div className={treeCardStyle["card-field"]} id="card-revision"></div>
          </div>
          <div className={treeCardStyle["card-wrapper"]}>
            <div className={treeCardStyle["card-label"]}>Sibling Order</div>
            <div className={treeCardStyle["card-field"]} id="card-order"></div>
          </div>
          <div className={treeCardStyle["card-wrapper"]}>
            <div className={treeCardStyle["card-label"]}>Post Type</div>
            <div className={treeCardStyle["card-field"]} id="card-posttype"></div>
          </div>
          <a href="" className={treeCardStyle["card-button"]} id="card-button" target="_blank">EXPLORE</a>
          <div className={treeCardStyle["card-button-onboard-disable"]} id="onboard2to3">EXPLORE</div>
        </div>
      </div>;
  }

export default TreeCard