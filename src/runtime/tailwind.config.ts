import defaultColors from 'tailwindcss/colors.js';
// import {type Config} from "tailwindcss";

const colors = {
  'transparent': defaultColors.transparent,
  'white': defaultColors.white,
  'black': defaultColors.black,

  'neutral-50': defaultColors.slate['50'],
  'neutral-100': defaultColors.slate['100'],
  'neutral-200': defaultColors.slate['200'],
  'neutral-300': defaultColors.slate['300'],
  'neutral-400': defaultColors.slate['400'],
  'neutral-500': defaultColors.slate['500'],
  'neutral-600': defaultColors.slate['600'],
  'neutral-700': defaultColors.slate['700'],
  'neutral-800': defaultColors.slate['800'],
  'neutral-900': defaultColors.slate['900'],
  'neutral-950': defaultColors.slate['950'],

  'primary-50': defaultColors.sky['50'],
  'primary-100': defaultColors.sky['100'],
  'primary-200': defaultColors.sky['200'],
  'primary-300': defaultColors.sky['300'],
  'primary-400': defaultColors.sky['400'],
  'primary-500': defaultColors.sky['500'],
  'primary-600': defaultColors.sky['600'],
  'primary-700': defaultColors.sky['700'],
  'primary-800': defaultColors.sky['800'],
  'primary-900': defaultColors.sky['900'],
  'primary-950': defaultColors.sky['950'],

  'secondary-50': defaultColors.lime['50'],
  'secondary-100': defaultColors.lime['100'],
  'secondary-200': defaultColors.lime['200'],
  'secondary-300': defaultColors.lime['300'],
  'secondary-400': defaultColors.lime['400'],
  'secondary-500': defaultColors.lime['500'],
  'secondary-600': defaultColors.lime['600'],
  'secondary-700': defaultColors.lime['700'],
  'secondary-800': defaultColors.lime['800'],
  'secondary-900': defaultColors.lime['900'],
  'secondary-950': defaultColors.lime['950'],

  'info-50': defaultColors.blue['50'],
  'info-100': defaultColors.blue['100'],
  'info-200': defaultColors.blue['200'],
  'info-300': defaultColors.blue['300'],
  'info-400': defaultColors.blue['400'],
  'info-500': defaultColors.blue['500'],
  'info-600': defaultColors.blue['600'],
  'info-700': defaultColors.blue['700'],
  'info-800': defaultColors.blue['800'],
  'info-900': defaultColors.blue['900'],
  'info-950': defaultColors.blue['950'],

  'success-50': defaultColors.green['50'],
  'success-100': defaultColors.green['100'],
  'success-200': defaultColors.green['200'],
  'success-300': defaultColors.green['300'],
  'success-400': defaultColors.green['400'],
  'success-500': defaultColors.green['500'],
  'success-600': defaultColors.green['600'],
  'success-700': defaultColors.green['700'],
  'success-800': defaultColors.green['800'],
  'success-900': defaultColors.green['900'],
  'success-950': defaultColors.green['950'],

  'warning-50': defaultColors.yellow['50'],
  'warning-100': defaultColors.yellow['100'],
  'warning-200': defaultColors.yellow['200'],
  'warning-300': defaultColors.yellow['300'],
  'warning-400': defaultColors.yellow['400'],
  'warning-500': defaultColors.yellow['500'],
  'warning-600': defaultColors.yellow['600'],
  'warning-700': defaultColors.yellow['700'],
  'warning-800': defaultColors.yellow['800'],
  'warning-900': defaultColors.yellow['900'],
  'warning-950': defaultColors.yellow['950'],

  'danger-50': defaultColors.red['50'],
  'danger-100': defaultColors.red['100'],
  'danger-200': defaultColors.red['200'],
  'danger-300': defaultColors.red['300'],
  'danger-400': defaultColors.red['400'],
  'danger-500': defaultColors.red['500'],
  'danger-600': defaultColors.red['600'],
  'danger-700': defaultColors.red['700'],
  'danger-800': defaultColors.red['800'],
  'danger-900': defaultColors.red['900'],
  'danger-950': defaultColors.red['950'],
};
const fontColors = {
  'for-white-bg-font': colors['neutral-900'],
  'for-black-bg-font': colors['neutral-100'],

  'neutral-50-font': colors['neutral-600'],
  'neutral-100-font': colors['neutral-600'],
  'neutral-200-font': colors['neutral-600'],
  'neutral-300-font': colors['neutral-600'],
  'neutral-400-font': colors['neutral-600'],
  'neutral-500-font': colors['neutral-100'],
  'neutral-600-font': colors['neutral-100'],
  'neutral-700-font': colors['neutral-100'],
  'neutral-800-font': colors['neutral-100'],
  'neutral-900-font': colors['neutral-100'],
  'neutral-950-font': colors['neutral-100'],

  'primary-50-font': colors['neutral-600'],
  'primary-100-font': colors['neutral-600'],
  'primary-200-font': colors['neutral-600'],
  'primary-300-font': colors['neutral-600'],
  'primary-400-font': colors['neutral-600'],
  'primary-500-font': colors['neutral-100'],
  'primary-600-font': colors['neutral-100'],
  'primary-700-font': colors['neutral-100'],
  'primary-800-font': colors['neutral-100'],
  'primary-900-font': colors['neutral-100'],
  'primary-950-font': colors['neutral-100'],

  'secondary-50-font': colors['neutral-600'],
  'secondary-100-font': colors['neutral-600'],
  'secondary-200-font': colors['neutral-600'],
  'secondary-300-font': colors['neutral-600'],
  'secondary-400-font': colors['neutral-600'],
  'secondary-500-font': colors['neutral-100'],
  'secondary-600-font': colors['neutral-100'],
  'secondary-700-font': colors['neutral-100'],
  'secondary-800-font': colors['neutral-100'],
  'secondary-900-font': colors['neutral-100'],
  'secondary-950-font': colors['neutral-100'],

  'success-50-font': colors['neutral-600'],
  'success-100-font': colors['neutral-600'],
  'success-200-font': colors['neutral-600'],
  'success-300-font': colors['neutral-600'],
  'success-400-font': colors['neutral-600'],
  'success-500-font': colors['neutral-100'],
  'success-600-font': colors['neutral-100'],
  'success-700-font': colors['neutral-100'],
  'success-800-font': colors['neutral-100'],
  'success-900-font': colors['neutral-100'],
  'success-950-font': colors['neutral-100'],

  'info-50-font': colors['neutral-600'],
  'info-100-font': colors['neutral-600'],
  'info-200-font': colors['neutral-600'],
  'info-300-font': colors['neutral-600'],
  'info-400-font': colors['neutral-600'],
  'info-500-font': colors['neutral-100'],
  'info-600-font': colors['neutral-100'],
  'info-700-font': colors['neutral-100'],
  'info-800-font': colors['neutral-100'],
  'info-900-font': colors['neutral-100'],
  'info-950-font': colors['neutral-100'],

  'warning-50-font': colors['neutral-600'],
  'warning-100-font': colors['neutral-600'],
  'warning-200-font': colors['neutral-600'],
  'warning-300-font': colors['neutral-600'],
  'warning-400-font': colors['neutral-600'],
  'warning-500-font': colors['neutral-100'],
  'warning-600-font': colors['neutral-100'],
  'warning-700-font': colors['neutral-100'],
  'warning-800-font': colors['neutral-100'],
  'warning-900-font': colors['neutral-100'],
  'warning-950-font': colors['neutral-100'],

  'danger-50-font': colors['neutral-600'],
  'danger-100-font': colors['neutral-600'],
  'danger-200-font': colors['neutral-600'],
  'danger-300-font': colors['neutral-600'],
  'danger-400-font': colors['neutral-600'],
  'danger-500-font': colors['neutral-100'],
  'danger-600-font': colors['neutral-100'],
  'danger-700-font': colors['neutral-100'],
  'danger-800-font': colors['neutral-100'],
  'danger-900-font': colors['neutral-100'],
  'danger-950-font': colors['neutral-100'],
};

// TODO:: add 2xs-font

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // For module dev
    './src/runtime/**/*.{vue,js,ts,jsx,tsx}',
    './src/runtime/**/*.stories.ts',
    './playground/**/*.{vue,js,ts,jsx,tsx}',
    '../ui-module/src/**/*.{vue,js,ts,jsx,tsx}',

    // For project dev
    './app.vue',
    './components.{vue,js,ts,jsx,tsx}',
    './pages.{vue,js,ts,jsx,tsx}',

    // If this config is used in a project
    './node_modules/@antify/*/dist/**/*.{js,vue,ts}',
    './node_modules/@antify/*/src/**/*.{js,vue,ts}',
  ],
  theme: {
    colors: {
      ...colors,
      ...fontColors,
    },
    extend: {
      animation: {
        skeleton: 'skeleton 2s ease-out infinite',
      },
      keyframes: {
        'skeleton': {
          '0%, 100%': {'background-color': colors['neutral-300']},
          '50%': {'background-color': colors['neutral-100']},
        }
      }
    }
  }
}
// as Config;
