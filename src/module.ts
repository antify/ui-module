import tailwindcss from './runtime/tailwind.config';
import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit';

const moduleName = 'ui-module';

export default defineNuxtModule({
  meta: {
    name: moduleName,
    configKey: 'uiModule'
  },
  defaults: {},
  async setup(options, nuxt) {
    const {resolve} = createResolver(import.meta.url);
    const runtimeDir = resolve('./runtime');

    nuxt.options.build.transpile.push(runtimeDir);
    // nuxt.options.alias['#uiModule'] = runtimeDir;

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
  }
});


