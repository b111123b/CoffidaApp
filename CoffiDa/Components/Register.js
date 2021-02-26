/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
// destructuirng the navigation prop gave weird promise warnings
import React, { Component } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { Styles as styles } from './styles';

const forbiddenCharecters = [
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '+',
  '=',
  '<',
  '>',
  '?',
  '/',
  '~',
  '`',
];
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

  // eslint-disable-next-line react/sort-comp
  checkforforbiddenCharecters() {
    let abort = false;
    const { email, firstName, lastName } = this.state;
    forbiddenCharecters.forEach((charecter) => {
      if (
        email.includes(charecter) === true ||
        lastName.includes(charecter) === true ||
        firstName.includes(charecter) === true
      ) {
        abort = true;
      }
    });
    return abort;
  }

  // eslint-disable-next-line consistent-return
  attemptRegister = async () => {
    const { email, password, firstName, lastName, passwordRepeat } = this.state;
    const charecterCheck = this.checkforforbiddenCharecters();
    if (charecterCheck === true) {
      return alert('using forbiddenCharecters');
    }
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
      <View style={styles.container}>
        <Image
          style={styles.centerImage}
          source={require('../coffee_icon.png')}
        />
        <View style={styles.inputView}>
          <TextInput
            placeholder="First Name"
            style={styles.TextInput}
            onChangeText={this.handleFirstNameChange}
            value={this.state.firstName}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            onChangeText={this.handleLastNameChange}
            value={this.state.lastName}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={this.handleEmailChange}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
            secureTextEntry
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Repeat Password"
            onChangeText={this.handleSecondPasswordChange}
            value={this.state.passwordRepeat}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.attemptRegister}
        >
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
