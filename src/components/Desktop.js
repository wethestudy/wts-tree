import React from "react";
import {links} from "../links";
import SearchInput from "./elements/SearchInput";
import TreeCard from "./elements/TreeCard";
import TreeSettings from "./elements/TreeSettings";
import TreeResources from "./elements/TreeResources";
import TreeFooter from "./elements/TreeFooter";

const Desktop = () => {
    return <div className="sidebar">
      <div className="sidebar-wrapper">
        <DesktopHeader/>
        <TreeCard/>
        <TreeSettings/>
        <TreeResources/>
        <TreeFooter/>
      </div>
    </div>;
  }

export default Desktop;

function DesktopHeader() {
  return <div className="sidebar-header">
    <div className='header-wrapper'>
      <SearchInput/>
    </div>
    <div className="header-buttons">
      <a href={links["indexLink"]} className="index-button" target="_blank">Explore index</a>
      <p className="clear-button" id="clear-button">Clear</p>
    </div>
  </div>;
}


