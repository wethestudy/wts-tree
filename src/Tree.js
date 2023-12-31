import React from 'react';
import * as d3 from "d3";
import { useEffect, useRef, useState } from 'react';
import { useMemberstack } from "@memberstack/react";
import RadialTree from './components/RadialTree.js';
import Desktop from './components/Desktop.js'
import Mobile from "./components/Mobile.js";
import NavigationControls from './components/NavigationControls';
import Loading from './components/alert/Loading.js';
import database from "./database/tree-json.js"
import { SidebarUI } from "./components/ui/SidebarUI.js";
import { stateUtilities } from "./components/utilities/stateUtilities.js";
import { treeUtilities } from "./components/utilities/treeUtilities.js";
import { TreeUI } from "./components/ui/TreeUI.js";
import { RadialTreeUI } from "./components/ui/RadialTreeUI.js";
import { Search } from "./components/Search.js";
import { searchUtilities } from "./components/utilities/searchUtilities.js";
import { MediaWarning } from "./components/alert/MediaWarning.js";
import { showLoadingScreen, useTestMember, testEmail, testPassword } from "./devSettings.js";
import { cameraUtilities } from './components/utilities/cameraUtilities.js';

function Tree() {
  let records = treeUtilities.processJSON(database)
  let [root, setRoot] = useState(null)
  let [member, setMember] = useState(null);
  const memberstack = useMemberstack();
  let memberJson =  {data: {
    completedArticlesID: []
  }}
  let activeNode = useRef(
    {
      activeElement: null,
      activeTag: null
    }
  )
  let [connections, setConnections] = useState([])
  let treeState = {
    root: root,
    member: member,
    activeNode: activeNode,
    cameraPosition: {k: cameraUtilities.zoomProperties.defaultZoomScale, x: 0, y: 0},
    connections: connections,
  }

  let [windowSize, setWindowSize] = useState({ 
    width: window.innerWidth,
    height: window.innerHeight,
  })
  console.log(windowSize)
  let [isMobile, setIsMobile] = useState(false);
  let [isIncomprehensible, setIsIncomprehensible] = useState(false);
  const handleWindowSizeChange = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    if (window.innerWidth < 840 && window.innerHeight < 1200) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    if (window.innerWidth < 360 || window.innerHeight < 550){
      setIsIncomprehensible(true);
    } else {
      setIsIncomprehensible(false);
    }
  };

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
  const handleResize = () => {
    debounce(
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      }), 1000)
    SidebarUI.clearUI()
  }
  const setRootState = () => {
    let category
    try {
      category = d3.select("#drop-field").node().value;
    } catch (error) {
      category = "All"
    }
    let treeRadius = treeUtilities.getTreeRadius(category)
    let filterRecords = treeUtilities.filterRecords(records, category)
    treeState.root = treeUtilities.processRoot(filterRecords, treeRadius)
    setRoot(treeState.root)
  }
  const setMemberState = (memberJson) => {
    showLoadingScreen ? treeState.member = null : treeState.member = memberJson
    setMember(treeState.member)
  }
  const setTestMember = async () => {
    try {
      await memberstack.loginMemberEmailPassword({
        email: testEmail,
        password: testPassword
      })
      .then(async ({ data: member }) => {
          if (member !== null) {
            memberJson = await memberstack.getMemberJSON();
            setMemberState(memberJson)
          } else {
            return
          }
        })
      .catch((error) => {
        return
      })
    } catch (error) {
      return
    }
  }
  const setConnectionState = () => {
    treeState.connections = stateUtilities.constructConnections(treeState.root.descendants())
    setConnections(treeState.connections)
  }
  const setTreeState =() => {
    setRootState()
    treeState.activeNode.current = stateUtilities.resetActiveNode(treeState.activeNode.current)
    treeState.camera = stateUtilities.resetCamera(treeState.cameraPosition)
    setConnectionState()
  }
  const changeTree = ()=>{
    setTreeState()
    TreeUI.onChangeTree(treeState.activeNode.current)
  }

  // For UI
  useEffect(()=>{
    d3.select("#clear-button")
      .on('click', ()=>{TreeUI.onClearTreeAndSidebar(treeState.activeNode.current, treeState.member.data.completedArticlesID)})
    d3.select("#drop-field")
      .on('change', changeTree)
    d3.select('#connections')
      .on('change', ()=>{RadialTreeUI.displayConnections(treeState.activeNode.current)})
    d3.selectAll('input[name="color"]')
      .on('change', ()=>{RadialTreeUI.colorNodes(treeState.root.descendants(), treeState.member.data.completedArticlesID, treeState.activeNode.current)});
    d3.select('#search-input')
      .on('input', ()=>{searchUtilities.handleSearch(treeState.root.descendants(), treeState.member.data.completedArticlesID, treeState.activeNode.current, treeState.cameraPosition)})
      .on('click', ()=>{searchUtilities.handleSearch(treeState.root.descendants(), treeState.member.data.completedArticlesID, treeState.activeNode.current, treeState.cameraPosition)})
  })

  // Production - listen to dispatch by Webflow
  useEffect(() => {
    const handleEventFromWebflow = async (event) => {
      if (event.detail) {
        console.log('Received event from Webflow:', event.detail);
        memberJson = await event.detail;
        setMemberState(memberJson)
      }
    };

    document.addEventListener('memberData', handleEventFromWebflow);
    return () => {
      document.removeEventListener('memberData', handleEventFromWebflow);
    };
  }, []);

  // State
  useEffect(()=>{
    if(useTestMember) setTestMember()
    setTreeState()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Window
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);
  useEffect(()=>{
    handleWindowSizeChange()
  })

  return (
    treeState.root !== null && treeState.member !== null ?
      <div className="tree-wrapper">
        <RadialTree treeState={treeState}/>
        {isMobile ? <Mobile/> : <Desktop/>}
        <Search/>
        {isMobile ? null : <NavigationControls/>}
        {isIncomprehensible ? <MediaWarning/> : null}
      </div> : 
      <div className="lottie-wrapper">
        <Loading/>
      </div>
  );
}

export default Tree;