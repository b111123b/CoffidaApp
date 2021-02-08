import 'react-native-gesture-handler';

import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Item from './Components/ListItem';
import Review from './Components/Review';
import Details from './Components/Details';

const MainStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LoginScreen() {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="Register" component={Register} />
      </LoginStack.Navigator>
    );
}

function UserScreen() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    );
}

class App extends Component {
    render(){
        return(
            <NavigationContainer>
                <MainStack.Navigator headerMode="none">
                    <MainStack.Screen name="Login" component={LoginScreen} />
                    <MainStack.Screen name="Home" component={UserScreen} />
                    <MainStack.Screen name="Item" component={Item} />
                    <MainStack.Screen name="Review" component={Review} />
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
