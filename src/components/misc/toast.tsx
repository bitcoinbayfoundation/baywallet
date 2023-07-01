import { useTheme } from "@ui-kitten/components"
import React from "react"
import Toast, { BaseToast } from "react-native-toast-message"

const theme = useTheme()

export const toastConfig =  {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#01065A", top: 2 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
}