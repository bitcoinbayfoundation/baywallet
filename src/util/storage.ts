import AsyncStorage from "@react-native-async-storage/async-storage"
// import { MMKV } from 'react-native-mmkv'

// export const storage = new MMKV()

export const setItem = async (key:string, value:any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    return false
  }
}

export const getItem = async <T>(key:string): Promise<any> => {
  try {
    const item = await AsyncStorage.getItem(key)
    return <T>item
  } catch (e) {
    return false
  }
}