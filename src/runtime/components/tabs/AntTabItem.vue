<script setup lang="ts">
import AntIcon from '../AntIcon.vue';
import {
  faExclamationCircle,
  faExclamationTriangle,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {computed} from 'vue';
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

  if (typeof props.to === 'object' && props.to?.name !== undefined) {
    return route.name === props.to.name;
  }

  return props.active;
});
const containerClasses = computed(() => {
  const variants: Record<ColorType, string> = {
    [ColorType.base]: 'hover:bg-neutral-100',
    [ColorType.warning]: 'hover:bg-warning-100',
    [ColorType.danger]: 'hover:bg-danger-100',
  };
  const activeVariants: Record<ColorType, string> = {
    [ColorType.base]: 'text-primary-500 border-primary-500',
    [ColorType.warning]: 'text-warning-500 border-warning-500',
    [ColorType.danger]: 'text-danger-500 border-danger-500',
  };
  const notActiveVariants: Record<ColorType, string> = {
    [ColorType.base]: 'text-for-white-bg-font border-white',
    [ColorType.warning]: 'text-warning-500',
    [ColorType.danger]: 'text-danger-500',
  };

  return {
    'p-2 hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-white transition-[background-color] relative text-sm': true,
    'grow': props.expanded,
    [variants[props.colorType]]: true,
    [activeVariants[props.colorType]]: _active.value,
    [notActiveVariants[props.colorType]]: !_active.value,
  };
});
const borderBoxClasses = computed(() => {
  const variants: Record<ColorType, string> = {
    [ColorType.base]: 'bg-primary-500',
    [ColorType.warning]: 'bg-warning-500',
    [ColorType.danger]: 'bg-danger-500',
  };

  return {
    'h-[2px] w-full bg-danger-500 absolute bottom-0': true,
    [variants[props.colorType]]: true,
  };
});
const iconColor = computed(() => {
  const variants = {
    [ColorType.base]: 'text-neutral-100-font',
    [ColorType.warning]: 'text-warning-500',
    [ColorType.danger]: 'text-danger-500',
  };

  return variants[props.colorType];
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
        :color="_active ? 'text-primary-500' : 'text-for-white-bg-font'"
      />
    </slot>

    <slot>{{ label }}</slot>

    <AntIcon
      v-if="iconRight && showIcon"
      :icon="iconRight"
      :color="iconColor"
    />

    <div
      v-if="_active"
      :class="borderBoxClasses"
    />
  </component>
</template>
