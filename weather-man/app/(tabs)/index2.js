import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Button, Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Platform } from "react-native";
import { storeDataCoords, saveUser, getUser, getCoords } from '../../helpers/asyncHelper.js'
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Location from 'expo-location';


export default function MainComp() {

  let pageIndicator1 = require('../../assets/images/Page1.png')

  // Creates Placeholder username. Can be changed via setName(x).
  const [userName, setName] = useState("User");

  // Serves as a final resting place for combined lat. long. coordinates once gathered.
  const [saved_coords, setCoords] = useState(null);

  let latitude;
  let longitude;

  async function saveLocation () {
    storeDataCoords( latitude, longitude )
    console.log("save attempted.")
  }

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  async function onFetchPress(){
    // Expo location boiler plate code.
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

        // Returns object with location data... stores in state variable.
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Navigating Location Object.
        console.log(location)
        let location_coords = location['coords']

        latitude = location_coords['latitude']
        longitude = location_coords['longitude']
        
        saveLocation()
      }

      getCurrentLocation();
  }

  async function printLocation(){
    console.log(await getCoords())
  }

  return (
    <View style={styles.container}>
      <View>
          <StatusBar style="light" backgroundColor="#62BFD4"/>
        <View style={styles.textContainer}>
            <Text style={styles.titleHeader}>You're all set,</Text>
            <Text style={styles.nameHeader}>Robert Feliciano.</Text>
            <Text style={styles.chosenWeatherSubHeader}>You chose to recieve weather information from:</Text>
            <Text>Loading Location...</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
      backgroundColor:"#62BFD4",
      flex: 1,
      paddingTop:"14%",
      fontFamily: "Roboto"
  },
  textContainer: {
    marginTop:"20%",
    marginLeft:"1%",
    marginRight:"1%",
    alignSelf:"center",
    alignItems:"center",
  },
  titleHeader: {
      color:"white",
      fontSize:39,
      fontWeight:"bold"
  },
  nameHeader: {
    paddingTop:"1%",
    maxWidth:"auto",
    color:"white",
    fontSize:25,
    fontWeight:"bold",
  },
  chosenWeatherSubHeader: {
    textAlign:"center",
    paddingTop:"10%",
    maxWidth:"auto",
    color:"white",
    fontSize:24,
    fontWeight:"bold",
  },
  lighterText: {
    paddingTop:"2%",
    paddingBottom:"2%",
    fontSize:10,
    fontWeight:"bold",
    color:"#9DE7F1"
  },
  userNameInputBorder: {
    padding:8,
    borderWidth:1,
    borderColor:"#356C78",
    color:"#356C78",
    borderRadius:9,
    backgroundColor:"white",
  },
  locationHeader: {
    color:"white",
    paddingTop:"5%",
    color:"white",
    fontSize:25,
    fontWeight:"bold"
  },
  disclaimer: {
    paddingTop:"10%",
    color:"white",
    fontWeight:"bold",
    fontSize:15
  },
  buttonsTouchable: {
    marginTop:"8%",
    backgroundColor:"white",
    width:"auto",
    height:"7%",
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText: {
    color:"#001D6E",
    fontWeight:"bold",
    fontSize:16
  },
  buttonsNotTouchable: {

  },
  pageIndicator: {
    display:"flex",
    alignSelf:"center",
    verticalAlign:"bottom",
    width:50,
    height:12,
  },
  imageContainer: {
    marginTop:50,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
})