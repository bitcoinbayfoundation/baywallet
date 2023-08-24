require('react-native-ui-lib/config').setConfig({ appScheme: 'dark' })
import { Colors } from 'react-native-ui-lib';
import React, { useCallback } from 'react';
import { BayWalletProvider } from './BayWalletProvider';
import { LightningNodeProvider } from "./hooks";
import { BayWalletNavigator, OnboardNavigator } from './navigation';
import { BaseComponent, Loading } from './components';
import { useDataStore } from './store';
import { observer } from 'mobx-react';
import { NDKProvider } from '@nostr-dev-kit/ndk-react';

const AppNavigator = observer(() => {
  const { onboardingStore: { done } } = useDataStore()

 const AppRoot = useCallback(() => {
    if (done === undefined) {
      return (
        <BaseComponent>
          <Loading />
        </BaseComponent>
      )
    }

    if (!done) return <OnboardNavigator />

    return (
      <NDKProvider
        relayUrls={[
          "wss://relay.damus.io",
          "wss://relay.snort.social",
          "wss://purplepag.es",
        ]}
      >
        <LightningNodeProvider>
          <BayWalletNavigator />
        </LightningNodeProvider>
      </NDKProvider>
    )

  }, [done])

  return <AppRoot />
})

const App = () => {
  return (
    <BayWalletProvider>
      <AppNavigator />
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


