/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { Styles as styles } from './styles';

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
      <View style={styles.container}>
        <Image
          style={styles.centerImage}
          source={require('../coffee_icon.png')}
        />
        <Text style={styles.title}>CoffiDa</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your email"
            onChangeText={this.handleEmailChange}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInputPassword}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={this.handlePasswordChange}
            value={password}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.attemptLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
