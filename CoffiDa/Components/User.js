/* eslint-disable global-require */
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
  Image,
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
      reviewIds: [],
      photoReviews: [],
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

  checkForPhoto = async (reviewId) => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${reviewId}/photo`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      if (response.ok) {
        const { photoReviews } = this.state;
        photoReviews.push(reviewId);
        this.setState({ photoReviews });
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  checkReviewhasPhoto() {
    const { reviewIds } = this.state;
    reviewIds.forEach((review) => {
      this.checkForPhoto(review);
    });
  }

  openReviewPage(item) {
    this.props.navigation.navigate('Review', {
      authToken: this.state.authToken,
      location_id: item.location.location_id,
      editReview: true,
      review: item.review,
      review_id: item.review.review_id,
    });
  }

  render() {
    const { user } = this.state;
    const { reviews } = user;
    const locations = user.favourite_locations;
    const likedReviews = user.liked_reviews;

    const editButton = (
      <TouchableOpacity onPress={this.onPressEditButton}>
        <Image style={styles.image} source={require('../edit_icon.png')} />
      </TouchableOpacity>
    );

    const updateDetails = (
      <Button
        color="#a85219"
        title="save changes"
        onPress={this.updateDetails}
      />
    );

    const viewDetails = (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.userTitle}>{user.first_name} </Text>
          <Text style={styles.userDetail}>{user.last_name}</Text>
          <Text style={styles.userDetail}>{user.email}</Text>
        </View>
        <View style={styles.userIcon}>{editButton}</View>
      </View>
    );

    const editDetails = (
      <View styles={styles.container}>
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
        {updateDetails}
      </View>
    );

    const renderReview = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={
          this.state.displayMode === 'reviews'
            ? () => this.openReviewPage(item)
            : null
        }
      >
        <Text style={styles.itemTitle}>{item.location.location_name} </Text>
        <Text style={styles.subTitle}>
          Overall Score: {item.review.overall_rating}
        </Text>
        <Text style={styles.subTitle}>
          Quality: {item.review.quality_rating}
        </Text>
        <Text style={styles.subTitle}>
          Price rating: {item.review.price_rating}
        </Text>
        <Text style={styles.subTitle}>
          Cleanliness Rating: {item.review.clenliness_rating}
        </Text>
        <Text style={styles.subTitle}>{item.review.review_body} </Text>
      </TouchableOpacity>
    );

    const renderLocation = ({ item }) => (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemTitle}>{item.location_name}</Text>
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

    const listRow = (
      <View style={styles.itemContainer}>
        <View style={{ width: '33%' }}>
          <Button
            color="#a85219"
            title="Reviews"
            onPress={this.onPressReviewButton}
          />
        </View>
        <View style={{ width: '34%' }}>
          <Button
            color="#a85219"
            title="Locations"
            onPress={this.onPressLocationButton}
          />
        </View>
        <View style={{ width: '33%' }}>
          <Button
            color="#a85219"
            title="liked"
            onPress={this.onPressLikedButton}
          />
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        {this.state.editable ? editDetails : viewDetails}
        {listRow}
        <Text style={styles.title}>{this.state.displayMode}</Text>
        {this.state.displayMode === 'locations' ? locationList : reviewList}
        <Button title="Logout" color="#a85219" onPress={this.logout} />
      </SafeAreaView>
    );
  }
}
