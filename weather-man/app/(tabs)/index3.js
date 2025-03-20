import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const MyComponent = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#62BFD4"/>
      <Text style={styles.upperHeader}>Please set the location you would like to recieve weather data from.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#62BFD4',
    paddingLeft:"7%",
    paddingRight:"7%",
  },
  upperHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MyComponent;
