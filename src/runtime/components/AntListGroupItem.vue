<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {ListGroupItemColorType} from '../types/AntListGroupItem.type';
import {handleEnumValidation} from '../handler';
import {type RouteLocationRaw} from 'vue-router';
import AntIcon from './AntIcon.vue';

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw | string;
  colorType?: ListGroupItemColorType;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
}>(), {
  colorType: ListGroupItemColorType.neutral50,
});

const classes = computed(() => {
  const variants: Record<ListGroupItemColorType, string> = {
    [ListGroupItemColorType.danger]: 'bg-danger-500 text-danger-500-font',
    [ListGroupItemColorType.info]: 'bg-info-500 text-info-500-font',
    [ListGroupItemColorType.neutral700]: 'bg-neutral-700 text-neutral-700-font',
    [ListGroupItemColorType.neutral300]: 'bg-neutral-300 text-neutral-300-font',
    [ListGroupItemColorType.neutral50]: 'bg-white text-for-white-bg-font',
    [ListGroupItemColorType.primary]: 'bg-primary-500 text-primary-500-font',
    [ListGroupItemColorType.secondary]: 'bg-secondary-500 text-secondary-500-font',
    [ListGroupItemColorType.success]: 'bg-success-500 text-success-500-font',
    [ListGroupItemColorType.warning]: 'bg-warning-500 text-warning-500-font',
  };

  return {
    'text-sm transition-colors inline-block w-full': true,
    [variants[props.colorType]]: true,
  };
});
const contentWrapperClasses = computed(() => {
  const variants: Record<ListGroupItemColorType, string> = {
   [ListGroupItemColorType.danger]: 'text-danger-500-font',
   [ListGroupItemColorType.info]: 'text-info-500-font',
   [ListGroupItemColorType.neutral700]: 'text-neutral-700-font',
   [ListGroupItemColorType.neutral300]: 'text-neutral-300-font',
   [ListGroupItemColorType.neutral50]: 'text-for-white-bg-font',
   [ListGroupItemColorType.primary]: 'text-primary-500-font',
   [ListGroupItemColorType.secondary]: 'text-secondary-500-font',
   [ListGroupItemColorType.success]: 'text-success-500-font',
   [ListGroupItemColorType.warning]: 'text-warning-500-font',
  };

  return {
    'w-full p-2.5 flex gap-2.5 items-center justify-between': true,
    'hover:bg-neutral-950/25 cursor-pointer transition-colors': props.to !== undefined,
    [variants[props.colorType]]: props.to !== undefined
  };
});

onMounted(() => {
  handleEnumValidation(props.colorType, ListGroupItemColorType, 'colorType');
});
</script>

<template>
  <component
    :is="to !== undefined ? 'router-link' : 'div'"
    :to="to"
    :class="classes"
  >
    <div :class="contentWrapperClasses">
      <div class="flex items-center gap-2.5">
        <slot
          v-if="iconLeft"
          name="icon-left"
        >
          <AntIcon :icon="iconLeft" />
        </slot>

        <slot />
      </div>

      <slot
        v-if="iconRight"
        name="icon-right"
      >
        <AntIcon :icon="iconRight" />
      </slot>
    </div>
  </component>
</template>
