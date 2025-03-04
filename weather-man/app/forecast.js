import React, { useEffect, useState } from "react";
import { Link } from 'expo-router'
import { Button, Text, TouchableOpacity, View, PermissionsAndroid } from "react-native";
import { storeData, getData, saveUser, getUser, getCoords } from './helpers/asyncHelper.js'

export default function MainComp() {

  // Creates Placeholder username. Can be changed via setName(x).
  const [userName, setName] = useState("User");
  const [saved_coords, setCoords] = useState("Loading...");
  const [day_part, setDayPart] = useState("Loading...")

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

  // Not in use.
  async function loadCoordinates(){
    let values = getCoords()
    let fetchedCoordinates = await values
    let latitude = fetchedCoordinates[0][1]
    let longitude = fetchedCoordinates[1][1]

    const coords = `${latitude},${longitude}`
    setCoords(coords)
  }

  // Loads last saved location via async storage.
  // Passes location to api as part of its query. Returns weather data based on the location.
  useEffect(() => {
    async function loadPage() {
      let testCoords = '44.3294,-74.1318'

      let values = getCoords()
      let fetchedCoordinates = await values
      let latitude = fetchedCoordinates[0][1]
      let longitude = fetchedCoordinates[1][1]

      const coords = `${latitude},${longitude}`
      setCoords(coords)

      let alertsURL = `https://api.weather.gov/alerts/active?point=${testCoords}`

      await fetch(alertsURL)
      .then(response => response.json())
      .then((data) => {
        let warning = data['features']
        console.log(warning)
        if (warning.length == 0) {
          console.log("No relevant weather warnings detected.")
        }
      })

      let coordinateUrl
      console.log(coords)
      coordinateUrl = `https://api.weather.gov/points/${coords}`

      await fetch(coordinateUrl)
      .then(response => response.json())
      .then(async (data) => {
        let properties = data['properties']
        let nightlyURL = properties['forecast']
        let hourlyURL = properties['forecastHourly']
        
        await fetch(nightlyURL)
        .then(response => response.json())
        .then((data) => {
          let nightlyProperties = data['properties']
          let tonight = nightlyProperties['periods'][1]
          let precipitation = tonight['probabilityOfPrecipitation']
          if (precipitation['value'] == 0 || precipitation['value'] == null) {
            console.log("no precipitation tonight")
          } else {
            console.log(`Chance of precipitation: %${precipitation['value']}.`)
          }
          console.log(tonight)
        })

        await fetch(hourlyURL)
        .then(response => response.json())
        .then((data) => {
          let hourlyProperties = data['properties']
          let hour = hourlyProperties['periods'][0]
          let precipitation = hour['probabilityOfPrecipitation']
          let isDayTime = hour['isDaytime']
          if (isDayTime == true) {
            console.log('Day Time')
          } else {
            console.log('Night Time')
          }
          if (precipitation['value'] == 0 || precipitation['value'] == null) {
            console.log("no precipitation right now")
          } else {
            console.log(`Chance of precipitation: %${precipitation['value']}.`)
          }
          console.log(hour)
        })
      })
    }
    
    loadPage()
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
        <Text>Forcast:</Text>
        <Text>You're here: {saved_coords}</Text>
      </View>
    </View>
  );
}
