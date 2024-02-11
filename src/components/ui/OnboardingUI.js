import * as d3 from "d3";
import { UI } from "./UI.js";
import onboardStyle from "../../components/elements/treecard.module.css"
import desktopTutorial1Style from "../../components/onboarding/desktoptutorial1.module.css"

export const OnboardingUI = {
  modifyTreeCardButton: ()=>{
    d3.select('#card-button').style('display', "none")
    d3.select('#onboard2to3').style('display', "block")
  },
  returnTreeCardButton: ()=>{
    d3.select('#card-button').style('display', "block")
    d3.select('#onboard2to3').style('display', "none")
  },
  resetCard: () => {
    let cardTitle = d3.select('#card-title');
    let cardBlock = d3.select('#card-block');
    let cardCategory = d3.select('#card-category');
    let cardSubcategory = d3.select('#card-subcategory');
    let cardTopic = d3.select('#card-topic');
    let cardRevision = d3.select('#card-revision');
    let cardOrder = d3.select('#card-order');
    let cardPostType = d3.select('#card-posttype');
    let cardButton = d3.select('#onboard2to3');
    // let mobileCardButton = d3.select('#mobile-card-button');

    cardTitle.text("Select a Tree Node");
    UI.defaultBlock(cardBlock)
    UI.defaultWrapper(cardCategory)
    UI.defaultWrapper(cardSubcategory)
    UI.defaultWrapper(cardTopic)
    UI.defaultWrapper(cardRevision)
    UI.defaultWrapper(cardOrder)
    UI.defaultWrapper(cardPostType)
    d3.select('#sidebar-card').style('border', '4px solid white')
    cardButton.classed(`${onboardStyle['card-button-onboard-disable']}`,true);
    cardButton.classed(`${onboardStyle['card-button-onboard']}`,false);
    // cardButton.classed(, "");
    // mobileCardButton.attr('href', "");
  },
  resetBorder: ()=>{
    d3.select('#sidebar-card').style('border', '4px solid white')
    d3.select('#track-wrapper').style('border', '4px solid white')
    d3.select('#track-list-wrapper').style('border', '4px solid white')
  },
  updateCard: (d) => {
    let cardTitle = d3.select('#card-title');
    let cardBlock = d3.select('#card-block');
    let cardCategory = d3.select('#card-category');
    let cardSubcategory = d3.select('#card-subcategory');
    let cardTopic = d3.select('#card-topic');
    let cardRevision = d3.select('#card-revision');
    let cardOrder = d3.select('#card-order');
    let cardPostType = d3.select('#card-posttype');
    let cardButton = d3.select('#onboard2to3');


    cardTitle.text(d.data.name);
    if (d.data.seoPostSummary) {
      cardBlock.text(d.data.seoPostSummary);
      cardBlock.style('background-color', 'transparent');
      cardBlock.style('height', 'auto');
    }
    if (d.data.category) {
      cardCategory.text(d.data.category);
      cardCategory.style('background-color', 'transparent');
    } else {
      UI.defaultWrapper(cardCategory)
    }
    if (d.data.subcategory) {
      cardSubcategory.text(d.data.subcategory);
      cardSubcategory.style('background-color', 'transparent');
    } else {
      UI.defaultWrapper(cardSubcategory)
    }
    if (d.data.topic) {
      cardTopic.text(d.data.topic);
      cardTopic.style('background-color', 'transparent');
    } else {
      UI.defaultWrapper(cardTopic)
    }
    if (d.data.revision) {
      cardRevision.text(d.data.revision);
      cardRevision.style('background-color', 'transparent');
    } else {
      UI.defaultWrapper(cardRevision)
    }
    if (d.data.siblingOrder) {
      cardOrder.text(d.data.siblingOrder);
      cardOrder.style('background-color', 'transparent');
    } else {
      UI.defaultWrapper(cardOrder)
    }
    if (d.data.posttype) {
      cardPostType.text(d.data.posttype);
      cardPostType.style('background-color', 'transparent');
    } else {
      UI.defaultWrapper(cardPostType)
    }
    cardButton.classed(`${onboardStyle['card-button-onboard-disable']}`,false);
    cardButton.classed(`${onboardStyle['card-button-onboard']}`,true);
    d3.select('#sidebar-card').style('border', '4px solid #b59d69')
  },
  showTutorial: ()=>{
    OnboardingUI.modifyTreeCardButton()
    d3.select('#onboardingIntro').style("visibility", "visible");
    d3.select('#end-button').style("display", "block");
    d3.select('#desktop-wrapper').property('scrollTop', 200)
  },
  showOnboarding1: ()=>{
    d3.select('#onboarding1').style("visibility", "visible");
    d3.select('#onboardingIntro').style("visibility", "hidden");
  },
  showOnboarding2: ()=>{
    d3.select('#onboarding2').style("visibility", "visible");
    d3.select('#onboarding1').style("visibility", "hidden");
    d3.select('#onboarding1').classed(`${desktopTutorial1Style['onboarding1']}`, false)
    d3.select('#onboarding1').classed(`${desktopTutorial1Style['onboarding1-modified']}`, true)
  },
  showOnboarding3: ()=>{
    OnboardingUI.resetBorder()
    d3.select('#onboarding3').style("visibility", "visible");
    d3.select('#onboarding2').style("visibility", "hidden");
    d3.select('#onboarding1').style("visibility", "hidden");
    d3.select('#onboarding4').style("visibility", "hidden");
    d3.select('#onboarding5').style("visibility", "hidden");
    d3.select('#onboardingIntro').style("visibility", "hidden");
    d3.select('#onboardingOutro').style("visibility", "hidden");
  },
  showOnboarding4: ()=>{
    d3.select('#onboarding4').style("visibility", "visible");
    d3.select('#onboarding3').style("visibility", "hidden");
  },
  showOnboarding5: ()=>{
    d3.select('#onboarding5').style("visibility", "visible");
    d3.select('#onboarding4').style("visibility", "hidden");
    d3.select('#track-wrapper').style('border', '4px solid #b59d69')
    d3.select('#track-list-wrapper').style('border', '4px solid #b59d69')
  },
  showOnboardingOutro: ()=>{
    d3.select('#onboardingOutro').style("visibility", "visible");
    d3.select('#onboarding5').style("visibility", "hidden");
  },
  dismissTutorial: ()=>{
    d3.select('#onboarding1').style("visibility", "hidden");
    d3.select('#onboarding2').style("visibility", "hidden");
    d3.select('#onboarding3').style("visibility", "hidden");
    d3.select('#onboarding4').style("visibility", "hidden");
    d3.select('#onboarding5').style("visibility", "hidden");
    d3.select('#onboardingIntro').style("visibility", "hidden");
    d3.select('#onboardingOutro').style("visibility", "hidden");
    d3.select('#onboarding1').classed(`${desktopTutorial1Style['onboarding1']}`, true)
    d3.select('#onboarding1').classed(`${desktopTutorial1Style['onboarding1-modified']}`, false)
    d3.select('#end-button').style("display", "none");
  },
};
