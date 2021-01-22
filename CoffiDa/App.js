import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import Login from './Components/Login';

class App extends Component {
  render(){
    let name = 'fuck george';
    return (
      <View>
        <Text>{name}</Text>
        <Login/>
      </View>
    );
  }
}

export default App;
