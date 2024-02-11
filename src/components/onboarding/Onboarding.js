import * as d3 from "d3";
import {React, useEffect} from "react";
import DesktopTutorial1 from "./DesktopTutorial1"
import DesktopTutorial2 from "./DesktopTutorial2";
import DesktopTutorial3 from "./DesktopTutorial3";
import DesktopTutorial4 from "./DesktopTutorial4";
import DesktopTutorial5 from "./DesktopTutorial5";
import onboardingStyle from "./onboarding.module.css"
import { OnboardingUI } from "../ui/OnboardingUI";
import DesktopTutorialIntro from "./DesktopTutorialIntro";
import DesktopTutorialOutro from "./DesktopTutorialOutro";

const Onboarding = ({setMemberState}) => {
    return <>
        <DesktopTutorialIntro/>
        <DesktopTutorial1/>
        <DesktopTutorial2/>
        <DesktopTutorial3/>
        <DesktopTutorial4/>
        <DesktopTutorial5/>
        <DesktopTutorialOutro/>
        <div className={onboardingStyle["end-button"]} id="end-button">CLOSE TUTORIAL</div>
    </>
}

export {Onboarding}