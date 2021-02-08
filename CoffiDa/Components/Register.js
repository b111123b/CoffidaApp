import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            isLoading: false,
            authToken: '',
            userId: ''
        }
    }

    attemptRegister = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password })
            });
            const responseData = await response.json();
            const id = responseData.id;
            this.setState({userId:id})
            this.attemptLogin()
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }

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
            const id = responseData.id;
            this.setState({authToken: token});
            this.setState({userId:id})
            navigation.navigate('Home', 
                {authToken: this.state.authToken},
                {userId: this.state.userId}
            );
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    handleEmailChange = (email) => {
        this.setState({email: email})
        
    }

    handlePasswordChange = (password) => {
        this.setState({password: password})
    }

    handleFirstNameChange = (firstName) => {
        this.setState({firstName: firstName})
    }

    handleLastNameChange = (lastName) => {
        this.setState({lastName: lastName})
    }

    render() {
        return (
            <View>
            <TextInput placeholder="First Name" onChangeText={this.handleFirstNameChange} value={this.state.firstName}/>
            <TextInput placeholder="Last Name" onChangeText={this.handleLastNameChange} value={this.state.lastName}/>
            <TextInput placeholder="Email" onChangeText={this.handleEmailChange} value={this.state.email}/>
            <TextInput placeholder="Password" onChangeText={this.handlePasswordChange} value={this.state.password}/>
            <Button
                title="Register"
                onPress={this.attemptRegister}
            />
        </View>
        );
    }
}
  
const styles = StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: '#80a1c1',
    },
    title: {
      fontSize: 32,
      color: '#a85219'
    },
    subTitle: {
        fontSize: 18,
    },
    container: {
        backgroundColor: '#d9cfc1',
        flex: 1
    },
    image: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});