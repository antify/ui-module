import tailwindConfig from './runtime/tailwindConfig';
import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addImportsDir,
  addComponent,
} from '@nuxt/kit';
import {uiComponents} from './uiComponents';
import {defu} from 'defu';
type TailwindConfig = import('tailwindcss').Config;

const moduleKey = 'uiModule';

type ModuleOptions = {
  tailwindcss?: TailwindConfig
};

export type * from './runtime/types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@antify/ui-module',
    configKey: moduleKey
  },
  defaults: {},
  async setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url);
    const runtimeDir = resolve('./runtime');

    nuxt.options.build.transpile.push(runtimeDir);

    addPlugin(resolve(runtimeDir, 'plugins/ui-module'));
    addImportsDir(resolve(runtimeDir, 'composables'));

    nuxt.options.alias['#ui-module'] = '@antify/ui';

    /**
     * Nuxt modules does not support exporting external components very well.
     * Discussion here: https://github.com/nuxt/nuxt/issues/20799
     */
    uiComponents.forEach(name => {
      addComponent({
        name,
        export: name,
        filePath: '@antify/ui/components'
      });
    });

    nuxt.options.postcss.plugins.tailwindcss = defu(tailwindConfig, options.tailwindcss);

    // TODO:: replace with tailwind.css coming from tailwind package
    nuxt.options.css.push(resolve(runtimeDir, 'assets/tailwind.css'));
    nuxt.options.runtimeConfig.public[moduleKey] = options;
  }
});
