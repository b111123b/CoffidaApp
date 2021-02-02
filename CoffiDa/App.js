import 'react-native-gesture-handler';

import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';

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
    constructor(props) {
        super(props);

        this.state = {
            authToken: "test"
        }
    }

    render(){
        // console.log("props: "+ this.state.authToken);

        let user = {
            email:'123',
            password:'456'
        };
        return(
            <NavigationContainer>
                <MainStack.Navigator headerMode="none">
                    <MainStack.Screen name="Login" component={LoginScreen} />
                    <MainStack.Screen name="Home" component={Home} />
                    {/* <MainStack.Screen name="Home" {props} */}
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }


}

export default App;
