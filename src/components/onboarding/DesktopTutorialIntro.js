import React from "react";
import GenericCard from "./TutorialCard";
import desktopTutorialIntroStyle from "./desktoptutorialIntro.module.css"

const DesktopTutorialIntro = () => {
  let title = "Hi!"
  let text = <div>
    <p>Welcome to the Tree of Knowledge! <br/> Follow this tutorial to dive into the basics.</p>
    <p><i>You can quit the tutorial anytime by clicking on the upper-right button.</i></p>
    <p href="" className={desktopTutorialIntroStyle['card-button']} id="onboardIntroto1">OK</p>
  </div>
  return <>
    <div className={desktopTutorialIntroStyle["onboardingIntro"]} id="onboardingIntro">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorialIntro;


