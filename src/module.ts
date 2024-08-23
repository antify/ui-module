import tailwindConfig from './runtime/tailwind.config';
import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addImportsDir,
  addComponent
} from '@nuxt/kit';
import type {NuxtModule} from 'nuxt/schema';
import {uiComponents} from './uiComponents';

const moduleKey = 'uiModule';

type ModuleOptions = {};

// TODO:: Write Paginator component
// TODO:: Import all ui components (missing AntTextInput etc.)
const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'ui-module',
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

    nuxt.options.postcss.plugins.tailwindcss = tailwindConfig;
    // TODO:: replace with tailwind.css coming from tailwind package
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
