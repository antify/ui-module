import {addComponent, addImportsDir, addPlugin, createResolver, defineNuxtModule,} from '@nuxt/kit';
import {uiComponents} from './uiComponents';

const moduleKey = 'uiModule';

type ModuleOptions = {
  tailwindCSSPath: string;
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

    const antifyCSSPath = require.resolve('@antify/ui/styles');

    nuxt.options.css.push(antifyCSSPath);
    nuxt.options.css.push(resolve(runtimeDir, options.tailwindCSSPath));
    nuxt.options.runtimeConfig.public[moduleKey] = options;
  }
});
