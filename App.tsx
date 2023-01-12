import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { getBlockHeader } from './src/blocks/mempool';
import { createNewAccount, getAccount } from './src/accounts';

const App = () => {
  const [nodeStarted, setNodeStarted] = useState(true);
  const [account, setAccount] = useState({name: "", seed: ""})

  const findAccount = async () => {
    const existingAccount = await getAccount()
    console.log("USING EXISTING ACCOUNT", existingAccount)
    if (existingAccount) setAccount({name: existingAccount.name, seed: existingAccount.seed})
    const newAccount = await createNewAccount()
    console.log("CREATED NEW ACCOUNT", newAccount)
    setAccount({name: newAccount.name, seed: newAccount.seed})
  }
  useEffect(() => {
    findAccount()
  }, [])

  // Query for new blocks every minute and store them.
  useEffect(() => {
    if (!nodeStarted) return
    let interval: NodeJS.Timer

    getBlockHeader()
    interval = setInterval(() => {
      getBlockHeader()
    }, 60000)

    return () => clearInterval(interval)
  }, [nodeStarted])

  return (
    <SafeAreaView>
        <Text style={{textAlign: "center", paddingTop: "10%"}}>heyhowareya</Text>
        <Text style={{textAlign: "center", padding: "5%"}}>{`Account name: ${account.name}`}</Text>
        <Button onPress={() => setNodeStarted(false)} title="Stop node" />
    </SafeAreaView>
  );
};

export default App;
