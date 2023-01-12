import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key:string, value:string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    return false
  }
}

export const getItem = async (key:string): Promise<any> => {
  try {
    const item = await AsyncStorage.getItem(key)
    return item
  } catch (e) {
    console.error("NO ITEM", e)
    return false
  }
}