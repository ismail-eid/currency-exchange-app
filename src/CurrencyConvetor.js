import React from 'react'
import Chart from 'chart.js'
import {checkStatus, json} from './utils'
import './CurrencyConvertor.css'

class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies : null,
      from: 'EUR',
      to: 'USD',
      from_amount: '',
      to_amount: ''
    }

    this.chartRef = React.createRef();

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.hanleFromInputChange = this.hanleFromInputChange.bind(this);
    this.handleToInputChange = this.handleToInputChange.bind(this);
  }

  componentDidMount () {
    fetch('https://alt-exchange-rate.herokuapp.com/latest?base=USD').then(checkStatus).then(json).then(data => {
      this.setState({currencies: data.rates})
    }).catch(error => {
      console.log(error);
    })

    this.getHistoricalRates(this.state.from, this.state.to)
  }
   // update from and to currencies have chosen.
  handleCurrencyChange (event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
    
    if (name === 'from') {
      this.getHistoricalRates(value, this.state.to)
    } else if (name === 'to') {
      this.getHistoricalRates(this.state.from, value)
    }
  }

  // from input change handler
  hanleFromInputChange (event) {
    
    const value = event.target.value;
    this.setState({from_amount: value})

    const {from, to} = this.state;
    const fromCurrency = this.state.currencies[from];
    const toCurrency = this.state.currencies[to];
    const rate = toCurrency / fromCurrency;

    const result = value * rate;
    this.setState({to_amount: result.toFixed(3)})
  }

  // to input change handler
  handleToInputChange (event) {
    const value = event.target.value;
    this.setState({to_amount: value})
     
    const {from, to} = this.state;
    const fromCurrency = this.state.currencies[from];
    const toCurrency = this.state.currencies[to];
    const rate = fromCurrency / toCurrency;

    const result = value * rate;
    this.setState({from_amount: result.toFixed(3)})
  }

  getHistoricalRates (from, to) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${from}&symboles=${to}`).then(checkStatus).then(json).then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      const chartLabels = Object.keys(data.rates);
      const chartData = Object.values(data.rates).map(rate => rate[to]);
      const chartLabel = `${from}/${to}`;

      this.buildChart(chartLabels, chartData, chartLabel);
    })
  }

  buildChart (labels, data, label) {
    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true
      }
    })
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
      <React.Fragment>
      <div className="row pb-5 justify-content-center align-item-center">
        <div className="col-12 col-md-6 py-5 mt-5 currency-box">
          <div className="text-center">
            <span className="mx-3">From </span>
              <select className="form-control currency-input" value={from} name='from' onChange={this.handleCurrencyChange}>
              {currencyNames.map(name => {
                return <option key={name} value={name}>{name}</option>
              })}
              </select>
              <span className="mx-3">To </span>
              <select className="form-control currency-input" value={to} name='to' onChange={this.handleCurrencyChange}>
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
      <div className="row justify-content-center pb-5">
        <div className="col-9">
        <canvas ref={this.chartRef} />
        </div>
      </div>
      </React.Fragment>
    )
  }

}

export default CurrencyConvertor;