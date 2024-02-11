import React from "react";
import GenericCard from "./TutorialCard";
import desktopTutorial3Style from "./desktoptutorial3.module.css"

const DesktopTutorial3 = () => {
  let title = "3 of 5: Learn"
  let text = <div>
    <p>Clicking on the Tree Card's "EXPLORE" will take you to a new page containing the material.</p>
    <p>
      If you're a member, you can do the following:
    </p>
    <ul>
        <li>Click on <span className={desktopTutorial3Style["card-button"]} style={{padding: "0.5rem 0.75rem", borderRadius: "10px"}}>MARK AS COMPLETE</span> to track your progress.</li>
        <br/>
        <li>Click on <span className={desktopTutorial3Style["card-button"]} style={{padding: "0.5rem 0.75rem", borderRadius: "10px"}}>MASTER NODE</span> to take a quiz. When you successfully passed, you will "Master" the node.</li>
    </ul>
    <p>After understanding the material, you can continue to build your knowledge by reading adjacent nodes. Use the Tree Navigation section at the end of the article to guide you.</p>
    <p href="" className={desktopTutorial3Style['card-button']} id="onboard3to4">OK</p>
  </div>

  return <>
    <div className={desktopTutorial3Style["onboarding3"]} id="onboarding3">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorial3;


