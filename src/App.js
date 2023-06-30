import './App.css';
import * as d3 from "d3";
import RadialTree from './components/RadialTree.js';
import NavigationControls from './components/NavigationControls';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import {searchUIFunctions} from "./components/treeSearch.js";
import { useEffect, useRef, useState } from 'react';
import { nodeUIFunctions } from './components/UIFunctions';
import { nodeProperties } from './components/properties';
import evaluateLinks from './components/evaluateLinks.js';

// Refactor
//  Sidebar fix
//  What if member is null
//  UI elements adjust when resizing (responsive design)

// Active and neutral marker

// Integrate to Webflow

// Future Implementation
// Views
//  3D (Solar System)
//  Related Link Graph View

// Map Viewpoint
//  Adjust Tree Radius depending on size

// Map Options
//  Add tooltip to buttons
//  Hide Labels
//  Color Categorization of Topics (on/off)
//  More Definite Color Categorization 
//  Hide Uncompleted Nodes
//  https://observablehq.com/@d3/delaunay-find-zoom

function App({data, member}) {

  let [root, setActiveRoot] = useState(rootOptions(data, 2500))
  const [windowDimensions, setWindowDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  let lastKnownCamera = {k: 1, x: 0, y: 0}

  const resetCamera = () => {
    lastKnownCamera = {k: 1, x: 0, y: 0}
  }

  // let rawMemberData = {
  //   "data": {
  //     "completedID": []
  //   }
  // }

  let treeProps = {
    root: root,
    member: member,
  }

  let nodeRef = useRef(
    {
      activeElement: null,
      activeTag: null
    }
  )

  useEffect(()=>{
    function filterData(data, filter){
      if (filter == null) return data;
      let filteredData = data.filter(obj => {
          return obj.category === filter;
        });
      let rootData = data.filter(obj => {
          return obj.id === 'root'
      });
      return [...filteredData, ...rootData]
    }
    d3.select("#related-links").on("click", (event) => evaluateLinks(nodeRef.current))
    d3.select('#categorymath')
      .on('click', ()=>{
        clearUI()
        resetCamera()
        setActiveRoot(rootOptions(filterData(data, "Mathematics"), 1500))
      })
    d3.select('#categoryphysics')
      .on('click', ()=>{
        clearUI()
        resetCamera()
        setActiveRoot(treeProps.root = rootOptions(filterData(data, "Physics"), 1000))
      })
    d3.select('#categoryengineering')
      .on('click', ()=>{
        clearUI()
        resetCamera()
        setActiveRoot(treeProps.root = rootOptions(filterData(data, "Engineering"), 2000))
      })
    d3.select('#categoryall')
      .on('click', ()=>{
        clearUI()
        resetCamera()
        setActiveRoot(treeProps.root = rootOptions(filterData(data), 2500))
      })
    d3.select('#clear-button')
      .on('click', clearUI)
    function clearUI(){
      searchUIFunctions.hideSearchUI()
      nodeUIFunctions.hideSidebar()
      if(nodeRef.current.activeElement!=null) {
        nodeProperties.neutralState(nodeRef.current, member)
      }
      nodeRef.current.activeElement = null
      nodeRef.current.activeTag = null
      evaluateLinks(nodeRef.current)
    }
    const handleResize = () => {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
      clearUI()
    }
    window.addEventListener('resize', handleResize)
  })

  return (
    <>
      <RadialTree 
        treeProps={treeProps} 
        camera={{
          lastKnownCamera: lastKnownCamera, 
          windowDimensions: windowDimensions
        }}
        activeNode={nodeRef.current}
      />
      <NavigationControls/>
      <div id="sidebar">
        <div id="course-title"></div>
        <div id="course-order"></div>
        <div id="course-link"></div>
      </div>
      <div id="top-left-corner">
        <SearchBar/>
        <button id="clear-button" className="tree-button">X</button>
      </div>
      <div id="top-right-corner">
        <FilterBar/>
        <input type="checkbox" id="related-links" className="tree-button"/>
      </div>
    </>
  );
}

function rootOptions(data, radius) {
  const root = d3.stratify().id(d => d.id).parentId(d => d.parentId)(data);
  const tree = d3.tree;
  const separation = (a, b) => (a.parent === b.parent ? 1 : 2) / a.depth;
  tree().size([2 * Math.PI, radius]).separation(separation)(root);
  return root
}

export default App;