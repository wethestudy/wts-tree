import { React } from "react";
import GenericCard from "../../../ui/GenericCard.js";
import onboarding1Style from "./styles/onboarding1.module.css"
import onboarding2Style from "./styles/onboarding2.module.css"
import onboarding3Style from "./styles/onboarding3.module.css"
import onboarding4Style from "./styles/onboarding4.module.css"
import onboarding5Style from "./styles/onboarding5.module.css"
import onboarding6Style from "./styles/onboarding6.module.css"
import onboarding7Style from "./styles/onboarding7.module.css"
import onboardingStyle from "./styles/onboarding.module.css"
import { links } from "../../../../links.js";

const DesktopOnboarding = () => {
    return <>
        <Onboarding1/>
        <Onboarding2/>
        <Onboarding3/>
        <Onboarding4/>
        <Onboarding5/>
        <Onboarding6/>
        <Onboarding7/>
        <div className={onboardingStyle["onboarding-button-end"]} id="end-button">CLOSE TUTORIAL</div>
    </>
}

const Onboarding1 = () => {
    let title = "Hi!"
    let text = <div>
        <p>Welcome to the Tree of Knowledge! <br/> Follow this tutorial to dive into the basics.</p>
        <p><i>You can quit the tutorial anytime by clicking on the upper-right button.</i></p>
        <p href="" className={onboarding1Style['card-button']} id="onboardIntroto1">OK</p>
    </div>
    return <>
        <div className={onboarding1Style["onboardingIntro"]} id="onboardingIntro">
        <GenericCard title={title} text={text}/>
        </div>
    </>;
}

const Onboarding2 = () => {
    let title = "1 of 5: Choose Any Node"
    let text = <div>
        <p>The tree is made up of nodes - the circle objects you see on the tree. 
        It represents an idea. These are logically connected to each other using branches or paths. They are designed to let ideas flow from one to another</p>
        <p>Pan and zoom around to navigate the tree. <u>Click on any node that interests you.</u></p>
    </div>

    return <>
        <div className={onboarding2Style["onboarding1"]} id="onboarding1">
        <GenericCard title={title} text={text}/>
        </div>
    </>;
}

const Onboarding3 = () => {
    let title = "2 of 5: The Tree Card"
    let text = <div>
    <p>When you click on a node, the tree card becomes activated. 
        It updates itself with information about the selected node.</p>
    <p><u>Press the "Explore" button on the activated Tree Card to continue</u></p>
    </div>

    return <>
    <div className={onboarding3Style["onboarding2"]} id="onboarding2">
        <GenericCard title={title} text={text}/>
    </div>
    </>;
}

const Onboarding4 = () => {
    let title = "3 of 5: Learn"
    let text = <div>
    <p>Clicking on the Tree Card's "EXPLORE" will take you to a new page containing the material.</p>
    <p>
        If you're a member, you can do the following:
    </p>
    <ul>
        <li>Click on <span className={onboarding4Style["card-button"]} style={{padding: "0.5rem 0.75rem", borderRadius: "10px"}}>MARK AS COMPLETE</span> to track your progress.</li>
        <br/>
        <li>Click on <span className={onboarding4Style["card-button"]} style={{padding: "0.5rem 0.75rem", borderRadius: "10px"}}>MASTER NODE</span> to take a quiz. When you successfully passed, you will "Master" the node.</li>
    </ul>
    <p>After understanding the material, you can continue to build your knowledge by reading adjacent nodes. Use the Tree Navigation section at the end of the article to guide you.</p>
    <p href="" className={onboarding4Style['card-button']} id="onboard3to4">OK</p>
    </div>

    return <>
    <div className={onboarding4Style["onboarding3"]} id="onboarding3">
        <GenericCard title={title} text={text}/>
    </div>
    </>;
}

const Onboarding5 = () => {
    let title = "4 of 5: See Your Progress"
    let text = <div>
        <p>Completing or mastering nodes will fill nodes and branches of the tree. When no colored filters are applied:</p>
        <div className={onboarding5Style['node-wrapper']}>
        <div className={onboarding5Style['unexplored-node']}></div> Unexplored Node
        <div className={onboarding5Style['completed-node']}></div> Completed Node
        <div className={onboarding5Style['mastered-node']}></div> Mastered Node
        </div>
        <p>Continue exploring different nodes. Track adjacent nodes to fill branches. Light up your personalized Tree of Knowledge.</p>
        <p className={onboarding5Style['card-button']} id="onboard4to5">PROCEED</p>
    </div>

    return <>
        <div className={onboarding5Style["onboarding4"]} id="onboarding4">
        <GenericCard title={title} text={text}/>
        </div>
    </>;
}

const Onboarding6 = () => {
    let title = "5 of 5: Set a Goal"
    let text = <div>
        <p>Tracks are collections of nodes one must master. You can view a list of tracks on the bottom-right of the desktop screen.</p>
        <p>Every track is open to you. Select a specific track from the list and aim to master all the encircled nodes</p>
        <p>While mastering nodes, your mastery is carried over to other tracks</p>
        <p><u>Completing a track will earn you a certificate which you can view by clicking on the button above the track card.</u></p>
        <p href="" className={onboarding6Style['card-button']} id="onboard5toOutro">OK</p>
    </div>

    return <>
        <div className={onboarding6Style["onboarding5"]} id="onboarding5">
        <GenericCard title={title} text={text}/>
        </div>
    </>;
}

const Onboarding7 = () => {
    let title = "Happy Learning!"
    let text = <div>
        <p>Congratulations! You have reached the end of the tutorial. You can revisit this by clicking on "Tutorial"</p>
        <p>If you need more help, feel free to explore <a href={`${links["resourcesLink"]}`}>resources</a></p>
        <p><i>Click on "Close Tutorial" on the upper-right.</i></p>
    </div>

    return <>
        <div className={onboarding7Style["onboardingOutro"]} id="onboardingOutro">
        <GenericCard title={title} text={text}/>
        </div>
    </>;
}

export { DesktopOnboarding }