import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sampleData from "./sampleData.js"
import sampleMember from './sampleMember.js';
import { MemberstackProvider } from '@memberstack/react';

//Implement fillColor for active member (try DEPLOY)
//Implement development and production variables

const AppWrapper = () => {
  let [config, setConfig] = useState(null)

  // https://wethestudy-tree.netlify.app
  
  useEffect(()=>{
    const fetchMemberstackData = async () => {
      fetch('/.netlify/functions/server/api/memberstack', {
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