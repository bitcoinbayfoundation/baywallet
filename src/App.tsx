import React from 'react';
import { BayWalletProvider } from './BayWalletProvider';
import { BayWalletNavigator } from './navigation';
const App = () => {

  return (
    <BayWalletProvider>
      <BayWalletNavigator />
    </BayWalletProvider>
  );
};

export default App;
