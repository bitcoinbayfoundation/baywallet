import React, { useEffect, useState } from 'react';
import { View } from 'react-native-ui-lib';
import { BaseComponent, Button, LargeText } from '../../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardParamList } from '../../navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { VerifyProfile } from '../../components/nostr';
import { nip19 } from 'nostr-tools';
import { useDataStore } from '../../store';
import { NostrKeys } from '../../types/nostr';
import { observer } from 'mobx-react';

type VerifyNostrProfileScreenProps = NativeStackNavigationProp<
  OnboardParamList,
  'verify-nostr-profile'
>;

type VerifyNostrProfileProps = {
  route?: RouteProp<OnboardParamList, 'verify-nostr-profile'>;
};

export const VerifyNostrProfile = observer((props: VerifyNostrProfileProps) => {
  const navigation = useNavigation<VerifyNostrProfileScreenProps>();
  const { nostrKeyStore } = useDataStore()
  const [newKeys, setNewKeys] = useState<NostrKeys>()

  const { privatekey } = props.route.params;

  const privkey = privatekey.startsWith('nsec')
    ? (nip19.decode(privatekey).data as string)
    : privatekey;

  useEffect(() => {
    const generateKeys = async () => {
      const keys = await nostrKeyStore.getKeysOrGenerate(privkey)
      setNewKeys(keys)
    }
    generateKeys()
  }, [])

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <View centerH>
          <LargeText content="Is this you?" styles={{ marginBottom: 20 }} />
          <VerifyProfile pubkey={newKeys?.pubkey} />
        </View>
        <View height={100} style={styles.buttons}>
          <Button
            label="Yes!"
            size="large"
            onPress={() => {
              nostrKeyStore.saveNostrKeys(newKeys);
              navigation.navigate('lightning-introduction');
            }}
          />
          <Button
            label="Nope"
            size="large"
            onPress={() => navigation.navigate('nostr-login')}
            inverted
          />
        </View>
      </View>
    </BaseComponent>
  );
});
