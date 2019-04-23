import React from  'react'
import classes from './CoinListItem.module.css'

const CoinListItem = (props) => {

    const percent1Style = {
        width: '15%', 
        textAlign: 'center',
        color: 'green'
    }

    const percent24Style = {
        width: '11%', 
        textAlign: 'center',
        color: 'green'
    }

    const percent7Style = {
        width: '15%', 
        textAlign: 'center',
        color: 'green'
    }

    if(props.onehour.includes('-')) {
        percent1Style.color = 'red'
    }

    if(props.oneday.includes('-') ) {
        percent24Style.color = 'red'
    }

    if(props.sevendays.includes('-')) {
        percent7Style.color = 'red'
    }

    return (
        <div>
            <li className={classes.tableRow}>
                <div style={{width: '5%', textAlign: 'center'}}></div>
                <div style={{width: '25%', textAlign: 'center', fontWeight: '900'}}>{props.coin}-({props.sym})</div>
                <div style={{width: '15%', textAlign: 'center'}}>${props.mcap}</div>
                <div className={classes.priceDiv}>${props.price}</div>
                <div style={percent1Style} className={classes.oneHourDiv}>{props.onehour}%</div>
                <div style={percent24Style} className={classes.oneDayDiv}>{props.oneday}%</div>
                <div style={percent7Style} className={classes.sevenDayDiv}>{props.sevendays}%</div>
            </li>
        </div>
    )
}

export default CoinListItem