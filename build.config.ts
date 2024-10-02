import {defineBuildConfig} from 'unbuild';

export default defineBuildConfig({
  declaration: true,
  externals: [
    '@fortawesome/free-solid-svg-icons',
    '@antify/ui',
    '#vue-router',
    'defu'
  ]
});
