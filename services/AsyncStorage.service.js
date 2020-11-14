import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (id) => {
    try {
      const jsonValue = await AsyncStorage.getItem(id)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log("could not retrieve: ", e);
    }
};

const storeData = async (value, id) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(id, jsonValue)
    } catch (e) {
      console.log("could not save: ", e);
    }
};

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log("unable to clear!", e);
    }
    console.log('Done.')
  }

export default {
    getData,
    storeData,
    clearAll
}