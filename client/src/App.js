import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Products from './components/products';


import './App.css';

function App(props) {
  return (
    
    <Router>
      <Route path="/products" component={Products} /> 
      <a href="/products">Go to Products</a>
      <Link to="/products">--Go to Products</Link>
    </Router>
    
    
    /*
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
    */

  );
}

export default App;
