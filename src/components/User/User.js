import React, { Component } from 'react'
import classes from './User.module.css'
import { getUserRequest } from '../../api/api'

class User extends Component {
    state= {
        username: ''
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
    }

    render() {
        return (
            <div className={classes.UserContainer}>
                <div className={classes.User}>
                    <h1>User Info</h1>
                    <h2>Username: {this.state.username}</h2>
                </div>
            </div>
            
        )
    }
}


export default User