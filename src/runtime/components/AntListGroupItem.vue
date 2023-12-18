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
  colorType: ListGroupItemColorType.neutralLightest,
});

const classes = computed(() => {
  const variants: Record<ListGroupItemColorType, string> = {
    [ListGroupItemColorType.danger]: 'bg-danger text-danger-font',
    [ListGroupItemColorType.info]: 'bg-info text-info-font',
    [ListGroupItemColorType.neutralDark]: 'bg-neutral-dark text-neutral-dark-font',
    [ListGroupItemColorType.neutralLight]: 'bg-neutral-light text-neutral-light-font',
    [ListGroupItemColorType.neutralLightest]: 'bg-neutral-lightest text-neutral-lightest-font',
    [ListGroupItemColorType.primary]: 'bg-primary text-primary-font',
    [ListGroupItemColorType.secondary]: 'bg-secondary text-secondary-font',
    [ListGroupItemColorType.success]: 'bg-success text-success-font',
    [ListGroupItemColorType.warning]: 'bg-warning text-warning-font',
  };

  return {
    'text-sm transition-colors inline-block w-full': true,
    [variants[props.colorType]]: true,
  };
});
const contentWrapperClasses = computed(() => {
  const variants: Record<ListGroupItemColorType, string> = {
   [ListGroupItemColorType.danger]: 'text-danger-font',
   [ListGroupItemColorType.info]: 'text-info-font',
   [ListGroupItemColorType.neutralDark]: 'text-neutral-dark-font',
   [ListGroupItemColorType.neutralLight]: 'text-neutral-light-font',
   [ListGroupItemColorType.neutralLightest]: 'text-neutral-lightest-font',
   [ListGroupItemColorType.primary]: 'text-primary-font',
   [ListGroupItemColorType.secondary]: 'text-secondary-font',
   [ListGroupItemColorType.success]: 'text-success-font',
   [ListGroupItemColorType.warning]: 'text-warning-font',
  };

  return {
    'w-full p-2.5 flex gap-2.5 items-center justify-between': true,
    'hover:bg-neutral-darkest/25 cursor-pointer transition-colors': props.to !== undefined,
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
        <slot v-if="iconLeft" name="icon-left">
          <AntIcon :icon="iconLeft"/>
        </slot>

        <slot/>
      </div>

      <slot v-if="iconRight" name="icon-right">
        <AntIcon :icon="iconRight"/>
      </slot>
    </div>
  </component>
</template>
