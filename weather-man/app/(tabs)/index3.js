import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const MyComponent = () => {

  const [cityName, setCityName] = useState("city")
  const [stateName, setStateName] = useState("state")
  const [zipCode, setZipCode] = useState("zip")
  const [countryName, setCountryName] = useState("country")


  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#62BFD4"/>
      <Text style={styles.upperHeader}>Please set the location you would like to recieve weather data from.</Text>
      <Text style={styles.opacityText}>*REQUIRES INTERNET ACCESS</Text>
      <TextInput style={styles.inputBox} placeholder="City" onChangeText={text => setCityName(text)}/>
      <View style={styles.dualInputContainer}>
        <TextInput style={styles.sideBySideInput} placeholder="State/Province" onChangeText={text => setStateName(text)}/>
        <TextInput style={styles.sideBySideInput} placeholder="Zip/Postal Code" onChangeText={text => setZipCode(text)}/>
      </View>
      <TextInput style={styles.inputBox} placeholder="Country" onChangeText={text => setCountryName(text)}/>
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
  }
});

export default MyComponent;
