import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';


const Navigation = () => {
    return (
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
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

export default Navigation;