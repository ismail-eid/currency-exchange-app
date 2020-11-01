import React from 'react';
import './ExchangeRates.css';
import {checkStatus, json} from './utils'

class ExchangeRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      currencies: null
    }

    this.handleChange = this.handleChange.bind(this);
  }

  fetchApi (base) {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`).then(checkStatus).then(json).then(data => {
      this.setState({currencies: data.rates})
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount () {
    const {base} = this.state;
    this.fetchApi(base);
  }

  handleChange (event) {
    this.setState({base: event.target.value})
    const base = event.target.value;
    this.fetchApi(base);
  }

  render () {
    const {base, currencies} = this.state;
    const currencyNames = [];
    const currencyTable = [];

    if (currencies) {
      for (var names in currencies) {
        currencyNames.push(names);
      currencyTable.push(<div className="col-6 col-md-3 my-2" key={names}>{names}: {currencies[names]}</div>)
      }
    }

    return (
      <div className="row pb-5 justify-content-center align-item-center">
        <div className="col-1">
        <select className="form-control" onChange={this.handleChange}>
          {currencyNames.map(currency => {
            return <option key={currency} value={currency}>{currency}</option>
          })}
          <option value={base}>{base}</option>
        </select>
        </div>
        <div className="row table-currencies">
          {currencyTable.map(column => {
            return column;
          })}
        </div>
      </div>
    )
  }
}

export default ExchangeRates;