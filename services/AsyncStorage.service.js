import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (id) => {
    try {
      const jsonValue = await AsyncStorage.getItem(id)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      throw new Error("Could not retrieve words!");
    }
};

const storeData = async (value, id) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(id, jsonValue)
    } catch (e) {
      throw new Error("Could not save word!");
    }
};

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      throw new Error("Unable to clear saved data!");
    }
  }

export default {
    getData,
    storeData,
    clearAll
}