import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveName = async (userName) => {
    try {
      await AsyncStorage.setItem("id", userName)
    } catch (e) {
      console.log("error has occured.")
    }
  }

export const getName = async () => {
    try {
      const userName = await AsyncStorage.getItem("id")
      if (userName !== null) {
        setName(userName)
      }
    } catch (e) {
      alert(e)
    }
  }