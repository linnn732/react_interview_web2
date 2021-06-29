
import '../App.css';
import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import logo from '../interview2.png';

export class Login extends Component {

    responseGoogle = (response) => {
        //console.log(response);
        console.log("profileObj:",response.profileObj.email);
        //console.log("accessToken:",response.accessToken);
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome to Interview Web
        </p>
                <div>
                    <GoogleLogin
                        clientId="115562708860-jl5q2ajou4qjsq31haes9u4lmj4onn3u.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </header>
        );
    }
}
export default Login;
