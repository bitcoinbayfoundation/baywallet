import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { BaseComponent, Button, LargeText } from '../../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardParamList } from '../../navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { VerifyProfile } from '../../components/nostr';
import { useNostrKeys } from '../../hooks';
import { nip19 } from 'nostr-tools';

type VerifyNostrProfileScreenProps = NativeStackNavigationProp<
  OnboardParamList,
  'verify-nostr-profile'
>;

type VerifyNostrProfileProps = {
  route?: RouteProp<OnboardParamList, 'verify-nostr-profile'>;
};

export const VerifyNostrProfile = (props: VerifyNostrProfileProps) => {
  const navigation = useNavigation<VerifyNostrProfileScreenProps>();
  const { privatekey } = props.route.params;
  const privkey = privatekey.startsWith('nsec')
    ? (nip19.decode(privatekey).data as string)
    : privatekey;
  const { nostrKeys, saveKeys } = useNostrKeys(privkey);

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <View centerH>
          <LargeText content="Is this you?" styles={{ marginBottom: 20 }} />
          <VerifyProfile pubkey={nostrKeys?.pubkey} />
        </View>
        <View height={100} style={styles.buttons}>
          <Button
            label="Yes!"
            size="large"
            onPress={() => {
              saveKeys();
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
};
