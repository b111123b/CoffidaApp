/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unused-state */
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
  View,
} from 'react-native';
import { Styles as styles } from './styles';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      authToken: '',
      likedReviews: [],
      reviewIds: [],
      photoReviews: [],
    };
  }

  componentDidMount = async () => {
    await this.getItemData();
    await this.getReviewIds();
    await this.checkReviewhasPhoto();

    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getItemData();
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  getReviewIds() {
    const { item } = this.state;
    const reviews = item.location_reviews;
    const reviewIds = [];
    reviews.forEach((review) => {
      reviewIds.push(review.review_id);
    });
    this.setState({ reviewIds });
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
      alert('Review added to Likes');
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
      alert('Review deleted from Likes');
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
        let photoReviews = this.state.photoReviews;
        photoReviews.push(reviewId);
        this.setState({ photoReviews });
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  checkReviewhasPhoto() {
    let reviewIds = this.state.reviewIds;
    reviewIds.forEach((review) => {
      this.checkForPhoto(review);
    });
  }

  render() {
    const { item } = this.state;
    const { route } = this.props;
    const reviews = item.location_reviews;

    const heartIcon = (
      // eslint-disable-next-line global-require
      <Image style={styles.icon} source={require('../heart_icon.png')} />
    );

    const reviewPhoto = (id) => (
      <Image
        style={styles.reviewImage}
        source={{
          uri: `http://10.0.2.2:3333/api/1.0.0/location/${route.params.itemId}/review/${id}/photo`,
        }}
      />
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
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.itemTitle}>
              Overall Score: {item.overall_rating}
            </Text>
            <Text style={styles.subTitle}>Quality: {item.quality_rating} </Text>
            <Text style={styles.subTitle}>
              Price rating: {item.price_rating}
            </Text>
            <Text style={styles.subTitle}>
              Cleanliness Rating: {item.clenliness_rating}
            </Text>
            <Text style={styles.subTitle}>{item.review_body} </Text>
          </View>
          <View style={styles.itemIcon}>
            {this.state.likedReviews.includes(item.review_id)
              ? heartIcon
              : null}
          </View>
        </View>
        <View>
          {this.state.photoReviews.includes(item.review_id)
            ? reviewPhoto(item.review_id)
            : null}
        </View>
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
        <Text style={styles.locationDetails}>
          Location: {item.location_town}
        </Text>
        <Text style={styles.locationDetails}>
          Rating: {item.avg_overall_rating}
        </Text>
        <Text style={styles.locationDetails}>
          Price: {item.avg_price_rating}
        </Text>
        <Text style={styles.locationDetails}>
          quality: {item.avg_quality_rating}
        </Text>
        <Text style={styles.locationDetails}>
          cleanliness: {item.avg_clenliness_rating}
        </Text>
        <TouchableOpacity
          style={styles.reviewBtn}
          onPress={() => {
            this.props.navigation.navigate('Review', {
              authToken: this.state.authToken,
              location_id: item.location_id,
            });
          }}
        >
          <Text style={styles.btnText}>LEAVE REVIEW</Text>
        </TouchableOpacity>
        {reviewList}
      </SafeAreaView>
    );
  }
}
