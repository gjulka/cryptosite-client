import React from 'react'
import classes from './CoinContainer.module.css'
import CoinList from '../../components/CoinList/CoinList'


const AllCoinList = () => (
    <div className={classes.CoinContainer}>
        <CoinList />
    </div>
)

export default AllCoinList