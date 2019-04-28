import React, { Component } from 'react'
import classes from './User.module.css'
import { getUserRequest } from '../../api/api'

import editButton from '../../assets/pencil-edit-button.svg'

class User extends Component {
    constructor(props) {
        super(props)

        this.editUsername = this.editUsername.bind(this)
        this.editPassword = this.editPassword.bind(this)

        this.state = {
            username: '',
            usernameEdit: false,
            password: '***',
            passwordEdit: false
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
    }

    editUsername() {
        this.setState({
            usernameEdit: !this.state.usernameEdit
        })
    }

    editPassword() {
        this.setState({
            passwordEdit: !this.state.passwordEdit
        })
    }

    render() {
        var usernameStyle 
        var passwordStyle

        if (this.state.usernameEdit === false) {
            usernameStyle = null
        } else {
            usernameStyle = {
                border: '1px solid black',
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '0 5px'
            }
        }

        if (this.state.passwordEdit === false) {
            passwordStyle = null
        } else {
            passwordStyle = {
                border: '1px solid black',
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '0 5px'
            }
        }

        return (
            <div className={classes.UserContainer}>
                <div className={classes.User}>
                    <h1>User Info</h1>
                    <div className={classes.Username}>
                        <h2>Username:</h2>
                        <h3 contentEditable={this.state.usernameEdit} style={usernameStyle}>{this.state.username}</h3>
                        <button onClick={this.editUsername}><img src={editButton} alt=''></img></button>
                    </div>

                    <div className={classes.Password}>
                        <h2>Password:</h2>
                        <h3 contentEditable={this.state.passwordEdit} style={passwordStyle}>{this.state.password}</h3>
                        <button onClick={this.editPassword}><img src={editButton} alt=''></img></button>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default User