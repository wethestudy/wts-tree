import React from "react";
import {links} from "../../links";

function TreeResources() {
    const articleSlugs = ['how-to-use-the-tree']
    return <div className="sidebar-resources">
      <div className="resources-title">Help</div>
      <div className="resources-links">
        <a href={`${links["resourcesLink"]}/${articleSlugs[0]}`}>How to use the tree</a>
      </div>
    </div>;
  }

export default TreeResources