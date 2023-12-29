import React from "react";
import {links, resourceSlugs} from "../../links";

function TreeResources() {
    return <div className="sidebar-resources">
      <div className="resources-title">Help</div>
      <div className="resources-links">
        <a href={`${links["resourcesLink"]}/${resourceSlugs[0]}`} target="_blank">How to use the tree</a>
      </div>
    </div>;
  }

export default TreeResources