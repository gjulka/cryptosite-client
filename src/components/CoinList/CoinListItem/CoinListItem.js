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



    var logoStyle

    if(props.onehour.includes('-')) {
        percent1Style.color = 'red'
    }

    if(props.oneday.includes('-') ) {
        percent24Style.color = 'red'
    }

    if(props.sevendays.includes('-')) {
        percent7Style.color = 'red'
    }

    function importAll(r) {
        return r.keys().map(r);
    }

    var symbol = props.sym
    var lowerCaseSym = symbol.toLowerCase()
    const images = importAll(require.context('../../../assets/color', false, /\.(png|jpe?g|svg)$/));
    var imagesArray = [] 
    var x
    for (x in images) {
        var newimages = (images[x].split("/"));
        var newImages = (newimages[3].split("."));
        var imageSym = newImages[0]
        imagesArray.push(imageSym)
    }
    if(imagesArray.includes(lowerCaseSym)) {
        var index = imagesArray.indexOf(lowerCaseSym)
        logoStyle = {
            backgroundImage: 'url(' + images[index] + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '25px',
            width: '25px'
        }
    }

    return (
        <div>
            <li className={classes.tableRow}>
                <div className={classes.refreshButtonDiv} style={logoStyle}></div>
                <div className={classes.coinDiv} style={{width: '25%', textAlign: 'center', fontWeight: '900'}}>{props.coin}-({props.sym})</div>
                <div className={classes.mcapDiv}>${props.mcap}</div>
                <div className={classes.priceDiv}>${props.price}</div>
                <div style={percent1Style} className={classes.oneHourDiv}>{props.onehour}%</div>
                <div style={percent24Style} className={classes.oneDayDiv}>{props.oneday}%</div>
                <div style={percent7Style} className={classes.sevenDayDiv}>{props.sevendays}%</div>
            </li>
        </div>
    )
}

export default CoinListItem