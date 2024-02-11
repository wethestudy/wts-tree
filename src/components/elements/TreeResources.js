import React from "react";
import {links, resourceSlugs} from "../../links";
import treeResourcesStyle from "./treeresources.module.css"

function TreeResources() {
    return <div className={treeResourcesStyle["sidebar-resources"]}>
      <div className={treeResourcesStyle["resources-title"]}>Help</div>
      <div className={treeResourcesStyle["resources-links"]}>
        <a href={`${links["resourcesLink"]}/${resourceSlugs[0]}`} target="_blank">How to use the Tree</a>
        <a href={`${links["resourcesLink"]}/${resourceSlugs[1]}`} target="_blank">Tree anatomy and interface</a>
        <a href={`${links["resourcesLink"]}/${resourceSlugs[2]}`} target="_blank">General steps in using the tree</a>
        <a href={`${links["resourcesLink"]}/${resourceSlugs[3]}`} target="_blank">All about mastery</a>
        <a href={`${links["resourcesLink"]}/${resourceSlugs[4]}`} target="_blank">About Tree Evolution</a>
      </div>
    </div>;
  }

export default TreeResources