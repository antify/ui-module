import {addComponent, addImportsDir, addPlugin, createResolver, defineNuxtModule,} from '@nuxt/kit';
import {uiComponents} from './uiComponents';
import tailwindcss from '@tailwindcss/vite';

const moduleKey = 'uiModule';

type ModuleOptions = {
  tailwindCSSPath?: string;
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

    // Automatically include the vite plugin for Tailwind 4.X in the nuxt.config
    nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
      viteInlineConfig.plugins.push(tailwindcss());
    });

    // Include base @antify/ui styles
    const antifyCSSPath = require.resolve('@antify/ui/styles');
    nuxt.options.css.push(antifyCSSPath);

    // Include optional additional tailwind-related styles through config
    if (options.tailwindCSSPath) {
      const tailwindCSSPath = resolve(nuxt.options.rootDir, options.tailwindCSSPath);
      nuxt.options.css.push(tailwindCSSPath);
    }

    nuxt.options.runtimeConfig.public[moduleKey] = options;
  }
});
