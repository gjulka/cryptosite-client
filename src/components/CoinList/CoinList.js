import React, { Component } from 'react'

import classes from './CoinList.module.css';
import loader from '../../assets/loader.svg';
import { getCoinsRequest } from '../../api/api';

var cryptoInfo = [];

class CoinList extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            data: [],
            loading: false,
            loadingError: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        getCoinsRequest()
          .then(res => {
           setTimeout(() => {
            var cryptoData = res.data.data
            var x
            for (x in cryptoData) {
              cryptoInfo.push({
                  name: cryptoData[x].name,
                  symbol: cryptoData[x].symbol,
                  price: (Number(Math.round(cryptoData[x].quote.USD.price + 'e2') + 'e-2').toLocaleString('en')),
                  percentChange1Hr: Number(cryptoData[x].quote.USD.percent_change_1h).toFixed(2),
                  percentChange24Hr: Number(cryptoData[x].quote.USD.percent_change_24h).toFixed(2),
                  percentChange7Days: Number(cryptoData[x].quote.USD.percent_change_7d).toFixed(2),
                  circulatingSupply: cryptoData[x].circulating_supply,
                  marketCap: Number(Math.ceil(cryptoData[x].quote.USD.market_cap)).toLocaleString('en')
              })
            }
            this.setState({
              data: cryptoInfo,
              loading: false
            })
           }, 1000);
        }).catch(err => {
            this.setState({
                loadingError: true
            })
        })
    }

    topClick() {
        var row = document.querySelector('#coinsbody');
        row.scrollTop = 0;
    }
    
    render() {
        const loadingStyle = {
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%)'
        }

        const loadingError = {
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
        }

        if (this.state.loading === false) {
            loadingStyle.display = 'none'
        } else {
            loadingStyle.display = 'block'
        }

        if (this.state.loadingError === false) {
            loadingError.display = 'none'
        } else { 
            loadingError.display = 'block'
        }

        var row = document.querySelector('#coinsbody')
        
        this.state.data.forEach((coin) => {
            const coinRow = document.createElement('li')
            coinRow.className = `${classes.tableRow}`

            const buyCoin = document.createElement('div')
            buyCoin.style.width = '5%'
            coinRow.append(buyCoin)
            
            const coinName = document.createElement('div')
            coinName.textContent = `${coin.name} - (${coin.symbol})`
            coinName.style.width = '25%'
            coinRow.append(coinName)

            const coinMCap = document.createElement('div')
            coinMCap.textContent = `$${coin.marketCap}`
            coinMCap.style.width = '15%'
            coinRow.append(coinMCap)

            const coinPrice = document.createElement('div')
            coinPrice.textContent = `$${coin.price}`
            coinPrice.style.width = '13.5%'
            coinRow.append(coinPrice)

            const coinChange1 = document.createElement('div')
            coinChange1.textContent = `${coin.percentChange1Hr}%`
            coinChange1.style.width = '15%'
                if((coin.percentChange1Hr).includes('-')){
                    coinChange1.style.color = 'red'
                } else {
                    coinChange1.style.color = 'green'
                }
            coinRow.append(coinChange1)
                
            const coinChange24 = document.createElement('div')
            coinChange24.textContent = `${coin.percentChange24Hr}%`
            coinChange24.style.width = '11%'
                if((coin.percentChange24Hr).includes('-')){
                    coinChange24.style.color = 'red'
                } else {
                    coinChange24.style.color = 'green'
                }
            coinRow.append(coinChange24)

            const coinChange7 = document.createElement('div')
            coinChange7.textContent = `${coin.percentChange7Days}%`
            coinChange7.style.width = '15%'
                if((coin.percentChange7Days).includes('-')){
                    coinChange7.style.color = 'red'
                } else {
                    coinChange7.style.color = 'green'
                }
            coinRow.append(coinChange7)
            row.append(coinRow)
        })
            
        return (
            <div className={classes.CoinListContainer}>
                <h3 style={loadingError}>Network Error. Could not get data.</h3>
                <div style={loadingStyle}>
                    <img alt="" src={loader}/>
                </div>
                <ul className={classes.ResponsiveTable}>
                    <div className={classes.refresh}><button onClick={this.topClick}>Top</button></div>
                    <li className={classes.tableHeader}>
                        <div className={classes.col}></div>
                        <div className={classes.col1}>Coin</div>
                        <div className={classes.col2}>Market Cap</div>
                        <div className={classes.col3}>Price</div>
                        <div className={classes.col4}>1 Hr</div>
                        <div className={classes.col5}>24 Hr</div>
                        <div className={classes.col6}>7 Days</div>
                    </li>
                    <div className={classes.coinsbody} id="coinsbody"/>
                </ul>
            </div>
        )
    }
}

export default CoinList