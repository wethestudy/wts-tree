import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sampleData from "./sampleData.js"
import sampleMember from './sampleMember.js';
import { MemberstackProvider } from '@memberstack/react';
import axios from 'axios';

const AppWrapper = () => {
  let [config, setConfig] = useState(null)

  // let config = {
  //   publicKey: "pk_sb_b85f95a50767be6073e1",
  // }

  // const fetchData = async () => {
  //   const results = await axios.get('/.netlify/functions/server/api/memberstack')
  //   console.log(results)
  //   setConfig(data)
  // }


  useEffect(()=>{
    const fetchMemberstackData = async () => {
      fetch('https://wethestudy-tree.netlify.app/.netlify/functions/server/api/memberstack', {
        method: 'GET',
        credentials: 'include',
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setConfig(data)
      })
      .catch(error => {
        console.error('Error fetching Memberstack ID:', error);
      });
    }
    // fetchData()
    fetchMemberstackData()
  }, [])

  return(
    config != null ? <MemberstackProvider config={config}>
      <App data={sampleData} member={sampleMember}/>
    </MemberstackProvider> : <p>Getting member...</p>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWrapper/>
);

/* <script>
document.addEventListener("DOMContentLoaded", async function() {
	let formwrapper = document.querySelector('#mark-as-watched')
  const memberstack = window.$memberstackDom;

  memberstack.getCurrentMember().then(async ({ data: member }) => {
    if(member) {
      let memberJson = await memberstack.getMemberJSON();
      console.log(member)
      console.log(memberJson)
    }
  })
});
</script> */