import { nextui } from '@nextui-org/react';

import { themes } from './src/config/themes';

import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const customBlueGradient = 'linear-gradient(125deg, #71A9ED 0%, #436CB6 100%)';
const customLavanderGradient = 'linear-gradient(32.49deg, rgba(255, 255, 255, 1) 0.15%, rgba(183, 182, 255, 0.2) 100%)';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/styles/**/*.{css,scss,sass}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
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
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      backgroundImage: {
        'custom-blue-gradient': customBlueGradient,
        'custom-lavander-gradient': customLavanderGradient,
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
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '0.25rem',
        },
      },
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
            default: {},
          },
        },
      },
    }),
    function ({ addComponents }: { addComponents: Function }) {
      addComponents({
        '.border-background-3': {
          '@apply border-light-background-3 dark:border-dark-background-3': {},
        },

        '.bg-foreground-2': {
          '@apply bg-light-foreground-2 dark:bg-dark-foreground-2': {},
        },
        '.text-foreground-2': {
          '@apply text-light-foreground-2 dark:text-dark-foreground-2': {},
        },
        '.border-foreground-2': {
          '@apply border-light-foreground-2 dark:border-dark-foreground-2': {},
        },
        '.bg-foreground-3': {
          '@apply bg-light-foreground-3 dark:bg-dark-foreground-3': {},
        },
        '.text-foreground-3': {
          '@apply text-light-foreground-3 dark:text-dark-foreground-3': {},
        },
        '.border-foreground-3': {
          '@apply border-light-foreground-3 dark:border-dark-foreground-3': {},
        },
        '.bg-background-2': {
          '@apply bg-light-background-2 dark:bg-dark-background-2': {},
        },
        '.text-background-2': {
          '@apply text-light-background-2 dark:text-dark-background-2': {},
        },
        '.border-background-2': {
          '@apply border-light-background-2 dark:border-dark-background-2': {},
        },
        '.bg-background-3': {
          '@apply bg-light-background-3 dark:bg-dark-background-3': {},
        },
        '.text-background-3': {
          '@apply text-light-background-3 dark:text-dark-background-3': {},
        },
      });
    },
  ],
};
export default config;
