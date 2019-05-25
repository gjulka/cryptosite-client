import React, { Component } from 'react'

import CoinListItem from './CoinListItem/CoinListItem'
import classes from './CoinList.module.css';
import loader from '../../assets/loader.svg';
import { getCoinsRequest } from '../../api/api';

//(Number(Math.round(cryptoData[x].quote.USD.price + 'e2') + 'e-2').toLocaleString('en'))

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
                var b
                if(cryptoData[x].quote.USD.price < 1) {
                    b = 5
                } else {
                    b = 2
                }
              cryptoInfo.push({
                  name: cryptoData[x].name,
                  symbol: cryptoData[x].symbol,
                  price: (cryptoData[x].quote.USD.price).toFixed(b),
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
                    <div className={classes.coinsbody} id="coinsbody">
                        {cryptoInfo.map(coin => {
                            return <CoinListItem 
                                coin={coin.name}
                                sym={coin.symbol}
                                mcap={coin.marketCap}
                                price={coin.price}
                                onehour={coin.percentChange1Hr}
                                oneday={coin.percentChange24Hr}
                                sevendays={coin.percentChange7Days}
                            />
                        })}
                    </div>
                </ul>
            </div>
        )
    }
}

export default CoinList