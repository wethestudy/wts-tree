import React from "react";
import GenericCard from "./TutorialCard";
import desktopTutorial5Style from "./desktoptutorial5.module.css"

const DesktopTutorial5 = () => {
  let title = "5 of 5: Set a Goal"
  let text = <div>
    <p>Tracks are collections of nodes one must master. You can view a list of tracks on the bottom-right of the desktop screen.</p>
    <p>Every track is open to you. Select a specific track from the list and aim to master all the encircled nodes</p>
    <p>While mastering nodes, your mastery is carried over to other tracks</p>
    <p><u>Completing a track will earn you a certificate which you can view by clicking on the button above the track card.</u></p>
    <p href="" className={desktopTutorial5Style['card-button']} id="onboard5toOutro">OK</p>
  </div>

  return <>
    <div className={desktopTutorial5Style["onboarding5"]} id="onboarding5">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorial5;


