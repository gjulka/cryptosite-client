import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import User from '../../components/User/User'
import Dashboard from '../../components/Dashboard/Dashboard'
import classes from './UserContainer.module.css';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.token ? <Component {...props} /> : <Redirect to={{pathname: '/'}} />
    )} />
)

const UserContainer = () => (
    <div className={classes.UserContainer}>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/user" exact component={User}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
        <Route path="/signup" exact component={Signup} />
    </div>
)

export default UserContainer