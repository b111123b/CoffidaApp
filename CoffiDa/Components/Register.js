/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
// destructuirng the navigation prop gave weird promise warnings
import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      passwordRepeat: '',
    };
  }

  // eslint-disable-next-line consistent-return
  attemptRegister = async () => {
    const { email, password, firstName, lastName, passwordRepeat } = this.state;
    if (password !== passwordRepeat) {
      return alert('Passwords do not match');
    }
    try {
      await fetch('http://10.0.2.2:3333/api/1.0.0/user/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });
      this.attemptLogin();
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  attemptLogin = async () => {
    const { navigation } = this.props;
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
            email: this.state.email,
            password: this.state.password,
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
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleSecondPasswordChange = (passwordRepeat) => {
    this.setState({ passwordRepeat });
  };

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName });
  };

  handleLastNameChange = (lastName) => {
    this.setState({ lastName });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="First Name"
          onChangeText={this.handleFirstNameChange}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={this.handleLastNameChange}
          value={this.state.lastName}
        />
        <TextInput
          placeholder="Email"
          onChangeText={this.handleEmailChange}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
          secureTextEntry
        />
        <TextInput
          placeholder="Password (again)"
          onChangeText={this.handleSecondPasswordChange}
          value={this.state.passwordRepeat}
          secureTextEntry
        />
        <Button title="Register" onPress={this.attemptRegister} />
      </View>
    );
  }
}
