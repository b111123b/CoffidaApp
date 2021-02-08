import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Review extends Component {
    render() {
        return (
            <Text style={styles.baseText}>
                This is the 
                <Text style={styles.innerText}> Review page</Text>
            </Text>
        )
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
    }
});
