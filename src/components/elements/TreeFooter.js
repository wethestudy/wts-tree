import React from "react";
import {links} from "../../links";

function TreeFooter() {
    return <div className="sidebar-footer">
      <div className="footer-wrapper">
        <a href={`${links["termsLink"]}`} target="_blank">Terms</a>
        <a href={`${links["privacyLink"]}`} target="_blank">Privacy</a>
      </div>
      <p>©{links["copyrightYear"]} WeTheStudy. All right reserved.</p>
      <p>Version {links["appVersion"]}</p>
    </div>;
  }

export default TreeFooter