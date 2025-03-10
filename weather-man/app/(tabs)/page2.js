import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import { storeDataCoords, getCoords } from '../../helpers/asyncHelper.js'


import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import React from 'react';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function saveLocation () {
    storeDataCoords( latitude, longitude )
    console.log("save attempted.")
  }
  
  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  let latitude = 'Loading...';
  let longitude = 'Loading...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    let coordinates = location['coords']

    latitude = coordinates['latitude']
    longitude = coordinates['longitude']
    text = JSON.stringify(location)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{latitude}</Text>
      <Text style={styles.paragraph}>{longitude}</Text>
      <Button title='SAVE MY LOCATION' onPress={() => saveLocation()} ></Button>
      
      <Link href={"/"}>Go Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
