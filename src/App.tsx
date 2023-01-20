import React from 'react';
import Home from './screens/Home';
import { BayWalletProvider } from './BayWalletProvider';
import { BayWalletNavigation } from './navigation';
const App = () => {

  return (
    <BayWalletProvider>
      <BayWalletNavigation />
    </BayWalletProvider>
  );
};

export default App;
