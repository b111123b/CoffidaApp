/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
// destructuirng the navigation prop gave weird promise warnings
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Styles as styles } from './styles';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authToken: '',
      user: '',
      editable: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      displayMode: 'reviews',
    };
  }

  componentDidMount() {
    this.getUserData();

    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getUserData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onPressEditButton = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ editable: !this.state.editable });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName });
  };

  handleLastNameChange = (lastName) => {
    this.setState({ lastName });
  };

  onPressReviewButton = () => {
    this.setState({ displayMode: 'reviews' });
  };

  onPressLocationButton = () => {
    this.setState({ displayMode: 'locations' });
  };

  onPressLikedButton = () => {
    this.setState({ displayMode: 'liked reviews' });
  };

  getUserData = async () => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/user/${route.params.id}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      const responseData = await response.json();
      const user = responseData;
      this.setState({ user });
      this.setState({ authToken: route.params.authToken });
      this.setState({ firstName: user.first_name });
      this.setState({ lastName: user.last_name });
      this.setState({ email: user.email });
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  logout = async () => {
    const { route } = this.props;
    try {
      await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Login' }],
        }),
      );
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  updateDetails = async () => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/user/${route.params.id}`;
    try {
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
        body: JSON.stringify({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        }),
      });
      this.onPressEditButton();
      this.getUserData();
      this.setState({ password: '' });
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  render() {
    const { user } = this.state;
    const { reviews } = user;
    const locations = user.favourite_locations;
    const likedReviews = user.liked_reviews;

    const viewDetails = (
      <View>
        <Text style={styles.title}>{user.first_name} </Text>
        <Text style={styles.subTitle}>{user.last_name}</Text>
        <Text style={styles.subTitle}>{user.email}</Text>
      </View>
    );

    const editDetails = (
      <View>
        <TextInput
          placeholder="First Name"
          onChangeText={this.handleFirstNameChange}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={this.handleLastNameChange}
          value={this.state.lastName}
        />
        <TextInput
          placeholder="Email"
          onChangeText={this.handleEmailChange}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />
      </View>
    );

    const editButton = (
      <Button
        title={this.state.editable ? 'Save changes' : 'Edit'}
        onPress={
          this.state.editable ? this.updateDetails : this.onPressEditButton
        }
      />
    );

    const renderReview = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('Review', {
            authToken: this.state.authToken,
            location_id: item.location.location_id,
            editReview: true,
            review: item.review,
            review_id: item.review.review_id,
          })
        }
      >
        <Text style={styles.title}>{item.location.location_name} </Text>
        <Text style={styles.subTitle}>
          Overall Score: {item.review.overall_rating}{' '}
        </Text>
        <Text style={styles.subTitle}>
          Quality: {item.review.quality_rating}{' '}
        </Text>
        <Text style={styles.subTitle}>
          Price rating: {item.review.price_rating}{' '}
        </Text>
        <Text style={styles.subTitle}>
          Cleanliness Rating: {item.review.clenliness_rating}{' '}
        </Text>
        <Text style={styles.subTitle}>{item.review.review_body} </Text>
      </TouchableOpacity>
    );

    const renderLocation = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        // onPress={() => this.props.navigation.navigate('Item',{
        //         item: item,
        //         authToken: this.state.authToken
        //     })
        // }
      >
        <Text style={styles.title}>{item.location_name}</Text>
        <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
        <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
        <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
      </TouchableOpacity>
    );

    const reviewList = (
      <FlatList
        data={this.state.displayMode === 'reviews' ? reviews : likedReviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.review.review_id.toString()}
      />
    );

    const locationList = (
      <FlatList
        data={locations}
        renderItem={renderLocation}
        keyExtractor={(item) => item.location_id.toString()}
      />
    );

    return (
      <SafeAreaView style={styles.container}>
        {this.state.editable ? editDetails : viewDetails}
        {editButton}
        <Button title="Logout" onPress={this.logout} />
        <Button title="Reviews" onPress={this.onPressReviewButton} />
        <Button
          title="Favourtied locations"
          onPress={this.onPressLocationButton}
        />
        <Button title="liked reviews" onPress={this.onPressLikedButton} />
        <Text style={styles.title}>{this.state.displayMode}</Text>
        {this.state.displayMode === 'locations' ? locationList : reviewList}
      </SafeAreaView>
    );
  }
}
