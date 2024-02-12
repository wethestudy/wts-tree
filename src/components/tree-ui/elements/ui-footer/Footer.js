import React from "react";
import {links} from "../../../../links";
import treeFooterStyle from './styles/treefooter.module.css'

function TreeFooter() {
    return <div className={treeFooterStyle["sidebar-footer"]}>
      <div className={treeFooterStyle["footer-wrapper"]}>
        <div className={treeFooterStyle["tutorial-link"]} id="tutorial-link">Tutorial</div>
        <a href={`${links["termsLink"]}`} target="_blank">Terms</a>
        <a href={`${links["privacyLink"]}`} target="_blank">Privacy</a>
      </div>
      <p>©{links["copyrightYear"]} WeTheStudy. All right reserved.</p>
      <p>Version {links["appVersion"]}</p>
    </div>;
  }

export default TreeFooter