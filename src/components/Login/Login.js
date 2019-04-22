import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Joi from 'joi'
import { loginUserRequest } from '../../api/api'

import classes from './Login.module.css'
import loader from '../../assets/loader.svg'

const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    password: Joi.string().min(8).required().trim()
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            errorMessage: null,
            loggingIn: false,
            loggedIn: false
        };
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            },
            errorMessage: null
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    login() {
        this.setState({
            errorMessage: null
        })
        if (this.validUser()) {
            const body = {
                username: this.state.user.username,
                password: this.state.user.password
            }

            this.setState({
                loggingIn: true
            })  

            loginUserRequest(body)
            .then(result => {
                localStorage.token = result.data.token;
                setTimeout(() => {
                    this.setState({
                        loggingIn:false,
                        loggedIn: true
                    })
                }, 1000);
            })
            .catch(err => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: 'Unable to login.',
                        loggingIn: false
                    })
                }, 1000);
            })
        }
    }

    validUser() {
        const result = Joi.validate(this.state.user, schema)
        if (result.error === null) {
            return true
        } 

        if(result.error.message.includes('username')) {
            this.setState({
                errorMessage: 'Username is invalid'
            })
        } else {
            this.setState({
                errorMessage: 'Password is invalid.'
            })
        }
    }

    render() {
        const loadingStyle = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

        const incorrectAlert = {
            width: '250px',
            backgroundColor: '#f26c54',
            position: 'relative',
            left: '50%',
            transform: 'translate(-50%)',
            borderRadius: '10px',
            padding: '10px',
            marginTop: '7px'
        }

        const loginDiv = {
            width: '400px',
            height: '400px',
            position: 'absolute',
            padding: '40px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#95A5A6',
            textAlign: 'center',
            borderRadius: '5px'
        }

        if(this.state.errorMessage === null) {
            incorrectAlert.display = 'none'
        } else {
            incorrectAlert.display = null
            loginDiv.height = '450px'
        }

        if (this.state.loggingIn === false) {
            loadingStyle.display = 'none'

        } else {
            loadingStyle.display = 'block'
            loginDiv.display = 'none'
        }

        if(this.state.loggedIn === true) {
            return <Redirect to={'/dashboard'} />
        }

        return (
            <div className={classes.LoginPage}>
                <div style={loadingStyle}>
                    <img alt="" src={loader}/>
                </div>
                <form style={loginDiv} onSubmit={this.handleSubmit}>  
                    <h1 className={classes.LoginTitle}>Login</h1>
                    <div style={incorrectAlert}>
                        {this.state.errorMessage}
                    </div>
                    <input className={classes.LoginInput} name="username" type="text" placeholder="Username" onChange={this.handleChange} />
                    <input className={classes.LoginInput} name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                    <button className={classes.LoginLink} onClick={this.login}>Login</button>
                    <Link className={classes.Signup} to="/signup">Sign Up</Link>
                    <Link className={classes.Signup} to="/guest">Login as Guest</Link>
                </form>
            </div>
        )
    }
}

export default Login