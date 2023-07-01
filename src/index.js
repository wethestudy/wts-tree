import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sampleData from "./sampleData.js"
import sampleMember from './sampleMember.js';
import { MemberstackProvider } from '@memberstack/react';

const config = {
  publicKey: "pk_sb_b85f95a50767be6073e1",
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MemberstackProvider config={config}>
    <App data={sampleData} member={sampleMember}/>
  </MemberstackProvider>
);

