import React from 'react'
import {checkStatus, json} from './utils'
import './CurrencyConvertor.css'

let timerFromInput;
let timerToInput;
class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies : null,
      from: 'AUD',
      to: 'AUD',
      from_amount: '',
      to_amount: ''
    }

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.hanleFromInputChange = this.hanleFromInputChange.bind(this);
    this.handleToInputChange = this.handleToInputChange.bind(this);
  }

  componentDidMount () {
    fetch('https://alt-exchange-rate.herokuapp.com/latest?base=BGN').then(checkStatus).then(json).then(data => {
      this.setState({currencies: data.rates,})
    }).catch(error => {
      console.log(error);
    })
  }
   //update from and to currencies have chosen.
  handleCurrencyChange (event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  // from input change handler
  hanleFromInputChange (event) {
    clearInterval(timerFromInput);
    const value = event.target.value;
    this.setState({from_amount: value})

    timerFromInput = setTimeout(() => {
      const {from, to} = this.state;

      fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${from}&symbols=${to}`).then(checkStatus).then(json).then(data => {
        const result = data.rates[to] * value;
        this.setState({to_amount: result.toFixed(3)})
      }).catch(error => {
        console.log(error);
      })
    }, 1000)
  }

  // to input change handler
  handleToInputChange (event) {
    clearInterval(timerToInput);
    const value = event.target.value;
    this.setState({to_amount: value})

    timerToInput = setTimeout(() => {
      const {from, to} = this.state;

      fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${to}&symbols=${from}`).then(checkStatus).then(json).then(data => {
        const result = value/ data.rates[from];
        this.setState({from_amount: result.toFixed(3)})
      }).catch(error => {
        console.log(error);
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(timerFromInput);
    clearInterval(timerToInput);
  }

  render () {
    const {currencies, from, to, from_amount, to_amount} = this.state;
    const currencyNames = [];
    if (currencies) {
      for (var names in currencies) {
        currencyNames.push(names);
      }
    }

    return (
      <div className="row pb-5 justify-content-center align-item-center">
        <div className="col-12 col-md-6 py-5 mt-5 currency-box">
          <div className="text-center">
            <span className="mx-3">From </span>
              <select className="form-control currency-input" name='from' onChange={this.handleCurrencyChange}>
              {currencyNames.map(name => {
                return <option key={name} value={name}>{name}</option>
              })}
              </select>
              <span className="mx-3">To </span>
              <select className="form-control currency-input"name='to' onChange={this.handleCurrencyChange}>
              {currencyNames.map(name => {
                return <option key={name} value={name}>{name}</option>
              })}
              </select>
          </div>
          <div className="text-center mt-2">
            <span className="mr-2">{from}</span>
            <input className="form-control currency-input input-amount" value={from_amount} onChange={this.hanleFromInputChange} /> <span>=</span>
            <input className="form-control currency-input input-amount" name="to_amount" value={to_amount} onChange={this.handleToInputChange} /> <span className="mr-2">{to}</span>
          </div>
        </div>
      </div>
    )
  }

}

export default CurrencyConvertor;