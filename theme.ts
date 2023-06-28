import {Colors} from "react-native-ui-lib"

Colors.loadColors({
  error: "#FF391A",
  success: "#1AFF57",
  primary: "#FF581A",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#000000",
})

Colors.loadSchemes({
  light: {
    primary: Colors.primary,
    screenBG: Colors.backgroundLight,
    text: Colors.black,
    button: Colors.primary
  },
  dark: {
    primary: Colors.primary,
    screenBG: Colors.backgroundDark,
    text: Colors.white,
    button: Colors.primary
  }
})

const AZURE_BLUE = "#3393FF"
const AZURE_BLUE_DARK_BG = "#000431"
const CESTASIAN_BLUE = "#01065A"
const PANTONE_BLUE = "#021CA4"
const BRANDEIS_BLUE = "#0275F4"
const WHITE = "#F5FAFF"

export const colors = {
  "white": WHITE,
  "off-white": "#555",
  "color-basic-100": WHITE, // Font color
  "color-basic-200": AZURE_BLUE,
  "color-basic-300": AZURE_BLUE,
  "color-basic-400": AZURE_BLUE,
  "color-basic-500": AZURE_BLUE,
  "color-basic-600": WHITE, // Bottom tabs
  "color-basic-700": CESTASIAN_BLUE,
  "color-basic-800": AZURE_BLUE_DARK_BG, // Dark theme background
  "color-basic-900": AZURE_BLUE_DARK_BG,
  "color-basic-1000": AZURE_BLUE_DARK_BG,
  "color-basic-1100": AZURE_BLUE_DARK_BG,
  "color-primary-default-border": AZURE_BLUE,
  "background-basic-color-1": AZURE_BLUE_DARK_BG // Dark theme background
}

/**
 * Comonents i need to theme
 *  Radio buttons
 */