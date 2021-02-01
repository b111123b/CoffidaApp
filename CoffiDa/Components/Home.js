import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: this.props.authToken
        }
    }

    // componentDidMount () {
    //     // console.log("authToken: " + route.params.authToken);
    //     try {
    //         const response = fetch('http://10.0.2.2:3333/api/1.0.0/find', {
    //             method: 'GET',
    //             headers: {
    //                 'X-Authorization': '2443c1f277d27823190e49fcfcb19c37'
    //             }
    //         });
    //         //const responseData = response.json();
    //         console.log("responceData: " + response);
    //         console.log(response);

    //     } catch (error) {
    //         console.log("error: " + error);
    //         alert(error);
    //     } 
    // }

    render() {
        let longText = "";
        return (
            <ScrollView>
                <Text style={styles.baseText}>
                    This is the 
                    <Text style={styles.innerText}>
                        Home page
                    </Text>
                </Text>
                <Text style={styles.scrollText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontWeight: 'bold',
        fontSize: 70
    },
    innerText: {
        color: 'red',
        fontSize: 70
    },
    scrollText: {
        fontSize: 30
    }
})