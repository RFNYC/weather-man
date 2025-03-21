import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';



const MyComponent = () => {

  const [cityName, setCityName] = useState("city")
  const [stateName, setStateName] = useState("state")
  const [zipCode, setZipCode] = useState("zip")
  const [countryName, setCountryName] = useState("country")

  function onCheckRelease(){
    console.log(cityName+stateName+zipCode+countryName)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#62BFD4"/>
      <Text style={styles.upperHeader}>Please set the location you would like to recieve weather data from.</Text>
      <TextInput style={styles.inputBox} placeholder="City" onChangeText={text => setCityName(text)}/>
      <View style={styles.dualInputContainer}>
        <TextInput style={styles.sideBySideInput} placeholder="State/Province" onChangeText={text => setStateName(text)}/>
        <TextInput style={styles.sideBySideInput} placeholder="Zip/Postal Code" onChangeText={text => setZipCode(text)}/>
      </View>
      <TextInput style={styles.inputBox} placeholder="Country" onChangeText={text => setCountryName(text)}/>
      <MapView style={styles.map}/>
      <TouchableOpacity style={styles.buttonsTouchable} onPressOut={() => onCheckRelease()}>
            <Text style={styles.buttonText}>CHECK LOCATION ON MAP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonsTouchable} onPressOut={() => onManualRelease()}>
            <Text style={styles.buttonText}>SAVE LOCATION</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#62BFD4',
    paddingTop:"20%",
    paddingLeft:"7%",
    paddingRight:"7%",
  },
  upperHeader: {
    paddingBottom:"4%",
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign:"center"
  },
  opacityText: {
    paddingTop:10,
    color:"#9DE7F1",
    textAlign:"center",
    paddingBottom:"7%"
  },
  inputBox: {
    padding:8,
    margin:3,
    borderWidth:1,
    borderColor:"#356C78",
    color:"#356C78",
    borderRadius:9,
    backgroundColor:"white",
    width:"100%"
  },
  sideBySideInput: {
    padding:8,
    borderWidth:1,
    borderColor:"#356C78",
    color:"#356C78",
    borderRadius:9,
    backgroundColor:"white",
    width:"50%",
  },
  dualInputContainer: {
    width:"100%",
    flexDirection:"row"
  },
  mapContainer: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  map: {
    width: '100%',
    height: '35%',
  },
  buttonsTouchable: {
    marginTop:"4%",
    backgroundColor:"white",
    width:"100%",
    height:"7%",
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
  },
  buttonText: {
    color:"#001D6E",
    fontWeight:"bold",
    fontSize:16
  },
});

export default MyComponent;
