import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text
} from 'react-native';


const Register = () => {
    return (
      <Text style={styles.baseText}>
        This is the 
        <Text style={styles.innerText}> Register page</Text>
      </Text>
    );
  };
  
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

export default Register;