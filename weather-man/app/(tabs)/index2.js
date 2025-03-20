import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Platform } from "react-native";
import { getUser, getCoords } from '../../helpers/asyncHelper.js'
import { StatusBar } from 'expo-status-bar';


export default function launch2() {

  let pageIndicator3 = require('../../assets/images/Page3.png')

  // Creates Placeholder username. Can be changed via setName(x).
  const [userName, setName] = useState("Loading...");
  const [userCity, setCity] = useState("City");
  const [userState, setState] = useState("State");
  const [userCountry, setCountry] = useState("Country");
  const [userPostalCode, setPostCode] = useState("XXXXX");

  // Retrieves name and location data fetched on the first page. Happens on mount.
  useEffect(async () => {
    let name_val = await getUser()
    let location_val = await getCoords()

    // Temporary JS variables to store lat/long data before setting.
    // This is necessary because the next console.log does not print anything if you call set a state then call it right after.
    // That would interfere with the URL fetching.
    let tempLat = location_val[0][1]
    let tempLong = location_val[1][1]

    let testLat = "64.8401"
    let testLong = "-147.7200"

    setName(name_val)
    console.log(tempLat,tempLong)
    

    let geoLocationAPI = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${tempLat}&lon=${tempLong}`

    async function fetchGeoLocation(){
        await fetch(geoLocationAPI)
        .then(response => response.json())
        .then((data) => {

        // Navigating object structure | obj => features array => features object => properties => address object => | Save: CITY, COUNTRY, STATE/PROVINCE, ZIP/POSTAL
        let features_array = data["features"]
        let features_object = features_array[0]
        let properties = features_object["properties"]
        let address_information = properties["address"]

        let city = address_information['city']
        let state = address_information['state']
        let country = address_information['country']
        let postal_code = address_information['postcode']

        setCity(city);
        setState(state);
        setCountry(country);
        setPostCode(postal_code);
    })
  }

    fetchGeoLocation();
  }, [])

  function onPressRelease() {
    router.push({pathname:"/(tabs)/userHomePage"})

  }

  return (
    <View style={styles.container}>
      <View>
          <StatusBar style="light" backgroundColor="#62BFD4"/>
        <View style={styles.textContainer}>
            <Text style={styles.titleHeader}>You're all set,</Text>
            <Text style={styles.nameHeader}>{userName}.</Text>
            <Text style={styles.chosenWeatherSubHeader}>You chose to recieve weather information from:</Text>
            <Text style={styles.locationInfo}>{userCity}, {userState}, {userPostalCode} | {userCountry}</Text>
            <Text style={styles.bottomText}>At this time Storm Link will store important emergency information and contacts according to the region you picked.{'\n'}{'\n'}If you ever find yourself without internet you should consult the “Offline Safety” tab.</Text>
            <TouchableOpacity style={styles.startButton} onPressOut={() => onPressRelease()}>
              <Text style={styles.buttonText}>START</Text>
            </TouchableOpacity>
            <Text style={styles.opacityText}>If you made a mistake don’t worry, your location can be changed later in the settings.</Text>
            <View style={styles.imageContainer}>
              <Image
                source={pageIndicator3}
                style={styles.pageIndicator}
              />
          </View>
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
  textContainer: {
    marginTop:"20%",
    width:"100%",
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
  },
  locationInfo: {
    margin:"1%",
    paddingTop:"2%",
    color:"white",
    fontWeight:"bold"
  },
  bottomText: {
    paddingTop:"34%",
    color:"white",
    fontWeight:"bold"
  },
  startButton: {
    marginTop: "8%",
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#001D6E",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    marginTop:50,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  opacityText: {
    paddingTop:10,
    color:"#9DE7F1",
    textAlign:"center"
  }
})