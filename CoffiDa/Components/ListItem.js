/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
// destructuirng the navigation prop gave weird promise warnings
import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Styles as styles } from './styles';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      authToken: '',
      likedReviews: [],
    };
  }

  componentDidMount() {
    this.getItemData();

    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getItemData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  postReviewLike = async (id) => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${id}/like`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      const liked = this.state.likedReviews;
      liked.push(id);
      this.setState({ likedReviews: liked });
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  deleteReviewLike = async (id) => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${id}/like`;
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      const liked = this.state.likedReviews;
      const index = liked.indexOf(id);
      liked.splice(index, 1);
      this.setState({ likedReviews: liked });
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  getItemData = async () => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}`;
    this.setState({ authToken: route.params.authToken });
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      this.setState({ item: responseData });
      this.setState({ likedReviews: route.params.likedReviews });
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  render() {
    const { item } = this.state;
    const reviews = item.location_reviews;

    const heartIcon = (
      // eslint-disable-next-line global-require
      <Image style={styles.icon} source={require('../heart_icon.png')} />
    );

    // eslint-disable-next-line no-shadow
    const renderReview = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={
          this.state.likedReviews.includes(item.review_id)
            ? () => this.deleteReviewLike(item.review_id)
            : () => this.postReviewLike(item.review_id)
        }
      >
        <Text style={styles.title}>Overall Score: {item.overall_rating} </Text>
        <Text style={styles.subTitle}>Quality: {item.quality_rating} </Text>
        <Text style={styles.subTitle}>Price rating: {item.price_rating} </Text>
        <Text style={styles.subTitle}>
          Cleanliness Rating: {item.clenliness_rating}{' '}
        </Text>
        <Text style={styles.subTitle}>{item.review_body} </Text>
        {this.state.likedReviews.includes(item.review_id) ? heartIcon : null}
      </TouchableOpacity>
    );

    const reviewList = (
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(review) => review.review_id.toString()}
      />
    );

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> {item.location_name} </Text>
        <Image
          style={styles.itemImage}
          // eslint-disable-next-line global-require
          source={require('../image_placeholder.png')}
        />
        <Text style={styles.subTitle}>Location: {item.location_town}</Text>
        <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
        <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
        <Text style={styles.subTitle}>quality: {item.avg_quality_rating}</Text>
        <Text style={styles.subTitle}>
          cleanliness: {item.avg_clenliness_rating}
        </Text>
        <Button
          title="leave review"
          onPress={() => {
            this.props.navigation.navigate('Review', {
              authToken: this.state.authToken,
              location_id: item.location_id,
            });
          }}
          // make this link to review page and have that post review
        />
        {reviewList}
      </SafeAreaView>
    );
  }
}
