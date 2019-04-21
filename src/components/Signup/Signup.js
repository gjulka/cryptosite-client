import React, { Component } from 'react'
import Joi from 'joi'
import { Popover } from 'reactstrap'
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom'

import loader from '../../assets/loader.svg'
import classes from './Signup.module.css'

const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    password: Joi.string().min(8).required().trim(),
    confirmedPassword: Joi.string().min(8).required().trim()
});

// const apiUrl = 'https://cryptoserverx.herokuapp.com/auth/signup'
const apiUrl = 'http://localhost:5000/auth/signup'


class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.userToggle = this.userToggle.bind(this);
        this.passToggle = this.passToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validUser = this.validUser.bind(this);
        this.signUp = this.signUp.bind(this);

        this.state = {
            userpopoverOpen: false,
            passpopperOpen: false,
            user: {
                username: '',
                password: '',
                confirmedPassword: ''
            },
            errorMessage: null,
            signingUp: false,
            signedUp: false
        };
    }

    userToggle() {
        this.setState({
            userpopoverOpen: !this.state.userpopoverOpen
        });
    }

    passToggle() {
        this.setState({
            passpopperOpen: !this.state.passpopperOpen
        });
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

    signUp() {
        this.setState({
            errorMessage: null
        })
        const body = {
            username: this.state.user.username,
            password: this.state.user.password
        }

        if (this.validUser()) {
            this.setState({
                signingUp: true
            })  
            Axios(apiUrl, {
                method: 'post',
                data: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {
                localStorage.token = res.data.token
                setTimeout(() => {
                    this.setState({
                        signingUp:false
                    })
                }, 1000);
            }).catch(err => {
                setTimeout(() => {
                    this.setState({
                        errorMessage: 'Username already exists.',
                        signingUp: false
                    })
                }, 1000);
            })
        }
    }

    validUser() {
        if (this.state.user.password !== this.state.user.confirmedPassword) {
            this.setState({
                errorMessage: 'Passwords do not match.'
            })
            return false;
        }
        const result = Joi.validate(this.state.user, schema)
        if (result.error === null) {
            //valid
            return true
        } 

        if(result.error.message.includes('username')) {
            this.setState({
                errorMessage: 'Username is invalid'
            })
        } else {
            this.setState({
                errorMessage: 'Password is invalid'
            })
        }
    }

    render() {
        const signUpForm = {
            width: '400px',
            height: '500px',
            position: 'absolute',
            padding: '40px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#95A5A6',
            textAlign: 'center',
            borderRadius: '5px'
        }

        const passwordAlert = {
            width: '250px',
            backgroundColor: '#f26c54',
            position: 'relative',
            left: '50%',
            transform: 'translate(-50%)',
            borderRadius: '10px',
            padding: '10px',
            marginTop: '7px'
        }

        const loadingStyle = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

        if(this.state.errorMessage === null) {
            passwordAlert.display = 'none'
        } else {
            passwordAlert.display = null
            signUpForm.height = '550px'
        }

        if (this.state.signingUp === true) {
            loadingStyle.display = 'block'
            signUpForm.display = 'none'
        } else {
            loadingStyle.display = 'none'
            signUpForm.display = 'block'
        }

        if (localStorage.token) {
            return <Redirect to={'/dashboard'}/>
        }

        return(
            <div className={classes.SignupPage}>
                <div style={loadingStyle}>
                    <img alt="" src={loader}/>
                </div>
                <form id='signupform' style={signUpForm} onSubmit={this.handleSubmit}>  
                    <h1 className={classes.SignUph1}>Signup</h1>
                    <div style={passwordAlert}>
                        {this.state.errorMessage}
                    </div>
                    <input className={classes.SignUpinput} name="username" id="username" type="text" placeholder="Create a username" value={this.state.user.username} onChange={this.handleChange}/>
                        <Popover trigger="legacy" placement="right" isOpen={this.state.userpopoverOpen} target="username" toggle={this.userToggle}>
                        <div className={classes.userpopper}>
                            <h6>
                                <ul>
                                    <li>Username must be longer than 2 characters and shorter than 30. </li>
                                    <li>Username must only contain alpha-numeric characters and underscores.</li>
                                </ul>
                            </h6>
                        </div>
                        </Popover>
                    <input className={classes.SignUpinput} name="password" id="password" type="password" placeholder="Enter a password" value={this.state.user.password} onChange={this.handleChange} />
                        <Popover trigger="legacy" placement="right" isOpen={this.state.passpopperOpen} target="password" toggle={this.passToggle}>
                        <div className={classes.passpopper}>
                            <h6>
                                <ul>
                                    <li>Password must be 10 or more characters.</li>
                                </ul>
                            </h6>
                        </div>
                        </Popover>
                    <input className={classes.SignUpinput} name="confirmedPassword" type="password" placeholder="Confirm password" value={this.state.user.confirmedPassword} onChange={this.handleChange} />
                    <button className={classes.SignUpBtn} onClick={this.signUp}>Sign Up</button>
                    <Link className={classes.BackToLogin} to="/">Back To Login</Link>
                </form>
            </div>
        )
    }
}

export default SignUp