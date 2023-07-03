import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextField, NumberInput, View } from 'react-native-ui-lib';
import { BaseComponent, Button, LargeText } from '../../components';
import { LightningParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import { useDataStore } from '../../store';
import { StyleSheet } from 'react-native';

type CreateInvoiceScreenProps = NativeStackNavigationProp<LightningParamList, 'create-invoice'>

export const CreateInvoice = observer(() => {
  const navigation = useNavigation<CreateInvoiceScreenProps>()
  const { lightningStore } = useDataStore()
  const [amount, setAmount] = useState<any>("")
  const [description, setDescription] = useState(null)

  return (
    <BaseComponent>
      <View style={styles.container}>
        <View>
          <NumberInput
            placeholder="0"
            placeholderTextColor="#888"
            trailingText='sats'
            trailingTextStyle={styles.sats}
            style={styles.amount}
            // autoFocus={true}
            initialValue={0}
            onChangeNumber={change => setAmount(change.number)}
          />
          <TextField
            style={styles.description}
            placeholder='Bay Wallet Invoice'
            placeholderTextColor="#444"
            label='Description (optional)'
            labelStyle={styles.label}
            value={description}
            onChange={change => setDescription(change.nativeEvent.text)}
          />
        </View>
        <Button
          label='Create Invoice'
          size='large'
          onPress={async () => {
            const invoice = await lightningStore.createInvoice(Number(amount), description ?? "Bay Wallet Invoice")
            navigation.navigate("receive", { invoice: invoice })
          }}
        />
      </View>
    </BaseComponent>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 150,
    paddingBottom: 20,
  },
  amount: {
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 20
  },
  sats: {
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 5
  },
  description: {
    fontSize: 25,
    width: "100%",
    paddingLeft: 20
  },
  label: {
    paddingLeft: 20,
    marginTop: 20
  }
})
