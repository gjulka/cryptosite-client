import React, {Component} from 'react'
import Select from 'react-select'
import { getUserRequest, getCoinsRequest, getUsersCoinsRequest, postUsersCoinsRequest } from '../../api/api';
import YourCoins from './MyCoins/MyCoins'

import cx from 'classnames'
import classes from './Dashboard.module.css';

const cryptoInfo = []

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSelectedChange = this.handleSelectedChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.buyCoin = this.buyCoin.bind(this)

        this.state = {
            username: '',
            newCoin: {
                selectedOption: null,
                name: '',
                price: '',
                amount: '',
                symbol: '',
                percent24: ''
            },
            amountError: false,
            yourCoins: [],
            totals: [],
            percent: ''
        }
    }

    componentDidMount() {
        getUserRequest()
            .then(user => {
                if (user.data.user) {
                    this.setState({
                        username: user.data.user.username
                    })
                } else {
                    localStorage.removeItem('token')
                }
            })

        getCoinsRequest()
            .then(coins => {
                var cryptoData = coins.data.data
                var x
                for (x in cryptoData) {
                    cryptoInfo.push({
                        value: cryptoData[x].name,
                        label: cryptoData[x].name,
                        symbol: cryptoData[x].symbol,
                        price: (Number(Math.round(cryptoData[x].quote.USD.price + 'e2') + 'e-2').toLocaleString('en')),
                        percentChange24Hr: Number(cryptoData[x].quote.USD.percent_change_24h).toFixed(2)
                })}
            })
    }

    componentDidUpdate(prevState) {
        if(this.state.yourCoins !== prevState.yourCoins) {
            getUsersCoinsRequest()
            .then(res => {
                this.setState({
                    yourCoins: res.data.coins,
                    totals: res.data.allTotal,
                    percent: res.data.percents
                })
            })
        }
    }

    logOut() {
        localStorage.removeItem('token');
        window.location.reload()
    }

    handleSelectedChange(selectedOption) {
        this.setState({
            ...this.state.newCoin,
            newCoin: {
                name: selectedOption.value,
                price: selectedOption.price,
                amount: '',
                symbol: selectedOption.symbol,
                percent24: selectedOption.percentChange24Hr
            }
        });
    }

    handleInputChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
      
        this.setState({
            newCoin: {
                ...this.state.newCoin,
                [name]: value
            },
            amountError: false
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }
    
    buyCoin() {
        const body = {
            name: this.state.newCoin.name,
            price: this.state.newCoin.price,
            amount: this.state.newCoin.amount,
            symbol: this.state.newCoin.symbol,
            percent: this.state.newCoin.percent24
        }

        postUsersCoinsRequest(body)
        .then(coin => {
            this.setState({
                newCoin: {
                    selectedOption: null,
                    price: '',
                    amount: ''
                }
            })
        })
        .catch(error => {
            this.setState({
                amountError: true
            })
        })

    }

    render(){
        const customStyles = {
                menu: (base) => ({
                    ...base,
                    zIndex: 10,
                    height: 120
                }),
                menuList: (base) => ({
                    ...base,
                    zIndex: 10,
                    height: 120
                })
        }

        const amountError = {
            position: 'absolute',
            margin: 0,
            textAlign: 'center',
            width: '250px',
            backgroundColor: '#f26c54',
            borderRadius: '10px',
            left: '50%',
            transform: 'translate(-50%)'
        }

        const percentTotal = {
            color: 'green'
        }

       
        if (this.state.percent.includes('-')) {
            percentTotal.color = 'red'
        }

        if (this.state.amountError === true) {
            amountError.display = 'block'
        } else {
            amountError.display = 'none'
        }
    
        return(
            <div className={classes.DashContainer}>
                <div className={classes.Dash}>
                    <div className={classes.Stats}>
                        <h1>Welcome, {this.state.username}</h1>
                        <button className={classes.Logout} onClick={this.logOut}>Logout</button>
                        <h2>Total: ${this.state.totals}</h2>
                        <h2>Percent Change (24 Hr): <span style={percentTotal}>{this.state.percent}%</span></h2>
                    </div>
                    <div className={classes.BuyCoin}>
                        <div style={amountError}>
                            <h6 style={amountError}>Amount Error. Try Again.</h6>
                        </div>
                        <h2>BUY</h2>
                        <form onSubmit={this.onSubmit} className={classes.Form}>
                            <Select
                                styles={customStyles}
                                value={this.state.newCoin.selectedOption}
                                options={cryptoInfo}
                                placeholder = "Start typing..."
                                onChange={this.handleSelectedChange}
                            />
                            <input name="price" type="text" placeholder="Price" value={this.state.newCoin.price} onChange={this.handleInputChange}/>
                            <input name="amount" type="text" placeholder="Amount"  value={this.state.newCoin.amount} onChange={this.handleInputChange}/>
                            <button onClick={this.buyCoin} className={cx(classes.btnA,classes.AddCoinBTN)}>BUY</button>
                        </form>
                    </div>
                </div>
                <div id="mycoins" className={classes.CoinsContainer}>

                    {this.state.yourCoins.map(coins => {
                       return <YourCoins
                        key={coins._id}
                        coinID={coins._id} 
                        name={coins.name} 
                        price={coins.price}
                        amount={coins.amount}
                        total={coins.total}
                        symbol={coins.symbol}
                        />
                    })}
                    
                </div>
            </div>
        )
    }
}




export default Dashboard