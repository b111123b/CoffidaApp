import 'react-native-gesture-handler';

import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Item from './Components/ListItem';
import Review from './Components/Review';
import User from './Components/User';

const MainStack = createStackNavigator();
const LoginStack = createStackNavigator();


function LoginScreen() {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="Register" component={Register} />
      </LoginStack.Navigator>
    );
  }

class App extends Component {
    render(){
        return(
            <NavigationContainer>
                <MainStack.Navigator headerMode="none">
                    <MainStack.Screen name="Login" component={LoginScreen} />
                    <MainStack.Screen name="Home" component={Home} />
                    <MainStack.Screen name="Item" component={Item} />
                    <MainStack.Screen name="Review" component={Review} />
                    <MainStack.Screen name="User" component={User} />
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }


}

export default App;
