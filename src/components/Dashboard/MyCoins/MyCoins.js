import React from 'react'
import classes from './MyCoins.module.css';
import cx from 'classnames'
import { postDeleteUsersCoinsRequest } from '../../../api/api'


const YourCoin = (props) => {

    function sellCoin() {
        const body = {
            ID: props.coinID
        }
        postDeleteUsersCoinsRequest(body)
    }

    return (
        <div className={classes.column}>
            <div className={classes.card}>
                <div style={{textAlign: 'center', marginBottom: '15px', marginTop: 0}}>
                    <h4 style={{margin: 0}}>{props.name}</h4>
                    <h5 style={{margin: 0, position: "relative", textAlign: "center"}}>({props.symbol})</h5>
                </div>
                <div className={classes.cardInfo}>
                    <h4>Buy Price: ${props.price}</h4>
                    <h4>Amount: {props.amount}</h4>
                    <h4 style={{marginBottom: 15, marginTop: '0'}}>Total: ${props.total}</h4>
                </div>
                <button className={cx(classes.btnB,classes.SellCoinBTN)} onClick={sellCoin}>SELL</button>
            </div>
        </div>
    )
}


export default YourCoin