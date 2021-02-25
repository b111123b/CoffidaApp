/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
// destructuirng the navigation prop gave weird promise warnings
import React, { Component } from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import { Styles as styles } from './styles';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      authToken: '',
      id: '',
      user: [],
      favourites: [],
    };
  }

  componentDidMount = async () => {
    await this.getData();
    await this.getUserData();
    await this.getFavorites();
    await this.getLikedReviews();

    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getData();
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
    const { route } = this.props;
    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });

      const responseData = await response.json();
      this.setState({ items: responseData });
      this.setState({ authToken: route.params.authToken });
      this.setState({ id: route.params.id });
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
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
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  getLikedReviews() {
    const reviews = this.state.user.liked_reviews;
    const likedReviews = [];
    reviews.forEach((review) => {
      likedReviews.push(review.review.review_id);
    });
    this.setState({ likedReviews });
  }

  getFavorites() {
    const locations = this.state.user.favourite_locations;
    const favourites = [];
    locations.forEach((location) => {
      favourites.push(location.location_id);
    });
    this.setState({ favourites });
  }

  postFavourite = async (id) => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${id}/favourite`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      this.componentDidMount();
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  deleteFavourite = async (id) => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${id}/favourite`;
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      this.componentDidMount();
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  render() {
    const { authToken, favourites, likedReviews, id, items } = this.state;

    const favouriteIcon = (
      // eslint-disable-next-line global-require
      <Image style={styles.image} source={require('../coffee_icon.png')} />
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('Item', {
            itemId: item.location_id,
            authToken,
            favourites,
            likedReviews,
          })
        }
        onLongPress={
          favourites.includes(item.location_id)
            ? () => this.deleteFavourite(item.location_id)
            : () => this.postFavourite(item.location_id)
        }
      >
        <Text style={styles.title}>{item.location_name}</Text>
        <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
        <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
        <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
        {favourites.includes(item.location_id) ? favouriteIcon : null}
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={styles.container}>
        <Button
          style={styles.bottomButton}
          title="User Page"
          onPress={() =>
            this.props.navigation.navigate('User', {
              id,
              authToken,
            })
          }
        />
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </SafeAreaView>
    );
  }
}
