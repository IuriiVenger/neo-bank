import { CustomTheme } from '../constants';
import { HexColor, RGBAColor, RGBColor } from '../types';

export const lightMainTelegramButtonColor = '#0088cc';
export const lightDisabledTelegramButtonColor = '#b0b0b0';
export const lightPrimaryColor = '#000000';
export const lightDefaultColor = '#F2F2F2';
export const lightSecondaryColor = '#FFFFFF';
export const lightForegroundColor = '#000000';
export const lightDefaultForegroundColor = '#000000';

type BaseColors = {
  foreground: HexColor | RGBAColor | RGBColor;
  foreground2: HexColor | RGBAColor | RGBColor;
  foreground3: HexColor | RGBAColor | RGBColor;
  background: HexColor | RGBAColor | RGBColor;
  background2: HexColor | RGBAColor | RGBColor;
  background3: HexColor | RGBAColor | RGBColor;
};

type BrandColors = {
  primary: {
    DEFAULT: HexColor | RGBAColor | RGBColor;
    foreground: HexColor | RGBAColor | RGBColor;
  };
  secondary: {
    DEFAULT: HexColor | RGBAColor | RGBColor;
    foreground: HexColor | RGBAColor | RGBColor;
  };
  danger: {
    DEFAULT: HexColor | RGBAColor | RGBColor;
    foreground: HexColor | RGBAColor | RGBColor;
  };
  success: {
    DEFAULT: HexColor | RGBAColor | RGBColor;
    foreground: HexColor | RGBAColor | RGBColor;
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

export const themes: Themes = {
  [CustomTheme.LIGHT]: {
    baseColors: {
      foreground: '#000000',
      foreground2: '#71717A',
      foreground3: '#FFFFFF',
      background: '#F2F2F2',
      background2: '#FFFFFF',
      background3: '#rgba(0, 0, 0, 0.07)',
    },
    brandColors: {
      primary: {
        DEFAULT: '#000000',
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#A1A1AA',
        foreground: '#FFFFFF',
      },
      danger: {
        DEFAULT: '#E2231A',
        foreground: '#FFFFFF',
      },
      success: {
        DEFAULT: '#17C964',
        foreground: '#FFFFFF',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#0088CC',
        disabledColor: '#B0B0B0',
      },
    },
  },
  [CustomTheme.DARK]: {
    baseColors: {
      foreground: '#000000',
      foreground2: '#71717A',
      foreground3: '#FFFFFF',
      background: '#F2F2F2',
      background2: '#FFFFFF',
      background3: '#rgba(0, 0, 0, 0.07)',
    },
    brandColors: {
      primary: {
        DEFAULT: '#000000',
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#A1A1AA',
        foreground: '#FFFFFF',
      },
      danger: {
        DEFAULT: '#E2231A',
        foreground: '#FFFFFF',
      },
      success: {
        DEFAULT: '#17C964',
        foreground: '#FFFFFF',
      },
    },
    telegramColors: {
      mainButton: {
        color: '#0088CC',
        disabledColor: '#B0B0B0',
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
