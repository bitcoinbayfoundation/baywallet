import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key:string, value:any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    return false
  }
}

export const getItem = async <T>(key:string): Promise<T> => {
  try {
    const item = await AsyncStorage.getItem(key)
    return <T>item
  } catch (e) {
    console.error(`NO ${key} IN LOCAL STORAGE`, e)
  }
}