import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { storeData, getData, saveUser, getUser, getCoords } from '../../helpers/asyncHelper.js'
import { StatusBar } from 'expo-status-bar';


export default function MainComp() {

  // Creates Placeholder username. Can be changed via setName(x).
  const [userName, setName] = useState("User");
  const [saved_coords, setCoords] = useState("");

  // Creates a function that can call the storeData func.
  async function saveButton(){
    saveUser(userName)
    console.log("save attempted")
  }

  // Creates a function to call getData func.
  async function loadButton(){
    const retrieved_data = await getUser()
    setName(retrieved_data)
  }

  async function loadCoordinates(){
    let values =  await getCoords()
    let fetchedCoordinates = values
    let latitude = fetchedCoordinates[0][1]
    let longitude = fetchedCoordinates[1][1]

    let coords = `${latitude},${longitude}`
    console.log(coords)
    setCoords(coords)
  }

    return (
    <View style={styles.container}>
      <View>
          <StatusBar style="light" backgroundColor="#62BFD4"/>
          <Text style={styles.titleHeader}>Welcome to {"\n"}Storm Link.</Text>
          <Text style={styles.nameheader}>What's your name?</Text>
          <Text style={styles.lighterText}>*Name Required.</Text>
          <TextInput style={styles.userNameInputBorder} placeholder="Enter your name"/>
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
  }
})