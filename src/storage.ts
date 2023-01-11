import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key:string, value:string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    return false
  }
}

export const getItem = async (key:string): Promise<string> => {
  const value = await AsyncStorage.getItem(key)
  if (!value) return ""
  return value
}