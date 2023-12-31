import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/Heebo/Heebo-VariableFont_wght.ttf';
import './index.css';
import { MemberstackProvider } from '@memberstack/react';
import ErrorBoundary from './components/alert/Error.js';
import Tree from './Tree.js';
// import treeCheck from './treeCheck.js';
// import database from './database/tree-json.js';
// import { performTreeCheck } from './devSettings.js';

const App = () => {
  // useEffect(()=>{
  //   if(performTreeCheck) {
  //     console.log("TREE CHECK PERFORMED")
  //     treeCheck(database)
  //   }
  // }, [])

  return(
    <ErrorBoundary>
      <MemberstackProvider config={{"publicKey":"pk_sb_b85f95a50767be6073e1"}}>
        <Tree/>
      </MemberstackProvider>
    </ErrorBoundary>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);