import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useDataStore} from '../../store';
import {BaseComponent, Channel} from '../../components';
import {SettingsParamList} from '../../navigation';
import {useModal, Modals} from '../../hooks';

type ChannelsScreenProp = NativeStackNavigationProp<
  SettingsParamList,
  'channels'
>;

export const Channels = observer(() => {
  const navigation = useNavigation<ChannelsScreenProp>();
  const {
    lightningStore,
    lightningStore: {channels},
  } = useDataStore();
  const {showModal} = useModal();

  useEffect(() => {
    lightningStore.getChannels();
  }, [lightningStore]);

  return (
    <BaseComponent>
      <TopNavigation
        title="Channels"
        alignment="center"
        accessoryLeft={() => (
          <TopNavigationAction
            onPress={() => navigation.goBack()}
            icon={<Icon name="arrow-ios-back-outline" />}
          />
        )}
        accessoryRight={() => (
          <TopNavigationAction
            onPress={() => showModal(Modals.ChannelDetailed)}
            icon={<Icon name="plus-outline" />}
          />
        )}
      />
      <Divider />
      <Layout>
        {channels?.map(chan => (
          <Channel key={chan.channel_id} channel={chan} />
        ))}
      </Layout>
    </BaseComponent>
  );
});
