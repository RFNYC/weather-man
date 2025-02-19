import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { saveName, getName } from './helpers/asyncHelper.js'


export default function Index() {

  const [userName, setName] = useState("");

  useEffect(() => {
    console.log("the current userName is", userName)
  }, [userName]);

  useEffect(() => {
    getName()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
          <Text>My userName right now is {userName}</Text>
          <TouchableOpacity onPress={() => setName("bob")}>
            <Text>This changes my userName to bob.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setName("zaire")}>
            <Text>This changes my userName to zaire.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => saveName()}>
            <Text>This saves the current userName.</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
