export type InvoiceScreenProps = {
  payReq: string
  amount: string
  description?: string
}

export type PayScreenProps = {
  payReq: string
}

export type NavParamList = {
  home: undefined
  settings: undefined
  receive: undefined
  scan: undefined
  invoice: InvoiceScreenProps
  pay: PayScreenProps
}