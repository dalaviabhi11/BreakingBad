import AsyncStorage from "@react-native-async-storage/async-storage"
import { debug, mydbg } from "./CommonFunctions"

export const setDataIntoStorage = async (key, value) => {
    try{
        if(typeof(value) === 'object') {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        }else {
            await AsyncStorage.setItem(key, value)
        }
    }catch(err) {
        if(debug) mydbg("Error while saving data in local storage :" + err)
    }
}

export const getDataFromStorage = async (key, type) => {
    try{
        if(type === 'object') {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }else {
            const value = await AsyncStorage.getItem(key)
            return value != null ? value : null
        }
    }catch(err) {
        if(debug) mydbg("Error while getting data from local storage :" + err)
    }
}

export const clearLocalStorage = () => {
    AsyncStorage.getAllKeys()
        .then(keys => {
            const keyArray = keys.length > 0 && keys.filter((item)=> item != 'isUserLoggedInBefore');
            AsyncStorage.multiRemove(keyArray)})
        .then(() => {});
}