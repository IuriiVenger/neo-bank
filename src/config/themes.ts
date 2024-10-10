import { CustomTheme } from '../constants';
import { HexColor, RGBAColor, RGBColor } from '../types';

// export const lightMainTelegramButtonColor = '#0088cc';
// export const lightDisabledTelegramButtonColor = '#b0b0b0';
// export const lightPrimaryColor = '#000000';
// export const lightDefaultColor = '#F2F2F2';
// export const lightSecondaryColor = '#FFFFFF';
// export const lightForegroundColor = '#000000';
// export const lightDefaultForegroundColor = '#000000';

type BaseColorsKeys =
  | 'foreground'
  | 'foreground2'
  | 'foreground3'
  | 'foreground4'
  | 'background'
  | 'background2'
  | 'background3'
  | 'background4';

type BaseColors = Record<BaseColorsKeys, HexColor | RGBAColor | RGBColor> & { background: HexColor };

type BrandColorsKeys = 'primary' | 'secondary' | 'danger' | 'success';
type BrandColorsValues =
  | 'DEFAULT'
  | 'foreground'
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type BrandColors = {
  [key in BrandColorsKeys]: {
    [k in BrandColorsValues]: HexColor | RGBAColor | RGBColor;
  };
};

type TelegramColors = {
  mainButton: {
    color: HexColor;
    textColor: HexColor;
    disabledColor: HexColor;
  };
};

export type Theme = {
  baseColors: BaseColors;
  brandColors: BrandColors;
  telegramColors: TelegramColors;
};

export type Themes = {
  [key in CustomTheme]: Theme;
};

export const baseColorsTheme: Record<CustomTheme, BaseColors> = {
  [CustomTheme.LIGHT]: {
    foreground: '#282B32', // Foreground
    foreground2: '#88919B', // Foreground 2
    foreground3: '#FFFFFF', // Foreground 3
    foreground4: '#FFFFFF', // Foreground 4
    background: '#F2F2F2', // Background
    background2: '#FFFFFF', // Background 2
    background3: 'rgba(0, 0, 0, 0.07)', // Background 3 (7% opacity)
    background4: '#88919B', // Background 4
  },
  [CustomTheme.DARK]: {
    foreground: '#FFFFFF', // Foreground
    foreground2: '#71717A', // Foreground 2
    foreground3: '#FFFFFF', // Foreground 3
    foreground4: '#FFFFFF', // Foreground 4
    background: '#0C101F', // Background
    background2: '#1C1D1F', // Background 2
    background3: '#383B3B', // Background 3
    background4: '#4C4C4C', // Background 4
  },
};

export const themes: Themes = {
  [CustomTheme.LIGHT]: {
    baseColors: { ...baseColorsTheme[CustomTheme.LIGHT] },
    brandColors: {
      primary: {
        DEFAULT: '#D90D10', // Primary color
        foreground: '#FFFFFF',
        50: '#fde8e8',
        100: '#f6b4b4',
        200: '#f07a7a',
        300: '#e93e3e',
        400: '#d90d10',
        500: '#b10a0c',
        600: '#870808',
        700: '#5d0506',
        800: '#350303',
        900: '#1a0101',
      },
      secondary: {
        DEFAULT: '#88919B', // Secondary color
        foreground: '#FFFFFF',
        50: '#f2f3f5',
        100: '#d9dde1',
        200: '#c0c6cd',
        300: '#88919B',
        400: '#5e6d78',
        500: '#4c5a63',
        600: '#3b4750',
        700: '#2a353d',
        800: '#19232a',
        900: '#0a1018',
      },
      danger: {
        DEFAULT: '#F10000', // Danger color
        foreground: '#FFFFFF',
        50: '#ffe5e5',
        100: '#fbbfbf',
        200: '#f79898',
        300: '#f16565',
        400: '#f10000',
        500: '#d00000',
        600: '#a00000',
        700: '#700000',
        800: '#400000',
        900: '#200000',
      },
      success: {
        DEFAULT: '#1BAA51', // Success color
        foreground: '#FFFFFF',
        50: '#e4f8ed',
        100: '#b6e9cd',
        200: '#89d9ac',
        300: '#5bc98c',
        400: '#1BAA51',
        500: '#0c8a42',
        600: '#07672e',
        700: '#05451b',
        800: '#022208',
        900: '#000000',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#D90D10', // Primary button color
        textColor: '#FFFFFF', // Button text color
        disabledColor: '#88919B', // Disabled button color
      },
    },
  },
  [CustomTheme.DARK]: {
    baseColors: { ...baseColorsTheme[CustomTheme.DARK] },
    brandColors: {
      primary: {
        DEFAULT: '#D90D10', // Primary color
        foreground: '#FFFFFF',
        50: '#fde8e8',
        100: '#f6b4b4',
        200: '#f07a7a',
        300: '#e93e3e',
        400: '#d90d10',
        500: '#b10a0c',
        600: '#870808',
        700: '#5d0506',
        800: '#350303',
        900: '#1a0101',
      },
      secondary: {
        DEFAULT: '#71717A', // Secondary color
        foreground: '#FFFFFF',
        50: '#f1f2f2',
        100: '#d8d9da',
        200: '#bfc0c1',
        300: '#9b9d9e',
        400: '#71717A',
        500: '#4a4b4c',
        600: '#333536',
        700: '#1a1c1e',
        800: '#0c0f11',
        900: '#000203',
      },
      danger: {
        DEFAULT: '#F10000', // Danger color
        foreground: '#FFFFFF',
        50: '#ffe5e5',
        100: '#fbbfbf',
        200: '#f79898',
        300: '#f16565',
        400: '#f10000',
        500: '#d00000',
        600: '#a00000',
        700: '#700000',
        800: '#400000',
        900: '#200000',
      },
      success: {
        DEFAULT: '#1BAA51', // Success color
        foreground: '#FFFFFF',
        50: '#e4f8ed',
        100: '#b6e9cd',
        200: '#89d9ac',
        300: '#5bc98c',
        400: '#1BAA51',
        500: '#0c8a42',
        600: '#07672e',
        700: '#05451b',
        800: '#022208',
        900: '#000000',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#D90D10', // Primary button color
        textColor: '#FFFFFF', // Button text color
        disabledColor: '#71717A', // Disabled button color
      },
    },
  },
};

export const layout = {
  radius: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
};
// export const themeIllustrations = {
//   emptyState: {
//     cards: {
//       lightSrc: cardsEmptyStateLight?.src,
//       darkSrc: cardsEmptyStateDark?.src,
//     },
//     transactions: {
//       lightSrc: transactionsEmptyStateLight?.src,
//       darkSrc: transactionsEmptyStateDark?.src,
//     },
//     wallet: {
//       lightSrc: walletEmptyStateLight?.src,
//       darkSrc: walletEmptyStateDark?.src,
//     },
//   },
// };
