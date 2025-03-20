import React, { useState } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Platform } from "react-native";
import { storeDataCoords, saveUser, getUser, getCoords } from '../../helpers/asyncHelper.js'
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Location from 'expo-location';


export default function launch1() {

  let pageIndicator1 = require('../../assets/images/Page1.png')

  // Creates Placeholder username. Can be changed via setName(x).
  const [userName, setName] = useState(null);

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

  // Checks for a name before moving onto the next page.
  async function onFetchRelease(){
    if (userName == null || userName.length < 2){
      // Create an official alert later.
      console.log("Name required to move on. Please submit a valid name. (More than 1 letter.)")
    } else {
      await saveUser(userName)
      router.push({pathname:"/(tabs)/index2"})
    }
  }

  function onManualRelease(){
    router.push({pathname:"/(tabs)/index3"})
  }

  async function printLocation(){
    console.log(await getCoords())
  }

  return (
    <View style={styles.container}>
      <View>
          <StatusBar style="light" backgroundColor="#62BFD4"/>
          <Text style={styles.titleHeader}>Welcome to {"\n"}Storm Link.</Text>
          <Text style={styles.nameheader}>What's your name?</Text>
          <Text style={styles.lighterText}>*Name Required.</Text>
          {/* If you dont remember how to fetch text-input values i didnt get it either so check out this link: https://reactnative.dev/docs/handling-text-input */}
          <TextInput style={styles.userNameInputBorder} placeholder="Enter your name" onChangeText={text => setName(text)}/>
          {/* <Text>{userName}</Text> */}
          <Text style={styles.locationHeader}>Would you like us to fetch your location?</Text>
          <Text style={styles.disclaimer}>Our app uses your location to deliver accurate weather updates. If you don’t allow location permissions, we won’t be able to do this automatically.{'\n'}{'\n'}However if you don’t consent, you can still get forecasts by entering your location manually.</Text>
          <TouchableOpacity style={styles.buttonsTouchable} onPress={() => onFetchPress()} onPressOut={() => onFetchRelease()}>
            <Text style={styles.buttonText}>FETCH MY LOCATION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsTouchable} onPressOut={() => onManualRelease()}>
            <Text style={styles.buttonText}>SET LOCATION MANUALLY</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
            source={pageIndicator1}
            style={styles.pageIndicator}
            />
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
    paddingLeft:"7%",
    paddingRight:"7%",
    fontFamily: "Roboto",
  },
  titleHeader: {
      color:"white",
      fontSize:36,
      fontWeight:"bold"
  },
  nameheader: {
    paddingTop:"12%",
    color:"white",
    fontSize:25,
    fontWeight:"bold"
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
    alignItems:"center",
  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color:"#001D6E",
    fontWeight:"bold",
    fontSize:16
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