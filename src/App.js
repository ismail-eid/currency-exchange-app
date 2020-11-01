import React from 'react';
import Home from './Home';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// currency convetor page and Exchange rate page.
import CurrencyConvertor from './CurrencyConvetor';
import ExchangeRates from './ExchangeRates';

const NotFound = () => {
  return (
    <div className="row justify-content-center mt-5">
      <h2>404 Not Found<br/> We can't find<br/> what you are <br/>looking for!</h2>
    </div>
  )
}

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">Currency Exchange App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/currency-convertor/">Currency Convertor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exchange-rates/">Exchange Rates</Link>
            </li>
          </ul>
        </div>
     </nav>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="container">
      <div className="row justify-content-center pt-3 pb-2">
        <small>copyright @<a href="https://pedantic-northcutt-e28fa1.netlify.app/" target="_blank">Ismail Eid</a></small>
      </div>
    </footer>
  )
}

function App() {
  return (
    <Router>
      <div className="container-fluid bg-light">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/currency-convertor/" component={CurrencyConvertor} />
          <Route path="/exchange-rates/" component={ExchangeRates} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
