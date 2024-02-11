import React from 'react';
import * as d3 from "d3";
import { useEffect, useRef, useState } from 'react';
import RadialTree from './components/RadialTree.js';
import Desktop from './components/Desktop.js'
import Mobile from "./components/Mobile.js";
import NavigationControls from './components/NavigationControls';
import Loading from './components/alert/Loading.js';
import PopupCard from './components/elements/PopupCard.js';
import database from "./database/tree-json.js"
import { DesktopUI } from "./components/ui/DesktopUI.js";
import { stateUtilities } from "./components/utilities/stateUtilities.js";
import { treeUtilities } from "./components/utilities/treeUtilities.js";
import { RadialTreeUI } from "./components/ui/RadialTreeUI.js";
import { Search } from "./components/Search.js";
import { searchUtilities } from "./components/utilities/searchUtilities.js";
import { MediaWarning } from "./components/alert/MediaWarning.js";
import { showLoadingScreen } from "./devSettings.js";
import { cameraUtilities } from './components/utilities/cameraUtilities.js';
import treeStyle from './tree.module.css'
import { Onboarding } from './components/onboarding/Onboarding.js';
import { OnboardingUI } from './components/ui/OnboardingUI.js';
import tracksDatabase from './database/tree-tracks.js';
import { Track } from './components/elements/Track.js';
import { CertificateModal } from './components/Certificate.js';
import { MobileUI } from './components/ui/MobileUI.js';

