import React from "react";
import {links} from "../../links";

function TreeFooter() {
    return <div className="sidebar-footer">
      <div className="footer-wrapper">
        <a href={`${links["termsLink"]}`}>Terms</a>
        <a href={`${links["privacyLink"]}`}>Privacy</a>
      </div>
      <p>©{links["copyrightYear"]} WeTheStudy. All right reserved.</p>
    </div>;
  }

export default TreeFooter