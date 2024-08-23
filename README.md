# Ui module

Nuxt integration for @antify/ui package.

# Installation

Install package

```
pnpm i @antify/ui-module
```

Add it to your nuxt.config.ts

```ts
defineNuxtConfig({
  modules: [
    '@antify/ui-module'
  ]
})
```

# Usage

Do not install the `@antify/ui` package or use imports directly from it.
This module expose all components, types and helper form ui package through #ui-module
virtual alias.

It also expose all components to vue globally. You have not to import them in your components.

```vue
<script lang="ts" setup>
  import {InputState} from '#ui-module';
</script>

<template>
  <AntButton :state="InputState.info" />
</template>
```

# Plugins

# Composables



# Development

- Run `pnpm run dev:prepare` to generate type stubs.
- Use `pnpm run dev` to start [playground](playground) in development mode.

# Additional

## SSR

SSR is not included in the UX definition, because applications does not require SSR.
To keep the UX as simple as possible, we decided to not support SSR.

Therefore, make sure you disabled ssr in your nuxt config.

```ts
defineNuxtConfig({
  ssr: false
})
```
