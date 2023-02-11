import {observer} from 'mobx-react';
import React, { useEffect, useState } from 'react';
import {Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from 'src/navigation/NavParamList';
import { useNavigation } from '@react-navigation/native';
import {Camera, useCameraDevices, CameraPermissionStatus} from "react-native-vision-camera"
type ScanScreenProp = NativeStackNavigationProp<NavParamList, 'scan'>

export const Scan = observer(() => {
  const navigation = useNavigation<ScanScreenProp>()
  const [permissions, setPermissions] = useState<boolean>(false)
  const devices = useCameraDevices()
  const device = devices.back
  

  useEffect(() => {
    getCameraPermission()
  }, [permissions])

  const getCameraPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus()

    if (cameraPermission !== "authorized") await Camera.requestCameraPermission()

    // if (cameraPermission.status !== 'granted') {
    //   alert('Permission for camera access needed to scan invoices.');
    // }
  };

  if (devices.back === undefined) return <Layout style={{height: "100%"}}><Text>NO DEVICE!</Text></Layout>
  return (
    <BaseComponent>
      <Camera device={device} isActive={true} style={{width: "100%", height: "100%"}} />
    </BaseComponent>
  );
});
