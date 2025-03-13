// This file serves as a neat folder to tuck away code thats going to be reused.
// docs here: https://react-native-async-storage.github.io/async-storage/docs/usage
import AsyncStorage from '@react-native-async-storage/async-storage';


// "export" -- can be imported in other files
// This creates the storeUser() function called in other files.
export const saveUser = async (userName) => {
  try {
    await AsyncStorage.setItem('id', userName)
  } catch(e) {
    // save error
  }

  console.log('Name saved.')
}


// Creates getData() function called in other files.
export const getUser = async () => {
  try {
    const userName = await AsyncStorage.getItem('id')
    if (userName !== null) {
      return userName
    }
  } catch(e) {
    // read error
  }

  console.log('Done.')
}


export const storeDataCoords = async (latitude, longitude) => {
 
    const firstPair = ["@latitude", `${latitude}`]
    const secondPair = ["@longitude", `${longitude}`]

    try {
      await AsyncStorage.multiSet([firstPair, secondPair])
    } catch(e) {
      //save error
    }
  
    console.log("Done.")
  }


export const getCoords = async () => {

  let response
  try {
    //returns a promise which once resolved has an array of last saved coordinates
    response = AsyncStorage.multiGet(['@latitude', '@longitude'])
    return(
      response
    )
  } catch(e) {
    // read error
  }
  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}
