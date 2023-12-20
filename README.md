# Ui module

Tailwind based vue 3 component library

# Development

- Run `pnpm run dev:prepare` to generate type stubs.
- Use `pnpm run dev` to start [playground](playground) in development mode.

# Storybook
## Start
```
pnpm storybook
```

## Build
```
pnpm build-storybook
```

## Update Chromatic Build
```
pnpm chromatic
```

## Useful links:

- Chromatic docu: https://www.chromatic.com/docs/
- Storybook docu: https://storybook.js.org/docs/vue/get-started/introduction

# Known issues

## Using this module as pnpm linked dependency

Pnpm link does not work for local development, because the tailwindcss module can not 
get installed outside of this project. An error "Cannot find module 'tailwindcss'" will be thrown.

Use file link instead: 
```
"peerDependecies": {
  "@antify/ui-module": "file:../ui-module"
}
```

Keep in mind to reinstall the module after every change.

Also add the following to your `nuxt.config.ts`:
```
/**
 * Allow using packages outside the project dir with "link:../../example-package".
 * Without strict, vite would throw 403 error.
 */
vite: {
  server: {
    fs: {
      strict: false,
    }
  }
}
```
