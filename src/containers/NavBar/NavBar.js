import React from 'react'
import classes from './NavBar.module.css'
import { Link } from 'react-router-dom'
import cryptocurrency from '../../assets/cryptocurrency.svg'


const Navbar = () => (
        <div className={classes.sidebar}>
        <img className={classes.icon} src={cryptocurrency} alt=''></img>
            <ul>
                <li><Link className={classes.sidebarLink} to="/user"><ion-icon name="person"></ion-icon></Link></li>
                <li><Link className={classes.sidebarLink} to="/dashboard"><ion-icon name="apps"></ion-icon></Link></li>
            </ul>
        </div>
)

export default Navbar;