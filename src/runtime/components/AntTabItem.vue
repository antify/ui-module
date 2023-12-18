<script setup lang="ts">
import AntIcon from './AntIcon.vue';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { computed, ref } from 'vue';
import { IconColorType } from './__types/AntIcon.types';
import { type RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  prependIcon?: IconDefinition;
  appendIcon?: IconDefinition;
  label: string;
  active: boolean;
  to?: string | RouteLocationRaw;
  expanded?: boolean;
}>();

const containerClasses = computed(() => {
  return {
    'p-2.5 border-b-2 hover:bg-neutral-lighter hover:cursor-pointer text-center flex items-center justify-center gap-2.5 transition-all': true,
    'bg-neutral-lightest text-neutral-lightest-font border-neutral-lightest hover:border-neutral-lighter': !props.active,
    'bg-neutral-lighter text-primary border-primary': props.active,
    'grow': props.expanded,
  };
});

</script>

<template>
  <div
    v-if="!to"
    :class="containerClasses"
  >
    <slot name="prependIconSlot">
      <AntIcon v-if="prependIcon" :icon="prependIcon" :color-type="active ? IconColorType.primary: IconColorType.base"/>
    </slot>

    <slot>{{ label }}</slot>

    <slot name="appendIconSlot">
      <AntIcon v-if="appendIcon" :icon="appendIcon" :color-type="active ? IconColorType.primary: IconColorType.base"/>
    </slot>
  </div>

  <router-link
    v-else
    :to="to"
    :class="containerClasses"
  >
    <slot name="prependIconSlot">
      <AntIcon v-if="prependIcon" :icon="prependIcon" :color-type="active ? IconColorType.primary: IconColorType.base"/>
    </slot>

    <slot>{{ label }}</slot>

    <slot name="appendIconSlot">
      <AntIcon v-if="appendIcon" :icon="appendIcon" :color-type="active ? IconColorType.primary: IconColorType.base"/>
    </slot>
  </router-link>
</template>

<style scoped>

</style>
