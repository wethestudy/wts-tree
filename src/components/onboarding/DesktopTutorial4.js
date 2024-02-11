import React from "react";
import GenericCard from "./TutorialCard";
import desktopTutorial4Style from "./desktoptutorial4.module.css"

const DesktopTutorial4 = () => {
  let title = "4 of 5: See Your Progress"
  let text = <div>
    <p>Completing or mastering nodes will fill nodes and branches of the tree. When no colored filters are applied:</p>
    <div className={desktopTutorial4Style['node-wrapper']}>
      <div className={desktopTutorial4Style['unexplored-node']}></div> Unexplored Node
      <div className={desktopTutorial4Style['completed-node']}></div> Completed Node
      <div className={desktopTutorial4Style['mastered-node']}></div> Mastered Node
    </div>
    <p>Continue exploring different nodes. Track adjacent nodes to fill branches. Light up your personalized Tree of Knowledge.</p>
    <p className={desktopTutorial4Style['card-button']} id="onboard4to5">PROCEED</p>
  </div>

  return <>
    <div className={desktopTutorial4Style["onboarding4"]} id="onboarding4">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorial4;


