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
import axios from 'axios';
import { useMemberstack } from "@memberstack/react";

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

// Failsafe
  // Include a failsafe data in case problems in API occur

function App({data, member}) {
  // let [root, setActiveRoot] = useState(rootOptions(data, 2500))
  let [root, setActiveRoot] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  let lastKnownCamera = {k: 1, x: 0, y: 0}

  const memberstack = useMemberstack();
  const [trueMember, setTrueMember] = useState(
      {
        data: {
          completedArticlesID: []
      }
    }
  );

  const resetCamera = () => {
    lastKnownCamera = {k: 1, x: 0, y: 0}
  }

  let treeProps = {
    root: root,
    member: trueMember,
  }

  let nodeRef = useRef(
    {
      activeElement: null,
      activeTag: null
    }
  )
  
  const [trueData, setTrueData] = useState([])

  // let Airtable = require('airtable');
  // const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // let base = new Airtable({apiKey: apiKey}).base('app7qupBwSPEY7HaZ');

  // async function fetchAllRecords(table) {
  //   const allRecords = [];
  //   let offset = null;
  
  //   do {
  //     const options = {
  //       pageSize: 100,
  //       offset,
  //     };
  
  //     // Fetch records with pagination options
  //     const response = await table.select({}).all();
  
  //     // Append fetched records to the result array
  //     allRecords.push(...response);
  
  //     // Update the offset for the next page
  //     offset = response.offset;
  //   } while (offset);
  
  //   return allRecords;
  // }

  function filterData(data, filter){
    if (filter == null) return data;
    let filteredData = data.filter(obj => {
        return obj.category === filter;
      });
    let rootData = data.filter(obj => {
        return obj.parentId === ''
    });
    return [...filteredData, ...rootData]
  }

  function clearUI(){
    searchUIFunctions.hideSearchUI()
    nodeUIFunctions.hideSidebar()
    if(nodeRef.current.activeElement!=null) {
      nodeProperties.neutralState(nodeRef.current, trueMember)
    }
    nodeRef.current.activeElement = null
    nodeRef.current.activeTag = null
    evaluateLinks(nodeRef.current)
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('https://wethestudy-tree.netlify.app/.netlify/functions/server/api/airtable', {withCredentials: true});
        // setData(response.data);
        let records = await processData(response.data)
        setActiveRoot(treeProps.root = rootOptions(filterData(records), 2500))
        setTrueData(records)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()

    const processData = async (data) => {
      let records = []
      data.forEach(record => {
        let parentPlaceholder
        try{
          parentPlaceholder = record.fields["Course Map: Parent Post"][0]
        } catch {
          parentPlaceholder = ""
        }
          records.push({
            id: record.id,
            name: record.fields["Name"],
            courseMapName: record.fields["Course Map: Name"],
            parentId: parentPlaceholder,
            link: `https://wethestudy.webflow.io/learn/${record.fields["Slug"]}`,
            order: record.fields["Organization: Sibling Order"],
            category: record.fields["Organization: Category"],
            courseSummary: "",
            relatedLinks: []
          })
      });
      return records
    }

    // Usage example
    // async function main() {
    //   try {
    //     // Specify the table name you want to fetch records from
    //     const tableName = 'Learn: Articles';

    //     // Get the table reference
    //     const table = base(tableName);

    //     // Fetch all records from the table
    //     const allRecords = await fetchAllRecords(table);
    //     // setTrueData(allRecords)
    //     // Process the retrieved records
    //     let records = await processData(allRecords)
        
    //     // setTrueData(records)
    //     setActiveRoot(treeProps.root = rootOptions(filterData(records), 2500))
    //     setTrueData(records)
    //   } catch (error) {
    //     console.error('Error fetching records:', error);
    //   }
    // }
    
    // main()

    memberstack.getCurrentMember()
    .then(
      ({ data: member }) => {
        if (member != null) setTrueMember(member)
      })
    .catch((error) => {
      console.log(error)
    })

    const handleResize = () => {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
      clearUI()
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(()=>{
    d3.select("#related-links").on("click", (event) => evaluateLinks(nodeRef.current))
    d3.select('#categorymath')
      .on('click', ()=>{
        clearUI()
        resetCamera()
        setActiveRoot(rootOptions(filterData(trueData, "Mathematics"), 1500))
      })
    d3.select('#categoryphysics')
      .on('click', ()=>{
        console.log(true)
        clearUI()
        resetCamera()
        setActiveRoot(treeProps.root = rootOptions(filterData(trueData, "Physics"), 1000))
      })
    d3.select('#categoryengineering')
      .on('click', ()=>{
        console.log(true)
        clearUI()
        resetCamera()
        setActiveRoot(treeProps.root = rootOptions(filterData(trueData, "Engineering"), 2000))
      })
    d3.select('#categoryall')
      .on('click', ()=>{
        console.log(true)
        clearUI()
        resetCamera()
        setActiveRoot(treeProps.root = rootOptions(filterData(trueData), 2500))
      })
    d3.select('#clear-button')
      .on('click', clearUI)
  })

  if (!trueMember) {
    // console.log(trueMember)
    // return null
  };

  return (
    root != null ?
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
    </> : <>
        <p>The tree is loading...</p>
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