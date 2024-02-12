import React from "react";
import {links} from "../../../links.js";
import SearchInput from "../elements/ui-search/SearchInput.js";
import TreeCard from "../elements/ui-tree-card/TreeCard.js";
import TreeSettings from "../elements/ui-settings/Settings.js";
import TreeResources from "../elements/ui-resources/Resources.js";
import TreeFooter from "../elements/ui-footer/Footer.js";
import desktopStyle from "./styles/desktop.module.css"

const Desktop = () => {
  return <div className={desktopStyle["sidebar"]} id="desktop-wrapper">
      <div className={desktopStyle["sidebar-wrapper"]}>
        <DesktopHeader/>
        <TreeCard/>
        <TreeSettings/>
        <TreeResources/>
        <TreeFooter/>
      </div>
    </div>
}

export default Desktop;

function DesktopHeader() {
  return <div className={desktopStyle["sidebar-header"]}>
    <div className={desktopStyle["header-wrapper"]}>
      <SearchInput/>
    </div>
    <div className={desktopStyle["header-buttons"]}>
      <a href={links["indexLink"]} className={desktopStyle["index-button"]} target="_blank">Explore index</a>
      <p className={desktopStyle["clear-button"]} id="clear-button">Clear</p>
    </div>
  </div>;
}


