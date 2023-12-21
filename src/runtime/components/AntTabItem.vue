<script setup lang="ts">
import AntIcon from './AntIcon.vue';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {computed} from 'vue';
import {IconColorType} from './__types/AntIcon.types';
import {type RouteLocationRaw, useRoute} from 'vue-router';

const props = defineProps<{
  prependIcon?: IconDefinition;
  appendIcon?: IconDefinition;
  label: string;
  active: boolean;
  to?: string | RouteLocationRaw;
  expanded?: boolean;
}>();
const route = useRoute();

const _active = computed<boolean>(() => {
  if (typeof props.to === 'string') {
    return route.path === props.to;
  }

  if (typeof props.to === 'object' && props.to.name !== undefined) {
    return route.name === props.to.name;
  }

  return props.active;
});
const containerClasses = computed(() => ({
  'p-2.5 border-b-2 hover:bg-neutral-lighter hover:cursor-pointer text-center flex items-center justify-center gap-2.5 transition-all': true,
  'bg-neutral-lightest text-neutral-lightest-font border-neutral-lightest hover:border-neutral-lighter': !_active.value,
  'bg-neutral-lighter text-primary border-primary': _active.value,
  'grow': props.expanded,
}));
</script>

<template>
  <component
    :is="to !== undefined ? 'router-link' : 'div'"
    :to="to"
    :class="containerClasses"
  >
    <slot name="prependIconSlot">
      <AntIcon
        v-if="prependIcon"
        :icon="prependIcon"
        :color-type="_active ? IconColorType.primary: IconColorType.base"
      />
    </slot>

    <slot>{{ label }}</slot>

    <slot name="appendIconSlot">
      <AntIcon
        v-if="appendIcon"
        :icon="appendIcon"
        :color-type="_active ? IconColorType.primary: IconColorType.base"
      />
    </slot>
  </component>
</template>
