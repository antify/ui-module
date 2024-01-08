<script lang="ts" setup>
import { computed, onMounted } from 'vue';

const props =
  defineProps<{
    logoUrl?: string;
    alt?: string;
    size?: string;
  }>();

const classes = computed(() => ({
  'block overflow-hidden': true,
  'h-6': props.size === 'small',
  'h-8': !props.size || props.size === 'medium',
  'h-12': props.size === 'large',
}));

onMounted(() => {
  if (props.size && ['small', 'medium', 'large'].indexOf(props.size) === -1) {
    throw Error(`Size ${props.size} is not defined`);
  }
});
</script>

<template>
  <div :class="classes">
    <slot><img class="h-full" :src="logoUrl" :alt="alt" /></slot>
  </div>
</template>
