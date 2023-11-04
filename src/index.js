import ReactDOM from 'react-dom/client';
import './assets/fonts/Heebo/Heebo-VariableFont_wght.ttf';
import './index.css';
import { MemberstackProvider } from '@memberstack/react';
import ErrorBoundary from './components/alert/Error.js';
import Tree from './Tree.js';

const App = () => {
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