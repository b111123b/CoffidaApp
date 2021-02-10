import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'safwan@gmail.com',
            password: 'hello123',
            loggedIn: false,
            isLoading: false,
            authToken: '',
            id: ''
        }
    }
    
    handleEmailChange = (email) => {
        this.setState({email: email})
        
    }

    handlePasswordChange = (password) => {
        this.setState({password: password})
    }

    attemptLogin = async () => {
        const navigation = this.props.navigation;
        try {
            const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            });
            const responseData = await response.json();
            const token = responseData.token;
            const userId = responseData.id;
            console.log(userId);
            this.setState({authToken: token});
            this.setState({id: userId});
            navigation.navigate('Home', {
                authToken: this.state.authToken,
                id: this.state.id
            });
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    render(){

        const navigation = this.props.navigation;
        return (
            <View>
                <TextInput placeholder="Enter your email" onChangeText={this.handleEmailChange} value={this.state.email} />
                <TextInput placeholder="Enter your password" onChangeText={this.handlePasswordChange} value={this.state.password} />
                <Button
                    title="Login"
                    onPress={this.attemptLogin}
                
                />
                <Button
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>

        );
    }
}

