import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            buttonStyle: "#0000ff"
        }
    }
    

    handleEmailChange = (email) => {
        // do something here
        this.setState({email: email})
    }

    handlePasswordChange = (password) => {
        // do something here
        this.setState({password: password})
    }

    handleLoginButtonClick = () => {
        // do something here
        // probably send off post request
        let colour = this.state.buttonStyle == "#ffc0cb" ? "#0000ff" : "#ffc0cb";
        this.setState({buttonStyle: colour})
    }

    render(){
        return (
            <View>
                <TextInput placeholder="Enter your email" onChange={this.handleEmailChange} value={this.state.email} />
                <TextInput placeholder="Enter your password" onChange={this.handlePasswordChange} value={this.state.password} />
                <Button title="button" color={this.state.buttonStyle} onPress={this.handleLoginButtonClick}>login</Button>
            </View>

        );
    }
}

export default Login;
