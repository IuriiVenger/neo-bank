export type ValueWithLabel = {
  value: string;
  label: string;
};

export type WalletType = {
  [key: string]: ValueWithLabel;
};

export type HexColor = `#${string}`;
export type RGBAColor = `rgba(${string})`;
export type RGBColor = `rgb(${string})`;

type ChangeDashboardTabAdditionalParams = {
  wallet_uuid?: string;
  card_id?: string | null;
};

type WithOptionalAmount<T> = T & { amount?: number };

type TitleDescription<T = string, D = string> = { title: T; description: D };

type TitleShortitle<T = string, S = string> = { title: T; shortTitle: S };

type TitleDescriptionShortitle<T = string, D = string, S = string> = TitleDescription<T, D> & TitleShortitle<T, S>;

type TitleDescriptionValue<T = string, D = string, V = string> = TitleDescription<T, D> & { value: V };
