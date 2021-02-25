import React, { Component } from 'react'
import { 
    View,
    StyleSheet,
    Button
} from 'react-native'
import {RNCamera} from 'react-native-camera';

export default class Camera extends Component {

    takePicture = async() => {
        if(this.camera){
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            const route = this.props.route;
            let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.location_id+'/review/'+route.params.review_id+'/photo';
            try{
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'image/jpeg',
                        'X-Authorization': route.params.authToken
                    },
                    body: data
                });
                this.props.navigation.goBack();
                alert("photo added");
            } catch (error) {
                console.log("error: " + error);
                alert(error);
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1, width: '100%'}}>
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
        flex: 1,
        width: '100%'
    },
    image: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});