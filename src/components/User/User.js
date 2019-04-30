import React, { Component } from 'react'
import classes from './User.module.css'
import { getUserRequest, updateUserRequest } from '../../api/api'

import editButton from '../../assets/pencil-edit-button.svg'

class User extends Component {
    constructor(props) {
        super(props)

        this.editUsername = this.editUsername.bind(this)
        this.editPassword = this.editPassword.bind(this)
        this.onSaveUsername = this.onSaveUsername.bind(this)
        this.onSavePassword = this.onSavePassword.bind(this)

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

        const body = {id: this.state.id}

        updateUserRequest(body)
        .then(result => {
            console.log(result);
        })
    }

    onSaveUsername() {
        console.log('saved username');
        this.setState({
            usernameEdit: !this.state.usernameEdit
        })

        const body = {username: document.querySelector('#username').innerText}

        updateUserRequest(body)
            .then(result => {
                console.log(result);
            })

    }

    editPassword() {
        this.setState({
            passwordEdit: !this.state.passwordEdit
        })
    }

    onSavePassword() {
        console.log('saved password');
        this.setState({
            passwordEdit: !this.state.passwordEdit
        })
    }

    render() {
        var usernameStyle 
        var passwordStyle
        var hideEditUsername
        var hideEditPassword
        var saveUsername
        var savePassword



        if (this.state.usernameEdit === false) {
            usernameStyle = null
            saveUsername = {display: 'none'}
        } else {
            usernameStyle = {
                border: '1px solid black',
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '0 5px'
            }

            hideEditUsername = {
                display: 'none'
            }
        }

        if (this.state.passwordEdit === false) {
            passwordStyle = null
            savePassword = {display: 'none'}
        } else {
            passwordStyle = {
                border: '1px solid black',
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '0 5px'
            }
            hideEditPassword = {
                display: 'none'
            }
        }

        return (
            <div className={classes.UserContainer}>
                <div className={classes.User}>
                    <h1>User Info</h1>
                    <div className={classes.Username}>
                        <h2>Username:</h2>
                        <h3 id='username' contentEditable={this.state.usernameEdit} style={usernameStyle}>{this.state.username}</h3>
                        <button style={hideEditUsername} onClick={this.editUsername}><img src={editButton} alt=''></img></button>
                        <button style={saveUsername} onClick={this.onSaveUsername}>Save</button>

                    </div>

                    <div className={classes.Password}>
                        <h2>Password:</h2>
                        <h3 id='password' contentEditable={this.state.passwordEdit} style={passwordStyle}>{this.state.password}</h3>
                        <button style={hideEditPassword} onClick={this.editPassword}><img src={editButton} alt=''></img></button>
                        <button style={savePassword} onClick={this.onSavePassword}>Save</button>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default User