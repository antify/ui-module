import tailwindcss from './runtime/tailwind.config';
import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit';
import type {NuxtModule} from 'nuxt/schema';

const moduleKey = 'uiModule';

type ModuleOptions = {
  toasterMessageShowTime: number;
};

const module = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'ui-module',
    configKey: moduleKey
  },
  defaults: {
    toasterMessageShowTime: 5000
  },
  async setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url);
    const runtimeDir = resolve('./runtime');

    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias['#uiModule'] = resolve(runtimeDir, 'types');

    addPlugin(resolve(runtimeDir, 'plugins/ui-module'));

    addImportsDir(resolve(runtimeDir, 'composables'));

    await addComponentsDir({
      path: resolve(runtimeDir, 'components'),
      pattern: '**/*.vue',
      pathPrefix: false,
      prefix: '',
      global: false
    });

    nuxt.options.postcss.plugins.tailwindcss = tailwindcss;
    nuxt.options.css.push(resolve(runtimeDir, 'assets/tailwind.css'));

    nuxt.options.runtimeConfig.public[moduleKey] = options;
  }
});

/**
 * Export it like this, because otherwise following error get thrown:
 * The inferred type of 'default' cannot be named without a reference to '..'.
 * This is likely not portable. A type annotation is necessary.
 * @see: https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1904420622
 */
export default module;
export * from './runtime/types';
