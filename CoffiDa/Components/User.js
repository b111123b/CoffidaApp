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
    Button,
    TextInput
} from 'react-native'

import { CommonActions } from '@react-navigation/native';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: '',
            id: '',
            user: '',
            editable: false,
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    getUserData = async() => {
        const route = this.props.route;
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
            let user = responseData;
            this.setState({user: user})
            this.setState({authToken: route.params.authToken});
            this.setState({firstName: user.first_name});
            this.setState({lastName: user.last_name});
            this.setState({email: user.email});
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

    onPressEditButton = () => {  
        this.setState({ editable: !this.state.editable })  
    }

    handleEmailChange = (email) => {
        this.setState({email: email})
    }

    handlePasswordChange = (password) => {
        this.setState({password: password})
    }

    handleFirstNameChange = (firstName) => {
        this.setState({firstName: firstName})
    }

    handleLastNameChange = (lastName) => {
        this.setState({lastName: lastName})
    }

    updateDetails = async() => {
        if (this.state.password==''){
            return(
                alert('Please enter a password')
            );
        }
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/user/'+route.params.id;
        try{
            let response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                },
                body: JSON.stringify({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            this.onPressEditButton();
            this.getUserData();
            this.setState({password: ''})
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    render() {
        let user = this.state.user;

        let viewDetails = <View>
            <Text style={styles.title}>{user.first_name} </Text>
            <Text style={styles.subTitle}>{user.last_name}</Text>
            <Text style={styles.subTitle}>{user.email}</Text>
        </View>

        let editDetails = <View>
            <TextInput placeholder="First Name" onChangeText={this.handleFirstNameChange} value={this.state.firstName}/>
            <TextInput placeholder="Last Name" onChangeText={this.handleLastNameChange} value={this.state.lastName}/>
            <TextInput placeholder="Email" onChangeText={this.handleEmailChange} value={this.state.email}/>
            <TextInput placeholder="Password" onChangeText={this.handlePasswordChange} value={this.state.password}/>
        </View>

        let editButton = <Button
            title={this.state.editable ? 'Save changes': 'Edit'}
            onPress={this.state.editable ? this.updateDetails: this.onPressEditButton}
        />
        console.log('editable: ' + this.state.editable)

        return (
            <SafeAreaView style={styles.container}>
                {this.state.editable ? editDetails: viewDetails}
                {editButton}
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