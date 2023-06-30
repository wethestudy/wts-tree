import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sampleData from "./sampleData.js"
import sampleMember from './sampleMember.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App data={sampleData} member={sampleMember}/>
  </React.StrictMode>
);

