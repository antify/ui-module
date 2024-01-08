<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props =
  defineProps<{
    label?: string;
    headerType?: string;
  }>();

const _headerType = ref<string>(props.headerType || 'h1');

onMounted(() => {
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(_headerType.value) === -1) {
    throw Error(`Header type ${_headerType.value} is not defined.`);
  }
});

const classes = () => ({
  'text-xl font-medium': _headerType.value === 'h1',
  'text-lg font-bold': _headerType.value === 'h2',
  'text-lg font-semibold': _headerType.value === 'h3',
  'text-lg font-medium': _headerType.value === 'h4',
  'text-md font-bold': _headerType.value === 'h5',
  'text-md font-semibold': _headerType.value === 'h6',
});
</script>

<template>
  <component :is="_headerType" :class="classes()" v-bind="$attrs">
    <slot>{{ label }}</slot>
  </component>
</template>
