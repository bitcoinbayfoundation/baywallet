import {TInvoice} from '@synonymdev/react-native-ldk';

export type InvoiceScreenProps = {
  invoice: TInvoice;
};

export type PayScreenProps = {
  payReq: string;
};

export type NavParamList = {
  home: undefined;
  settings: undefined;
  receive: undefined;
  scan: undefined;
  invoice: InvoiceScreenProps;
  pay: PayScreenProps;
};
