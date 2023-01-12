import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
// import {
// 	getBlockHashFromHeight,
// 	getBlockHeader,
// 	getBlockHex,
// 	getScriptPubKeyHistory,
// } from '../electrum';
import lm, {
	DefaultTransactionDataShape,
	TAccount,
	TAccountBackup,
	THeader,
	TTransactionData,
	TTransactionPosition,
} from '@synonymdev/react-native-ldk';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';
// import {
// 	getAccount,
// 	getAddress,
// 	getNetwork,
// 	ldkNetwork,
// 	setAccount,
// } from '../utils/helpers';
// import { EAccount } from '../utils/types';
import * as bitcoin from 'bitcoinjs-lib';