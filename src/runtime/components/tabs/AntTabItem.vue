<script setup lang="ts">
import AntIcon from '../AntIcon.vue';
import {
  faExclamationCircle,
  faExclamationTriangle,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {computed} from 'vue';
import {IconColorType} from '../__types/AntIcon.types';
import {type RouteLocationRaw, useRoute} from 'vue-router';
import {ColorType} from './__types/AntTabItem.types';

const props = withDefaults(defineProps<{
  label: string;
  active: boolean;
  colorType?: ColorType
  showIcon?: boolean;
  icon?: IconDefinition;
  to?: RouteLocationRaw;
  expanded?: boolean;
}>(), {
  colorType: ColorType.base,
  showIcon: true,
});
const route = useRoute();

const icons = {
  [ColorType.base]: null,
  [ColorType.danger]: faExclamationCircle,
  [ColorType.warning]: faExclamationTriangle,
};
const iconRight = computed<IconDefinition | null>(() => icons[props.colorType]);
const _active = computed<boolean>(() => {
  if (typeof props.to === 'string') {
    return route.path === props.to;
  }

  if (typeof props.to === 'object' && props.to.name !== undefined) {
    return route.name === props.to.name;
  }

  return props.active;
});
const containerClasses = computed(() => {
  const variants: Record<ColorType, string> = {
    [ColorType.base]: 'hover:bg-neutral-lighter',
    [ColorType.warning]: 'hover:bg-warning-lighter',
    [ColorType.danger]: 'hover:bg-danger-lighter',
  };
  const activeVariants: Record<ColorType, string> = {
    [ColorType.base]: 'text-primary border-primary',
    [ColorType.warning]: 'text-warning border-warning',
    [ColorType.danger]: 'text-danger border-danger',
  };
  const notActiveVariants: Record<ColorType, string> = {
    [ColorType.base]: 'text-neutral-lightest-font border-neutral-lightest',
    [ColorType.warning]: 'text-warning',
    [ColorType.danger]: 'text-danger',
  };

  return {
    'p-2.5 hover:cursor-pointer text-center flex items-center justify-center gap-2.5 bg-neutral-lightest transition-[background-color] relative': true,
    'grow': props.expanded,
    [variants[props.colorType]]: true,
    [activeVariants[props.colorType]]: _active.value,
    [notActiveVariants[props.colorType]]: !_active.value,
  }
});
const borderBoxClasses = computed(() => {
  const variants: Record<ColorType, string> = {
    [ColorType.base]: 'bg-primary',
    [ColorType.warning]: 'bg-warning',
    [ColorType.danger]: 'bg-danger',
  };

  return {
    'h-[2px] w-full bg-danger absolute bottom-0': true,
    [variants[props.colorType]]: true,
  }
});
</script>

<template>
  <component
    :is="to !== undefined ? 'router-link' : 'div'"
    :to="to"
    :class="containerClasses"
  >
    <slot name="iconLeft">
      <AntIcon
        v-if="icon"
        :icon="icon"
        :color-type="_active ? IconColorType.primary: IconColorType.base"
      />
    </slot>

    <slot>{{ label }}</slot>

    <AntIcon
      v-if="iconRight && showIcon"
      :icon="iconRight"
      :color-type="colorType as unknown as IconColorType"
    />

    <div v-if="_active" :class="borderBoxClasses" />
  </component>
</template>
