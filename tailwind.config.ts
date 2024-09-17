/* eslint-disable func-names */
import { nextui } from '@nextui-org/react';

import { themes, layout } from './src/config/themes';

import { genereateTailwindThemeClasses } from './src/utils/helpers';

import type { Config } from 'tailwindcss';

const customBlueGradient = 'linear-gradient(125deg, #71A9ED 0%, #436CB6 100%)';
const customLavanderGradient = 'linear-gradient(32.49deg, rgba(255, 255, 255, 1) 0.15%, rgba(183, 182, 255, 0.2) 100%)';
const cardBlueGradient =
  'radial-gradient(104.12% 134.72% at -3.11% -1.41%, rgba(177, 180, 206, 0.24) 0%, rgba(177, 180, 206, 0.00) 100%), linear-gradient(153deg, #2460A8 -17.53%, #5594DF 103.31%)';
const cardTurquoiseGradient =
  'radial-gradient(104.12% 134.72% at -3.11% -1.41%, rgba(177, 180, 206, 0.24) 0%, rgba(177, 180, 206, 0.00) 100%), linear-gradient(153deg, #3EA5A5 -17.53%, #75D4D4 103.31%)';
const cardGreyGradient =
  'radial-gradient(82.2% 82.88% at 0% 9.77%, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(104.12% 134.72% at -3.11% -1.41%, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(124deg, rgba(203, 205, 204, 0.80) 20.08%, rgba(188, 188, 188, 0.80) 140.46%)';
const cardLavanderGradient =
  'radial-gradient(104.12% 134.72% at -3.11% -1.41%, rgba(177, 180, 206, 0.24) 0%, rgba(177, 180, 206, 0.00) 100%), linear-gradient(153deg, #878EC5 -17.53%, #AAB0E3 103.31%)';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/styles/**/*.{css,scss,sass}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        'max-xs': { max: '479px' },
        'max-sm': { max: '639px' },
        'max-md': { max: '767px' },
        'max-lg': { max: '1023px' },
        'max-xl': { max: '1279px' },
        'max-2xl': { max: '1535px' },
        'sm-height': { raw: '(min-height: 640px)' },
        'md-height': { raw: '(min-height: 768px)' },
        'sm-only': { min: '640px', max: '767px' },
        'md-only': { min: '768px', max: '1023px' },
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      backgroundImage: {
        'custom-blue-gradient': customBlueGradient,
        'custom-lavander-gradient': customLavanderGradient,
        'card-blue-gradient': cardBlueGradient,
        'card-turquoise-gradient': cardTurquoiseGradient,
        'card-grey-gradient': cardGreyGradient,
        'card-lavander-gradient': cardLavanderGradient,
      },
      colors: {
        'light-foreground': themes.light.baseColors.foreground,
        'light-foreground-2': themes.light.baseColors.foreground2,
        'light-foreground-3': themes.light.baseColors.foreground3,
        'light-background': themes.light.baseColors.background,
        'light-background-2': themes.light.baseColors.background2,
        'light-background-3': themes.light.baseColors.background3,
        'light-primary': themes.light.brandColors.primary.DEFAULT,
        'light-secondary': themes.light.brandColors.secondary.DEFAULT,
        'light-primary-foreground': themes.light.brandColors.primary.foreground,
        'light-secondary-foreground': themes.light.brandColors.secondary.foreground,
        'light-danger': themes.light.brandColors.danger.DEFAULT,
        'light-danger-foreground': themes.light.brandColors.danger.foreground,
        'light-success': themes.light.brandColors.success.DEFAULT,
        'light-success-foreground': themes.light.brandColors.success.foreground,
        'dark-foreground': themes.dark.baseColors.foreground,
        'dark-foreground-2': themes.dark.baseColors.foreground2,
        'dark-foreground-3': themes.dark.baseColors.foreground3,
        'dark-background': themes.dark.baseColors.background,
        'dark-background-2': themes.dark.baseColors.background2,
        'dark-background-3': themes.dark.baseColors.background3,
        'dark-primary': themes.dark.brandColors.primary.DEFAULT,
        'dark-secondary': themes.dark.brandColors.secondary.DEFAULT,
        'dark-primary-foreground': themes.dark.brandColors.primary.foreground,
        'dark-secondary-foreground': themes.dark.brandColors.secondary.foreground,
        'dark-danger': themes.dark.brandColors.danger.DEFAULT,
        'dark-danger-foreground': themes.dark.brandColors.danger.foreground,
        'dark-success': themes.dark.brandColors.success.DEFAULT,
        'dark-success-foreground': themes.dark.brandColors.success.foreground,
        'telegram-main-button-color': themes.light.telegramColors.mainButton.color,
        'telegram-main-button-disabled-color': themes.light.telegramColors.mainButton.disabledColor,
        indigo: {
          50: '#EEEEFF',
        },
      },
      fontSize: {
        '2.5xl': [
          '1.75rem',
          {
            lineHeight: '2.25rem',
            fontWeight: 500,
          },
        ],
        '3xl': [
          '2rem',
          {
            lineHeight: '2.5rem',
            fontWeight: 500,
          },
        ],
        '4.25xl': [
          '2.5rem',
          {
            lineHeight: '3.5rem',
            fontWeight: 500,
          },
        ],
      },
      spacing: {
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        15: '3.75rem',
        49: '12.25rem',
        57: '14.25rem',
        78: '19.5rem',
        90: '22.5rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout,
      themes: {
        light: {
          colors: {
            background: themes.light.baseColors.background,
            foreground: themes.light.baseColors.foreground,
            primary: themes.light.brandColors.primary,
            secondary: themes.light.brandColors.secondary,
            success: themes.light.brandColors.success,
            danger: themes.light.brandColors.danger,
          },
        },
        dark: {
          colors: {
            background: themes.dark.baseColors.background,
            foreground: themes.dark.baseColors.foreground,
            primary: themes.dark.brandColors.primary,
            secondary: themes.dark.brandColors.secondary,
            success: themes.dark.brandColors.success,
            danger: themes.dark.brandColors.danger,
          },
        },
      },
    }),
    function ({ addComponents }: { addComponents: Function }) {
      addComponents({
        ...genereateTailwindThemeClasses('bg-foreground-2', 'bg-light-foreground-2', 'bg-dark-foreground-2'),
        ...genereateTailwindThemeClasses('bg-foreground-3', 'bg-light-foreground-3', 'bg-dark-foreground-3'),
        ...genereateTailwindThemeClasses('bg-background-2', 'bg-light-background-2', 'bg-dark-background-2'),
        ...genereateTailwindThemeClasses('bg-background-3', 'bg-light-background-3', 'bg-dark-background-3'),
        ...genereateTailwindThemeClasses('text-foreground-2', 'text-light-foreground-2', 'text-dark-foreground-2'),
        ...genereateTailwindThemeClasses('text-foreground-3', 'text-light-foreground-3', 'text-dark-foreground-3'),
        ...genereateTailwindThemeClasses('text-background-2', 'text-light-background-2', 'text-dark-background-2'),
        ...genereateTailwindThemeClasses('text-background-3', 'text-light-background-3', 'text-dark-background-3'),
        ...genereateTailwindThemeClasses(
          'border-foreground-2',
          'border-light-foreground-2',
          'border-dark-foreground-2',
        ),
        ...genereateTailwindThemeClasses(
          'border-foreground-3',
          'border-light-foreground-3',
          'border-dark-foreground-3',
        ),
        ...genereateTailwindThemeClasses(
          'border-background-2',
          'border-light-background-2',
          'border-dark-background-2',
        ),
      });
    },
  ],
};
export default config;
