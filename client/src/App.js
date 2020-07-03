import React from 'react';
import Products from './components/products';

import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Name of Store with Logo
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {props.myVar}
        </a>
      </header>
      <main>
        <Products />
      </main>
    </div>
  );
}

export default App;
