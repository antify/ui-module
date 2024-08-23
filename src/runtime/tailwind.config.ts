import tailwindConfig from '@antify/ui/config';

tailwindConfig.content = [
  // For module dev
  './src/runtime/**/*.{vue,js,ts,jsx,tsx}',
  './src/runtime/**/*.stories.ts',
  './playground/app.vue',
  './playground/components/**/*.{vue,js,ts,jsx,tsx}',
  './playground/pages/**/*.{vue,js,ts,jsx,tsx}',
  './playground/layouts/**/*.{vue,js,ts,jsx,tsx}',
  '../ui-module/src/**/*.{vue,js,ts,jsx,tsx}',

  // For project dev
  './app.vue',
  './components/**/*.{vue,js,ts,jsx,tsx}',
  './pages/**/*.{vue,js,ts,jsx,tsx}',
  './layouts/**/*.{vue,js,ts,jsx,tsx}',

  // If this config is used in a project
  './node_modules/@antify/*/dist/**/*.{js,vue,ts}',
  './node_modules/@antify/*/src/**/*.{js,vue,ts}',
];

export default tailwindConfig;
