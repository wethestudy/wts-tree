import React from 'react';
import treeSettingsStyle from './treesettings.module.css'

function TreeSettings() {
    return <div className={treeSettingsStyle["sidebar-settings"]}>
      <div className={treeSettingsStyle["settings-title"]}>Settings</div>
      <div className={treeSettingsStyle["settings-wrapper"]}>
        <div className={treeSettingsStyle["settings-option-wrapper"]}>
        <div className={treeSettingsStyle["settings-tooltip-wrapper"]}>
          <div className={treeSettingsStyle["settings-subheading"]}>Category</div>
            <div className={treeSettingsStyle["tooltip"]}>
              <div className={treeSettingsStyle["info-wrapper"]}></div>
              <div className={treeSettingsStyle["tooltiptext"]}>Filters tree nodes based on category</div>
            </div>
          </div>
          <div className={treeSettingsStyle["select-container"]}>
            <div className={treeSettingsStyle["select-wrapper"]}>
              <select className={treeSettingsStyle["drop-field"]} id="drop-field" name="filter">
                <option id="categoryall" value="All">All</option>
                <option id="categorymath" value="Mathematics">Mathematics</option>
                <option id="categoryphysics" value="Physics">Physics</option>
                <option id="categoryengineering" value="Engineering">Engineering</option>
              </select>
            </div>
          </div>
        </div>
        <div className={treeSettingsStyle["settings-option-wrapper"]}>
          <div className={treeSettingsStyle["settings-tooltip-wrapper"]}>
            <div className={treeSettingsStyle["settings-subheading"]}>Connections</div>
            <div className={treeSettingsStyle["tooltip"]}>
              <div className={treeSettingsStyle["info-wrapper"]}></div>
              <div className={treeSettingsStyle["tooltiptext"]}>Displays node connections among various disciplines</div>
            </div>
          </div>
          <div className={treeSettingsStyle["form-wrapper"]}>
            <input type="checkbox" id="connections" name="connections"/>
            <label htmlFor="connections">See Connections</label>
          </div>
        </div>
        <div className={treeSettingsStyle["settings-option-wrapper"]}>
          <div className={treeSettingsStyle["settings-tooltip-wrapper"]}>
            <div className={treeSettingsStyle["settings-subheading"]}>Color Filters</div>
            <div className={treeSettingsStyle["tooltip"]}>
              <div className={treeSettingsStyle["info-wrapper"]}></div>
              <div className={treeSettingsStyle["tooltiptext"]}>Fills node with different colors based on selected filter</div>
            </div>
          </div>
          <div className={treeSettingsStyle["form-wrapper"]}>
            <input 
              id="radio-none"
              type="radio" 
              name="color"
              value="" 
              defaultChecked
              />
            <label htmlFor="radio-none">None</label>
          </div>
          <div className={treeSettingsStyle["form-wrapper"]}>
            <input 
              id="radio-category"
              type="radio" 
              name="color" 
              value="category" 
              />
            <label htmlFor="radio-category">Category</label>
          </div>
          <div className={treeSettingsStyle["form-wrapper"]}>
            <input 
              id="radio-topic"
              type="radio" 
              name="color" 
              value="topic" 
              />
            <label htmlFor="radio-topic">Topic</label>
          </div>
          <div className={treeSettingsStyle["form-wrapper"]}>
            <input 
              id="radio-posttype"
              type="radio" 
              name="color" 
              value="posttype" 
              />
            <label htmlFor="radio-posttype">Post Type</label>
          </div>
        </div>
      </div>
    </div>;
  }

export default TreeSettings