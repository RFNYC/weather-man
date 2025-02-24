import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (userName) => {
  try {
    await AsyncStorage.setItem('name-key', userName);
  } catch (e) {
    // saving error
  }
};

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