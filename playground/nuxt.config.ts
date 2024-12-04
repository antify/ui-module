import defaultColors from "tailwindcss/colors";

export default defineNuxtConfig({
  ssr: false,

  imports: {
    autoImport: false
  },

  modules: [
    '../src/module'
  ],


  uiModule: {
    tailwindcss: {
      content: [
        "./node_modules/@blue-panda-dev/pvs-ui/dist/!**!/!*.vue",
      ],
      theme: {
        extend: {
          colors: {
            ...defaultColors,
            customColor: defaultColors.orange,
          },
        }
      },
    },
  },

  compatibilityDate: '2024-09-06'
});
