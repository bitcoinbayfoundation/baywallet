require('react-native-ui-lib/config').setConfig({ appScheme: 'dark' })
import { Colors } from 'react-native-ui-lib';
import React from 'react';
import { BayWalletProvider } from './BayWalletProvider';
import { BayWalletNavigator, OnboardNavigator } from './navigation';
const App = () => {
  return <OnboardNavigator />
  return (
    <BayWalletProvider>
      <BayWalletNavigator />
    </BayWalletProvider>
  );
};

/**
 * Theming
 */
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

export default App;