function Tree() {
  // ===== STATE =====
  // Initialize state variables
  let [root, setRoot] = useState(null)
  let [member, setMember] = useState(null);
  let [customFields, setCustomFields] = useState(null);
  let [savedMemberState, setSavedMemberState] = useState(null);
  let activeNode = useRef({activeElement: null, activeTag: null})
  let [connections, setConnections] = useState([])
  let [view, setView] = useState(null);
  let treeState = {
    root: root,
    member: member,
    activeNode: activeNode,
    cameraPosition: {k: cameraUtilities.zoomProperties.defaultZoomScale, x: 0, y: 0},
    connections: connections,
    view: view,
    customFields: customFields
  }
  let [track, setTrack] = useState(null);

  // Define state functions
  const setRootState = () => {
    let category
    try {
      category = d3.select("#drop-field").node().value;
    } catch (error) {
      category = "All"
    }
    let treeRadius = treeUtilities.getTreeRadius(category)
    let filterRecords = treeUtilities.filterRecords(treeUtilities.processJSON(database), category)
    treeState.root = treeUtilities.processRoot(filterRecords, treeRadius)
    setRoot(treeState.root)
  }
  const setMemberState = (memberJson) => {
    if (memberJson === null) treeState.member = {data: {completedArticlesID:[], masteredArticlesID:[]}}
    showLoadingScreen ? treeState.member = null : treeState.member = memberJson
    setMember(treeState.member)
  }
  const setCustomFieldsState = (customFields) => {
    if (customFields === null) treeState.customFields = {"certificate-name": "John Doe"}
    showLoadingScreen ? treeState.customFields = null : treeState.customFields = customFields
    setCustomFields(treeState.customFields)
  }
  const setConnectionState = () => {
    treeState.connections = stateUtilities.constructConnections(treeState.root.descendants())
    setConnections(treeState.connections)
  }
  const setViewState = (view) => {
    if (view === null) treeState.view = {activate: false, object: null};
    treeState.view = view
    setView(treeState.view)
  }
  const setStaticTreeState =() => {
    setRootState()
    treeState.activeNode.current = stateUtilities.resetActiveNode(treeState.activeNode.current)
    treeState.camera = stateUtilities.resetCamera(treeState.cameraPosition)
    setConnectionState()
  }

  // Handle dispatch event and state useEffect
  const handleEventFromWebflow = async (event) => {
    if (event.detail) {
      console.log('Received event from Webflow:', event.detail);
      let dispatchOptions = await event.detail;
      setSavedMemberState({...dispatchOptions.member})
      setMemberState(dispatchOptions.member)
      setCustomFieldsState(dispatchOptions.customFields)
      setViewState(dispatchOptions.view)
      processTracks(dispatchOptions.member.data.masteredArticlesID)
    }
  };
  useEffect(() => {
    document.addEventListener('memberData', handleEventFromWebflow);
    return () => {
      document.removeEventListener('memberData', handleEventFromWebflow);
    };
  }, []);
  useEffect(()=>{
    setStaticTreeState()
  }, [])

// ===== TRACK =====
let [selectedTrack, setSelectedTrack] = useState(tracksDatabase[0])
  const processTracks = (masteredArticlesID) =>{
    let requirementCount = 0
    tracksDatabase.forEach((track)=>{
      let numberOfMasteredNodes = 0
      requirementCount = track.fields["Nodes"].length;
      track.fields["Nodes"].forEach((node)=>{
        if(masteredArticlesID.includes(node)){numberOfMasteredNodes++}
      })
      track.fields["Progress"] = numberOfMasteredNodes/requirementCount*100
      track.fields["Style"] = {
        width: `${numberOfMasteredNodes/requirementCount*100}%`,
      }
    })
    setTrack(tracksDatabase)
  }

// ===== WINDOW =====
  // Initialize window variables
  let [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight,})
  let [mobile, setMobile] = useState(false);
  let [mediaWarning, setMediaWarning] = useState(false);
  
  // Define window functions
  const debounce = (fn, ms) => {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }
  const handleWindowResize = () => {
    debounce(
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      }), 1000)
      try {
        if(treeState.view.type === "default"){
          DesktopUI.clearUI()
        } else {
          DesktopUI.clearPopup()
        }
      } catch {}
  }
  const handleWindowDesktopMobile = () => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if (window.innerWidth < 840 && window.innerHeight < 1200) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if (window.innerWidth < 360 || window.innerHeight < 550){
      setMediaWarning(true);
    } else {
      setMediaWarning(false);
    }
  };
  // useEffect
  useEffect(()=>{
    handleWindowDesktopMobile()
  },[])
  useEffect(()=>{
    window.addEventListener('resize', handleWindowDesktopMobile);
    return () => window.removeEventListener('resize', handleWindowDesktopMobile);
  }, [])
  useEffect(()=>{
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  // ===== UI =====
  // DEFAULT VIEW - useEffect (define functions for HTML elements)
  useEffect(()=>{
    d3.select("#clear-button")
      .on('click', ()=>{
        DesktopUI.clearUI()
        try{
            RadialTreeUI.deactivateActiveNode(
              treeState.activeNode.current, 
              treeState.member.data.completedArticlesID, 
              treeState.member.data.masteredArticlesID
            )
            treeState.activeNode.current.activeElement = null
            treeState.activeNode.current.activeTag = null
        } catch {
            return
        }
      })
    d3.select("#drop-field")
      .on('change', ()=>{
        setStaticTreeState()
        DesktopUI.clearUI()
        RadialTreeUI.displayConnections(treeState.activeNode.current)
      })
    d3.select('#connections')
      .on('change', ()=>{RadialTreeUI.displayConnections(treeState.activeNode.current)})
    d3.selectAll('input[name="color"]')
      .on('change', ()=>{RadialTreeUI.colorNodes(
        treeState.root.descendants(), 
        treeState.member.data.completedArticlesID, 
        treeState.member.data.masteredArticlesID, 
        treeState.activeNode.current)});
    d3.select('#search-input')
      .on('input', ()=>{searchUtilities.handleSearch(
        treeState.root.descendants(), 
        treeState.member.data.completedArticlesID, 
        treeState.member.data.masteredArticlesID, 
        treeState.activeNode.current, 
        treeState.cameraPosition, 
        treeState.view.type)})
      .on('click', ()=>{searchUtilities.handleSearch(
        treeState.root.descendants(), 
        treeState.member.data.completedArticlesID, 
        treeState.member.data.masteredArticlesID, 
        treeState.activeNode.current, 
        treeState.cameraPosition, 
        treeState.view.type)})
    d3.select("#tutorial-link")
      .on('click', (event)=>{
        DesktopUI.clearUI()
        OnboardingUI.showTutorial()
        resetTreeState()
        setMemberState({data: {
          "completedArticlesID": [],
          "masteredArticlesID": []
        }})
        setTutorial(true)
    })
    d3.select('#track-item-wrapper')
        .on('click',()=>{
          d3.select('#track-list-wrapper')
            .style('visibility', 'visible')
    })
    tracksDatabase.map((track, index)=>{
      d3.select(`#track-item-wrapper-${index}`)
      .on('click',()=>{
        DesktopUI.clearUI()
        setSelectedTrack(track)
        d3.select('#track-list-wrapper')
          .style('visibility', 'hidden')
        MobileUI.hideTracks()
        resetTreeState()
        if(tutorial){
          OnboardingUI.resetCard()
        }
      })
    })
    d3.select('#onboardIntroto1').on("click", (event)=>{
      OnboardingUI.showOnboarding1()
    })
    d3.select('#onboard2to3').on("click", (event)=>{
      OnboardingUI.showOnboarding3()
    })
    d3.select('#onboard3to4').on("click", (event)=>{
      let testJSON = {data: {
          "completedArticlesID": [
              "recV11cZHfUSnTZBK",
              "recmaiXD2wjuhYExE",
              "recFnOVAj5Jzh7pu9",
              "rec4OtOiF4IWFYL4o",
              "recr13UJa8DvT8mkZ",
              "rec8JA1707i7en06Q",
              "recGeLLEBy3zPr8CT",
              "reccwD9HPgLQD9q00",
              "rec3qK3cct95CsuX1",
              "rec0gOJox3OGpXzTF",
              "recw53t2JbZvVnpJZ",
              "recYlWMz3XqsTVXWD",
              "recIaGLwn69Un34Uy",
              "rec8cAnazv7cLsrNb",
              "recysej3plsOBDHsX",
              "recVnleU1MC7YARxo",
              "recvcw1W8UJKVKjuy",
              "recdvvUmpqkPr9VLA",
              "recDHDE6XpgRUV8Ul",
              "recqA5WOvf1AwDPWx",
              "reclu91SFS4MXS0dW",
              "recJiD3CzMjjFQLNw",
              "recogNWkcjCALAAJl",
              "recvo4DhGOuRDWeK6",
              "recmcAjSkLB4iSk2S",
              "recZLwB6pRypXoEqn",
              "recSMcfXIExrOts9f",
              "recUsiVVPvF5i3f6S",
              "recaKCKG3sfNHqvxB",
              "recabrxf8eUisN21V",
              "recfoTRCAbGQhcT6o",
              "recES3gDB32VysGf1",
              "reconRJ15nWVA3rzT",
              "recgmK7kf3ke7ufdP",
              "recoeDE0cGtWl0Kn9",
              "recdyw7GvBujike7k",
              "recaC4AWiJgH1bDxu",
              "recOsTQ2yn3iMO2kB",
              "recItbtoinRGHKqsJ",
              "rec0bh6y3ggaHIUJb",
              "recV11cZHfUSnTZBK",
              "rec9qyDQYiWy3KeSG",
              "recEbA029mSizInxp",
              "recDUE77g8h89SITp",
              "recgd6Q0YvJPUXtxy",
              "rec5Azd2LMy3JNWly",
              "recTJTOlag5moRMAz",
              "recAg3722hqd9AASR",
              "rec5k97PC5z0lYU65",
              "recFiTVmGLYdmbY9a",
              "recr3u3RSVdoqFNrl",
              "recNJYE5Kg4zCOuJK",
              "recn3NcEV7JbR20vi",
              "recOsB7NfKvuPlUJe",
              "recXg3q5obV8OUNPr",
              "rec4nqImwRDdSYoJ2",
              "reclbSH8KLrUloxaO",
              "recDF1qp9BrKSO9D0",
              "rec61Q3yfHE5UZcez",
              "recxg0TZ22hQ3HyRl",
              "recQYLiwHfnOWCLpg",
              "recsupTLt6yVHzmBM",
              "recN1mK5Gf7AbmKBJ",
              "recQosmhQmV7zobeU",
              "recKVtNXqxjiIDU3l",
              "recZBXi5i3xsNYBZS",
              "recPm4hICXUAiaPSJ",
              "recEWWXTJOBhKVnth",
              "recOio904lvegA5Ls",
              "rec46n0JQr6qHOLqN",
              "rec14W03Sx9TmmYag",
              "recInVP5uHEWCbIWg",
              "rec9Opg7uUaNVG6f3"
          ],
          "masteredArticlesID": [
            "recV11cZHfUSnTZBK",
              "recmaiXD2wjuhYExE",
              "recFnOVAj5Jzh7pu9",
              "rec4OtOiF4IWFYL4o",
              "recr13UJa8DvT8mkZ",
              "rec8JA1707i7en06Q",
              "recGeLLEBy3zPr8CT",
              "reccwD9HPgLQD9q00",
              "rec3qK3cct95CsuX1",
              "rec0gOJox3OGpXzTF",
              "recw53t2JbZvVnpJZ",
              "recYlWMz3XqsTVXWD",
              "recIaGLwn69Un34Uy",
              "rec8cAnazv7cLsrNb",
              "recysej3plsOBDHsX",
              "recVnleU1MC7YARxo",
              "recvcw1W8UJKVKjuy",
              "recdvvUmpqkPr9VLA",
              "recDHDE6XpgRUV8Ul",
              "recqA5WOvf1AwDPWx",
              "reclu91SFS4MXS0dW",
              "recJiD3CzMjjFQLNw",
              "recogNWkcjCALAAJl",
              "recvo4DhGOuRDWeK6",
              "recmcAjSkLB4iSk2S",
              "recZLwB6pRypXoEqn",
              "recSMcfXIExrOts9f",
              "recUsiVVPvF5i3f6S",
              "recabrxf8eUisN21V",
              "recfoTRCAbGQhcT6o",
              "recES3gDB32VysGf1",
              "reconRJ15nWVA3rzT",
              "recgmK7kf3ke7ufdP",
              "recoeDE0cGtWl0Kn9",
              "recdyw7GvBujike7k",
              "recaC4AWiJgH1bDxu",
              "recItbtoinRGHKqsJ",
              "rec0bh6y3ggaHIUJb",
              "recV11cZHfUSnTZBK",
              "rec9qyDQYiWy3KeSG",
              "recEbA029mSizInxp",
          ]
      }};
      setMemberState(testJSON)
      processTracks(testJSON.data.masteredArticlesID)
      resetTreeState()
      OnboardingUI.resetCard()
      OnboardingUI.showOnboarding4()
    })
    d3.select('#onboard4to5').on("click", (event)=>{
      OnboardingUI.showOnboarding5()
    })
    d3.select('#onboard5toOutro').on("click", (event)=>{
      OnboardingUI.showOnboardingOutro()
    })
    d3.select('#end-button')
      .on("click", (event)=>{
        DesktopUI.clearUI()
        OnboardingUI.dismissTutorial()
        OnboardingUI.resetBorder()
        OnboardingUI.returnTreeCardButton()
        setMemberState(savedMemberState)
        processTracks(savedMemberState.data.masteredArticlesID)
        resetTreeState()
        setTutorial(false)
    })
    d3.select('#cert-button-show')
      .on("click", (event)=>{
        d3.select('#certificate-wrapper')
          .style('display', 'block')
      })
    d3.select('#cert-close-button')
    .on("click", (event)=>{
      d3.select('#certificate-wrapper')
        .style('display', 'none')
    })
    d3.select('#cert-close-button-2')
    .on("click", (event)=>{
      d3.select('#certificate-wrapper')
        .style('display', 'none')
    })
  })

  // ===== ONBOARDING =====
  let [tutorial, setTutorial] = useState(false);
  const resetTreeState = () => {
    DesktopUI.clearUI()
    try{
        RadialTreeUI.deactivateActiveNode(
          treeState.activeNode.current, 
          treeState.member.data.completedArticlesID, 
          treeState.member.data.masteredArticlesID
        )
        treeState.activeNode.current.activeElement = null
        treeState.activeNode.current.activeTag = null
    } catch {
        return
    }
  }

  // ===== VIEW =====
  const mediaWarningView = () => {
    return <>
      {mediaWarning ? <MediaWarning/> : null}
    </>
  }
  const defaultView = () => {
    return <div className={treeStyle['tree-wrapper']}>
      <RadialTree treeState={treeState} tutorial={tutorial} selectedTrack={selectedTrack}/>
      {mobile ? <Mobile tracksDatabase={tracksDatabase} selectedTrack={selectedTrack}/> : <Desktop/>}
      <Search/>
      <div className={treeStyle["cert-button"]} id="cert-button-show"></div>
      {mobile ? null : <Track tracksDatabase={tracksDatabase} selectedTrack={selectedTrack}/>}
      {mobile ? null : <NavigationControls/>}
      {mediaWarningView()}
      {<Onboarding setMemberState={setMemberState} />}
      <CertificateModal treeState={treeState.customFields} track={selectedTrack}/>
    </div>
  }
  const popupView = () => {
    return <div className={treeStyle['tree-wrapper']}>
      <RadialTree treeState={treeState} tutorial={tutorial} selectedTrack={selectedTrack}/>
      <PopupCard treeState={treeState}/>
      {mediaWarningView()}
    </div>
  }
  const chooseView = (view) => {
    return view.type === "default" ? defaultView() : popupView()
  }

  return (
    treeState.root !== null && treeState.member !== null ?
      chooseView(treeState.view) : 
      <div className={treeStyle['lottie-wrapper']}>
        <Loading/>
      </div>
  );
}

export default Tree;