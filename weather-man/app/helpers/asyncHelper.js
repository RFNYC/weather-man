// This file serves as a neat folder to tuck away code thats going to be reused.
// docs here: https://react-native-async-storage.github.io/async-storage/docs/usage
import AsyncStorage from '@react-native-async-storage/async-storage';


// "export" -- can be imported in other files
// This creates the storeData() function called in other files.
export const storeData = async (userName) => {
  try {
    await AsyncStorage.setItem('name-key', userName);
  } catch (e) {
    // saving error
  }
};


// Creates getData() function called in other files.
export const getData = async () => {
  try {
    const userName = await AsyncStorage.getItem('name-key');
    if (userName !== null) {
      return userName
    }
  } catch (e) {
    // error reading value
  }
};