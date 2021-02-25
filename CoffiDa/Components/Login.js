/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'safwan@gmail.com',
      password: 'hello123',
    };
  }

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  attemptLogin = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    try {
      const response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/user/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const responseData = await response.json();
      const { token } = responseData;
      const userId = responseData.id;
      navigation.navigate('Home', {
        authToken: token,
        id: userId,
      });
      console.log(`authToken: ${token}`);
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Enter your email"
          onChangeText={this.handleEmailChange}
          value={email}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={this.handlePasswordChange}
          value={password}
        />
        <Button title="Login" onPress={this.attemptLogin} />
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    );
  }
}
