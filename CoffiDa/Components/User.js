import React, { Component } from 'react'
import { 
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
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
            lastName: '',
            displayMode: 'reviews'
        }
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

    onPressReviewButton = () => {  
        this.setState({ displayMode: 'reviews' })  
    }
    onPressLocationButton = () => {  
        this.setState({ displayMode: 'locations' })  
    }
    onPressLikedButton = () => {  
        this.setState({ displayMode: 'liked reviews' })  
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

    updateDetails = async() => {
        if (this.state.password==''){
            return(
                alert('Please enter a password')
            );
        }
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/user/'+route.params.id;
        try{
            await fetch(url, {
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

    componentDidMount () {
        this.getUserData();
    }

    render() {
        let user = this.state.user;
        let reviews = user.reviews;
        let locations = user.favourite_locations;
        let likedReviews = user.liked_reviews

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

        const renderReview = ({item}) => (
            <TouchableOpacity
                style={styles.item}
            >
                <Text style={styles.title}>{item.location.location_name} </Text>
                <Text style={styles.subTitle}>Overall Score: {item.review.overall_rating} </Text>
                <Text style={styles.subTitle}>Quality: {item.review.quality_rating} </Text>
                <Text style={styles.subTitle}>Price rating: {item.review.price_rating} </Text>
                <Text style={styles.subTitle}>Cleanliness Rating: {item.review.clenliness_rating} </Text>
                <Text style={styles.subTitle}>{item.review.review_body} </Text>
            </TouchableOpacity >
        )

        const renderLocation = ({item}) => (
            <TouchableOpacity
                style={styles.item}
            >
                <Text style={styles.title}>{item.location_name}</Text>
                <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
                <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
                <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
            </TouchableOpacity >
        )

        let reviewList = <FlatList
            data={this.state.displayMode === 'reviews' ? reviews : likedReviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.review.review_id.toString()}
        />

        let locationList = <FlatList
            data={locations}
            renderItem={renderLocation}
            keyExtractor={(item) => item.location_id.toString()}
        />

        // console.log(user.reviews[0]);

        return (
            <SafeAreaView style={styles.container}>
                {this.state.editable ? editDetails: viewDetails}
                {editButton}
                <Button
                    title="Logout"
                    onPress={this.logout}
                />
                <Button
                    title="Reviews"
                    onPress={this.onPressReviewButton}
                />
                <Button
                    title="Favourtied locations"
                    onPress={this.onPressLocationButton}
                />
                <Button
                    title="liked reviews"  
                    onPress={this.onPressLikedButton}
                />
                <Text style={styles.title}>{this.state.displayMode}</Text>
                {this.state.displayMode === 'locations' ? locationList : reviewList}
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