import React from "react";
import GenericCard from "./TutorialCard";
import desktopTutorial2Style from "./desktoptutorial2.module.css"

const DesktopTutorial2 = () => {
  let title = "2 of 5: The Tree Card"
  let text = <div>
    <p>When you click on a node, the tree card becomes activated. 
      It updates itself with information about the selected node.</p>
    <p><u>Press the "Explore" button on the activated Tree Card to continue</u></p>
  </div>

  return <>
    <div className={desktopTutorial2Style["onboarding2"]} id="onboarding2">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorial2;


