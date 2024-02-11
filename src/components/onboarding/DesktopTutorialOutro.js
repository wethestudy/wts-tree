import React from "react";
import GenericCard from "./TutorialCard.js";
import desktopTutorialOutroStyle from "./desktoptutorialOutro.module.css"
import {links} from "../../links.js"

const DesktopTutorialOutro = () => {
  let title = "Happy Learning!"
  let text = <div>
    <p>Congratulations! You have reached the end of the tutorial. You can revisit this by clicking on "Tutorial"</p>
    <p>If you need more help, feel free to explore <a href={`${links["resourcesLink"]}`}>resources</a></p>
    <p><i>Click on "Close Tutorial" on the upper-right.</i></p>
  </div>

  return <>
    <div className={desktopTutorialOutroStyle["onboardingOutro"]} id="onboardingOutro">
      <GenericCard title={title} text={text}/>
    </div>
  </>;
  }

export default DesktopTutorialOutro;


