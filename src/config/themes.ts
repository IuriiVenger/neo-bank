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
    foreground: '#1D2934',
    foreground2: '#6A6C7B',
    foreground3: '#FFFFFF',
    foreground4: '#1D5920',
    background: '#F5F5F5',
    background2: '#FFFFFF',
    background3: 'rgba(0, 0, 0, 0.07)',
    background4: '#B1F1B4',
  },
  [CustomTheme.DARK]: {
    foreground: '#FFFFFF',
    foreground2: 'rgba(255, 255, 255, 0.5)',
    foreground3: '#FFFFFFF',
    foreground4: '#93EA97',
    background: '#0C141B',
    background2: '#121E28',
    background3: '#1E2F3E',
    background4: '#144226',
  },
};

export const themes: Themes = {
  // use https://smart-swatch.netlify.app/#000000 for generate color palette
  [CustomTheme.LIGHT]: {
    baseColors: { ...baseColorsTheme[CustomTheme.LIGHT] },
    brandColors: {
      primary: {
        DEFAULT: '#33BA39',
        foreground: '#FFFFFF',
        50: '#e4fde6',
        100: '#bff0c2',
        200: '#99e49c',
        300: '#72d976',
        400: '#4bce51',
        500: '#31b437',
        600: '#248c2a',
        700: '#17641d',
        800: '#093d0e',
        900: '#001600',
      },
      secondary: {
        DEFAULT: '#88919B',
        foreground: '#FFFFFF',
        50: '#e9f3fe',
        100: '#d0dae1',
        200: '#b8bfc8',
        300: '#9da5ae',
        400: '#828c96',
        500: '#69727d',
        600: '#515962',
        700: '#383f47',
        800: '#20262e',
        900: '#020e17',
      },
      danger: {
        DEFAULT: '#F10000',
        foreground: '#FFFFFF',
        50: '#ffe1e1',
        100: '#ffb1b1',
        200: '#ff7f7f',
        300: '#ff4c4c',
        400: '#ff1a1a',
        500: '#e60000',
        600: '#b40000',
        700: '#810000',
        800: '#500000',
        900: '#210000',
      },
      success: {
        DEFAULT: '#1BBA51',
        foreground: '#FFFFFF',
        50: '#e0ffea',
        100: '#b7f6ce',
        200: '#8df0af',
        300: '#61e88f',
        400: '#37e271',
        500: '#1dc857',
        600: '#129c43',
        700: '#086f2e',
        800: '#00441a',
        900: '#001804',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#000000', // primary color
        textColor: '#FFFFFF', // primary foreground
        disabledColor: '#A1A1AA', // secondary color
      },
    },
  },
  [CustomTheme.DARK]: {
    baseColors: { ...baseColorsTheme[CustomTheme.DARK] },
    brandColors: {
      primary: {
        DEFAULT: '#1AA020',
        foreground: '#111315',
        50: '#e3fde4',
        100: '#baf5be',
        200: '#90ed94',
        300: '#65e66b',
        400: '#3cdf42',
        500: '#24c529',
        600: '#199a1f',
        700: '#0f6e15',
        800: '#05420a',
        900: '#001800',
      },
      secondary: {
        DEFAULT: 'rgba(255, 255, 255, 0.20)',
        foreground: '#FFFFFF',
        50: '#f2f2f233',
        100: '#d9d9d933',
        200: '#bfbfbf33',
        300: '#a6a6a633',
        400: '#8c8c8c33',
        500: '#73737333',
        600: '#59595933',
        700: '#40404033',
        800: '#26262633',
        900: '#0d0d0d33',
      },
      danger: {
        DEFAULT: '#F10000',
        foreground: '#FFFFFF',
        50: '#ffe1e1',
        100: '#ffb1b1',
        200: '#ff7f7f',
        300: '#ff4c4c',
        400: '#ff1a1a',
        500: '#e60000',
        600: '#b40000',
        700: '#810000',
        800: '#500000',
        900: '#210000',
      },
      success: {
        DEFAULT: '#1BBA51',
        foreground: '#FFFFFF',
        50: '#e0ffea',
        100: '#b7f6ce',
        200: '#8df0af',
        300: '#61e88f',
        400: '#37e271',
        500: '#1dc857',
        600: '#129c43',
        700: '#086f2e',
        800: '#00441a',
        900: '#001804',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#1AA020', // primary color
        textColor: '#111315', // primary foreground
        disabledColor: '#A1A1AA', // secondary color
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
