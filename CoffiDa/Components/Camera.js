/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Styles as styles } from './styles';

export default class Camera extends Component {
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const { route, navigation } = this.props;
      const url = `http://10.0.2.2:3333/api/1.0.0/location/${route.params.location_id}/review/${route.params.review_id}/photo`;
      try {
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
            'X-Authorization': route.params.authToken,
          },
          body: data,
        });
        navigation.goBack();
        alert('photo added');
      } catch (error) {
        console.log(`error: ${error}`);
        alert(error);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
        />

        <Button
          title="Take Photo"
          onPress={() => {
            this.takePicture();
          }}
        />
      </View>
    );
  }
}
