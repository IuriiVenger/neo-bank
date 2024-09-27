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
    foreground: '#000000',
    foreground2: '#71717A',
    foreground3: '#FFFFFF',
    foreground4: '#FFFFFF',
    background: '#F2F2F2',
    background2: '#FFFFFF',
    background3: 'rgba(0, 0, 0, 0.07)',
    background4: '#A1A1AA',
  },
  [CustomTheme.DARK]: {
    foreground: '#FFFFFF',
    foreground2: '#71717A',
    foreground3: '#000000',
    foreground4: '#FFFFFF',
    background: '#000000',
    background2: '#171717',
    background3: '#3B3B3B',
    background4: '#4C4C4C',
  },
};

export const themes: Themes = {
  // use https://smart-swatch.netlify.app/#000000 for generate color palette
  [CustomTheme.LIGHT]: {
    baseColors: { ...baseColorsTheme[CustomTheme.LIGHT] },
    brandColors: {
      primary: {
        DEFAULT: '#000000',
        foreground: '#FFFFFF',
        50: '#f2f2f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#0d0d0d',
      },
      secondary: {
        DEFAULT: '#A1A1AA',
        foreground: '#FFFFFF',
        50: '#f1f2fc',
        100: '#d7d7df',
        200: '#bcbcc3',
        300: '#a1a1aa',
        400: '#868691',
        500: '#6d6d78',
        600: '#55555e',
        700: '#3d3d44',
        800: '#24242b',
        900: '#0b0b15',
      },
      danger: {
        DEFAULT: '#E2231A',
        foreground: '#FFFFFF',
        50: '#ffe5e4',
        100: '#fcbbb8',
        200: '#f4908c',
        300: '#ee645e',
        400: '#e73931',
        500: '#ce2018',
        600: '#a11711',
        700: '#730f0b',
        800: '#480705',
        900: '#1f0000',
      },
      success: {
        DEFAULT: '#17C964',
        foreground: '#FFFFFF',
        50: '#deffed',
        100: '#b5f8d3',
        200: '#8af3b7',
        300: '#5ded9b',
        400: '#31e780',
        500: '#18ce66',
        600: '#0ca04f',
        700: '#037238',
        800: '#004620',
        900: '#001905',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#000000',
        disabledColor: '#A1A1AA',
      },
    },
  },
  [CustomTheme.DARK]: {
    baseColors: { ...baseColorsTheme[CustomTheme.DARK] },
    brandColors: {
      primary: {
        DEFAULT: '#FFFFFF',
        foreground: '#000000',
        50: '#f2f2f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#0d0d0d',
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
        DEFAULT: '#E2231A',
        foreground: '#FFFFFF',
        50: '#ffe5e4',
        100: '#fcbbb8',
        200: '#f4908c',
        300: '#ee645e',
        400: '#e73931',
        500: '#ce2018',
        600: '#a11711',
        700: '#730f0b',
        800: '#480705',
        900: '#1f0000',
      },
      success: {
        DEFAULT: '#17C964',
        foreground: '#FFFFFF',
        50: '#deffed',
        100: '#b5f8d3',
        200: '#8af3b7',
        300: '#5ded9b',
        400: '#31e780',
        500: '#18ce66',
        600: '#0ca04f',
        700: '#037238',
        800: '#004620',
        900: '#001905',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#FFFFFF',
        disabledColor: '#A1A1AA',
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
