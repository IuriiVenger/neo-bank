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
    foreground: '#1D2934', // Foreground
    foreground2: '#A6A7B8', // Foreground 2
    foreground3: '#FFFFFF', // Foreground 3
    foreground4: '#DAD9E0', // Foreground 4
    background: '#F5F5F5', // Background
    background2: '#FFFFFF', // Background 2
    background3: 'rgba(0, 0, 0, 0.07)', // Background 3 (7% opacity)
    background4: '#B1F1B4', // Background 4
  },
  [CustomTheme.DARK]: {
    foreground: '#FFFFFF', // Foreground
    foreground2: 'rgba(255, 255, 255, 0.5)', // Foreground 2 (50% opacity)
    foreground3: '#FFFFFF', // Foreground 3
    foreground4: '#93EAA7', // Foreground 4
    background: '#0C1418', // Background
    background2: '#121B28', // Background 2
    background3: '#1E3F3E', // Background 3
    background4: '#144226', // Background 4
  },
};

export const themes: Themes = {
  [CustomTheme.LIGHT]: {
    baseColors: { ...baseColorsTheme[CustomTheme.LIGHT] },
    brandColors: {
      primary: {
        DEFAULT: '#33A33A', // Primary color
        foreground: '#FFFFFF',
        50: '#f0f8f0',
        100: '#d0f0d0',
        200: '#b0e8b0',
        300: '#90e090',
        400: '#70d870',
        500: '#33A33A',
        600: '#2a822a',
        700: '#206020',
        800: '#174017',
        900: '#0d200d',
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
        DEFAULT: '#1AA020', // Primary color
        foreground: '#FFFFFF',
        50: '#e5f7e5',
        100: '#c0edc0',
        200: '#9be49b',
        300: '#76db76',
        400: '#51d251',
        500: '#1AA020',
        600: '#138014',
        700: '#0e600e',
        800: '#094008',
        900: '#042004',
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
        color: '#1AA020', // Primary button color
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
