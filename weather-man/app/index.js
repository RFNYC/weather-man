import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { storeData, getData } from './helpers/asyncHelper.js'
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";


export default function MainComp() {

  const [userName, setName] = useState("balls");

  async function saveButton(){
    storeData(userName, "name-key")
    console.log("save attempted")
  }

  async function loadButton(){
    const name_check = await getData()
    console.log(name_check)
    console.log(await getData("name-key"))
    setName(name_check)
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
      </View>
    </View>
  );
}
