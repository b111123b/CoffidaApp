import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';


const Home = () => {
    return (
      <Text style={styles.baseText}>
        This is the 
        <Text style={styles.innerText}> Home page</Text>
      </Text>
    );
  };
  
  const styles = StyleSheet.create({
    baseText: {
      fontWeight: 'bold'
    },
    innerText: {
      color: 'red'
    }
});

export default Home;