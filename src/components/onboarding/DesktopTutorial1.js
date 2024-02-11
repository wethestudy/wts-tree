import React from "react";
import GenericCard from "./TutorialCard";
import desktopTutorial1Style from "./desktoptutorial1.module.css"

const DesktopTutorial1 = () => {
  let title = "1 of 5: Choose Any Node"
  let text = <div>
    <p>The tree is made up of nodes - the circle objects you see on the tree. 
      It represents an idea. These are logically connected to each other using branches or paths. They are designed to let ideas flow from one to another</p>
    <p>Pan and zoom around to navigate the tree. <u>Click on any node that interests you.</u></p>
  </div>

  return <>
    <div className={desktopTutorial1Style["onboarding1"]} id="onboarding1">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorial1;


