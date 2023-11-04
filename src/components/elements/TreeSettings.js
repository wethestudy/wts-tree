import React from 'react';

function TreeSettings() {
    return <div className="sidebar-settings">
      <div className="settings-title">Settings</div>
      <div className="settings-wrapper">
        <div className="settings-option-wrapper">
          <div className="settings-subheading">Category</div>
          <div className="select-container">
            <div className="select-wrapper">
              <select className="drop-field" id="drop-field" name="filter">
                <option id="categoryall" value="All">All</option>
                <option id="categorymath" value="Mathematics">Mathematics</option>
                <option id="categoryphysics" value="Physics">Physics</option>
                <option id="categoryengineering" value="Engineering">Engineering</option>
              </select>
            </div>
          </div>
        </div>
        <div className="settings-option-wrapper">
          <div className="settings-subheading">Connections</div>
          <div className="form-wrapper">
            <input type="checkbox" id="connections" name="connections"/>
            <label htmlFor="connections">See Connections</label>
            <span className="checkmark"></span>
          </div>
        </div>
        <div className="settings-option-wrapper">
          <div className="settings-subheading">Color Coding</div>
          <div className="form-wrapper">
            <input 
              id="radio-none"
              type="radio" 
              name="color"
              value="" 
              defaultChecked
              />
            <label htmlFor="radio-none">None</label>
          </div>
          <div className="form-wrapper">
            <input 
              id="radio-category"
              type="radio" 
              name="color" 
              value="category" 
              />
            <label htmlFor="radio-category">Category</label>
          </div>
          <div className="form-wrapper">
            <input 
              id="radio-topic"
              type="radio" 
              name="color" 
              value="topic" 
              />
            <label htmlFor="radio-topic">Topic</label>
          </div>
        </div>
      </div>
    </div>;
  }

export default TreeSettings