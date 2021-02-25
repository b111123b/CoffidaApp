/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
// destructuirng the navigation prop gave weird promise warnings
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { Styles as styles } from './styles';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authToken: '',
      overall: '',
      price: '',
      clean: '',
      quality: '',
      body: '',
      editReview: false,
      hasPhoto: false,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    this.setState({ authToken: route.params.authToken });
    this.setState({ editReview: route.params.editReview });

    // eslint-disable-next-line no-unused-expressions
    route.params.editReview ? this.setPageStateEdit(route.params.review) : null;
    this.checkForPhoto();
  }

  handleOverallChange = (overall) => {
    this.setState({ overall });
  };

  handlePriceChange = (price) => {
    this.setState({ price });
  };

  handleQualityChange = (quality) => {
    this.setState({ quality });
  };

  handleCleanChange = (clean) => {
    this.setState({ clean });
  };

  handleBodyChange = (body) => {
    this.setState({ body });
  };

  setPageStateEdit = (review) => {
    this.setState({ overall: String(review.overall_rating) });
    this.setState({ price: String(review.price_rating) });
    this.setState({ clean: String(review.clenliness_rating) });
    this.setState({ quality: String(review.quality_rating) });
    this.setState({ body: review.review_body });
  };

  // eslint-disable-next-line consistent-return
  postReview = async () => {
    if (this.checkBody() === true) {
      return alert('body has profanity please remove');
    }
    const { route } = this.props;
    const { overall, price, quality, clean, body } = this.state;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review`;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
        body: JSON.stringify({
          overall_rating: Number(overall),
          price_rating: Number(price),
          quality_rating: Number(quality),
          clenliness_rating: Number(clean),
          review_body: body,
        }),
      });
      // eslint-disable-next-line react/destructuring-assignment
      this.props.navigation.goBack();
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  // eslint-disable-next-line consistent-return
  updateReview = async () => {
    if (this.checkBody() === true) {
      return alert('body has profanity please remove');
    }
    const { overall, price, quality, clean, body } = this.state;
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}`;
    try {
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
        body: JSON.stringify({
          overall_rating: Number(overall),
          price_rating: Number(price),
          quality_rating: Number(quality),
          clenliness_rating: Number(clean),
          review_body: body,
        }),
      });
      // eslint-disable-next-line react/destructuring-assignment
      this.props.navigation.goBack();
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  deleteReview = async () => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}`;
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      // eslint-disable-next-line react/destructuring-assignment
      this.props.navigation.goBack();
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  checkForPhoto = async () => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}/photo`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      if (response.ok) {
        this.setState({ hasPhoto: true });
        // const myBlob = await response.blob();
        // let photoURL = (URL || webkitURL).createObjectURL(myBlob);
        // this.setState({ photo: myBlob });
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  deletePhoto = async () => {
    const { route } = this.props;
    const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}/photo`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': route.params.authToken,
        },
      });
      if (response.ok) {
        this.setState({ hasPhoto: false });
      }
      // eslint-disable-next-line react/destructuring-assignment
      this.props.navigation.goBack();
      alert('photo deleted');
    } catch (error) {
      console.log(`error: ${error}`);
      alert(error);
    }
  };

  checkBody() {
    const { body } = this.state;
    const profanity = [
      'tea',
      'Tea',
      'TEA',
      'cake',
      'CAKE',
      'cakes',
      'Pastry',
      'pastry',
    ];
    let failed = false;
    profanity.forEach((word) => {
      if (body.includes(word) === true) {
        failed = true;
      }
    });
    return failed;
  }

  render() {
    const {
      overall,
      price,
      quality,
      clean,
      body,
      authToken,
      hasPhoto,
      editReview,
    } = this.state;

    const { route } = this.props;
    const postButton = <Button title="Post Review" onPress={this.postReview} />;

    const editButton = (
      <Button title="Edit Review" onPress={this.updateReview} />
    );

    const deleteButton = (
      <Button title="delete Review" onPress={this.deleteReview} />
    );

    const deletePhotoButton = (
      <Button title="delete Photo" onPress={this.deletePhoto} />
    );

    const enableCameraButton = (
      <Button
        title="Add Photo"
        onPress={() =>
          // eslint-disable-next-line react/destructuring-assignment
          this.props.navigation.navigate('Camera', {
            authToken,
            location_id: route.params.location_id,
            review_id: route.params.review_id,
          })
        }
      />
    );

    const editControls = (
      <View>
        {editButton}
        {deleteButton}
        {hasPhoto === true ? deletePhotoButton : enableCameraButton}
      </View>
    );

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Overall Rating"
            onChangeText={this.handleOverallChange}
            value={overall}
          />
          <TextInput
            placeholder="Price Ratiing"
            onChangeText={this.handlePriceChange}
            value={price}
          />
          <TextInput
            placeholder="Quality Rating"
            onChangeText={this.handleQualityChange}
            value={quality}
          />
          <TextInput
            placeholder="Cleanliness Rating"
            onChangeText={this.handleCleanChange}
            value={clean}
          />
          <TextInput
            style={styles.body}
            placeholder="Write comment here"
            onChangeText={this.handleBodyChange}
            value={body}
            numberOfLines={5}
          />
          {editReview === true ? editControls : postButton}
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     backgroundColor: '#80a1c1',
//   },
//   title: {
//     fontSize: 32,
//     color: '#a85219',
//   },
//   subTitle: {
//     fontSize: 18,
//   },
//   container: {
//     backgroundColor: '#d9cfc1',
//     flex: 1,
//     width: '100%',
//   },
//   image: {
//     display: 'flex',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
// });
