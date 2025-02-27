import React, { useEffect, useState } from "react";
import { Link } from 'expo-router'
import { Button, Text, TouchableOpacity, View, PermissionsAndroid } from "react-native";
import { storeData, getData, saveUser, getUser, getCoords } from './helpers/asyncHelper.js'

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
    let values = getCoords()
    setCoords(values)
  }

    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
          <TouchableOpacity onPress={() => setName("bob")}>
            <Text>This changes my userName to bob.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setName("zaire")}>
            <Text>This changes my userName to zaire.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => saveButton()}>
            <Text>This saves the current userName.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadButton()}>
            <Text>This gets the current userName when pressed. USERNAME NOW: {userName}</Text>
          </TouchableOpacity>


          <Link href="/page2" style={{paddingTop:20}}>view location page</Link>
          <TouchableOpacity >PRESS TO LOAD COORDINATES</TouchableOpacity>
          <Text>Last saved coordinates:{saved_coords}</Text>
      </View>
    </View>
  );
}
