export type BayWalletSettings = {
  hideBalance: boolean;
  usd: boolean;
};

export const defaultSettings: BayWalletSettings = {
  hideBalance: false,
  usd: false,
};

export type SettingsKey = 'hideBalance' | 'usd';
