import React from 'react';
import logo from './logo.svg';
import './App.css';
import {PriceWidget} from './PriceWidget';
import {ReactiveStreamApi} from './components';
import {Api} from './Api';

const App: React.FC = () => {
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
           <ReactiveStreamApi value ={Api}>
             <PriceWidget/>
          </ReactiveStreamApi> 
        </a>
      </header>
    </div>
  );
}

export default App;
