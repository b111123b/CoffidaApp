import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Components/Login';
import Navigation from './Components/Navigation';

const Stack = createStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 'login'
        }
    }

    render(){

        let user = {
            email:'123',
            password:'456'
        };
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Navigation" component={Navigation} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }


}

export default App;



    // render(){
    //     let user = {
    //         email:'123',
    //         password:'456'
    //     };
    //     console.log('apps js: '+this.state.activePage);

    //     return (
    //         <View>
    //             <Login user={user} activePage={this.state.activePage}/>
    //             <Text title='yeeeeeeee'>yeeeeeeee</Text>
    //         </View>
    //     );
    // }
