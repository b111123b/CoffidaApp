import React, { Component } from 'react'
import { 
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native'

import { CommonActions } from '@react-navigation/native';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: '',
            id: '',
            user: ''
        }
    }

    getUserData = async() => {
        const route = this.props.route;
        console.log('id: ' + route.params.id);
        console.log('token: ' + route.params.authToken);
        let url = 'http://10.0.2.2:3333/api/1.0.0/user/'+route.params.id;
        try{
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            let responseData = await response.json();
            this.setState({user:responseData})
            this.setState({authToken: route.params.authToken});
            console.log('responseData: '+responseData);

        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    logout = async() => {
        const route = this.props.route;
        try{
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: 'Login'}
                    ],
                })
            );
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    componentDidMount () {
        this.getUserData();
    }

    render() {
        let user = this.state.user;
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{user.first_name} </Text>
                <Text style={styles.subTitle}>{user.last_name}</Text>
                <Text style={styles.subTitle}>{user.email}</Text>
                <Button
                    title="Edit"

                />
                <Button
                    title="Logout"
                    onPress={this.logout}
                />
            </SafeAreaView>
        )
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