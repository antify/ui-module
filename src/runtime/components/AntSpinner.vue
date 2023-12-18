<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {Size} from '../enums/Size.enum'
import {handleEnumValidation} from '../handler';
import {ColorType} from '../enums/ColorType.enum';

const props = withDefaults(defineProps<{
  colorType?: ColorType,
  size?: Size;
  inverted?: boolean;
}>(), {
  size: Size.md,
  colorType: ColorType.base,
  inverted: false
});

const classes = computed(() => ({
  'animate-spin': true,
  'w-4 h-4': props.size === Size.sm,
  'w-5 h-5': props.size === Size.md,
}));
onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, ColorType, 'colorType');
});
const circleClass = computed(() => {
  const invertedVariants: Record<ColorType, string> = {
    [ColorType.base]: 'fill-neutral',
    [ColorType.primary]: 'fill-primary-dark',
    [ColorType.secondary]: 'fill-secondary-dark',
    [ColorType.danger]: 'fill-danger-dark',
    [ColorType.info]: 'fill-info-dark',
    [ColorType.success]: 'fill-success-dark',
    [ColorType.warning]: 'fill-warning-dark',
  };
  const notInvertedVariants: Record<ColorType, string> = {
    [ColorType.base]: 'fill-neutral-lighter',
    [ColorType.primary]: 'fill-primary-lighter',
    [ColorType.secondary]: 'fill-secondary-lighter',
    [ColorType.danger]: 'fill-danger-lighter',
    [ColorType.info]: 'fill-info-lighter',
    [ColorType.success]: 'fill-success-lighter',
    [ColorType.warning]: 'fill-warning-lighter',
  };

  return {
    [invertedVariants[props.colorType]]: props.inverted,
    [notInvertedVariants[props.colorType]]: !props.inverted,
  };
});
const spinningElementClass = computed(() => {
  const invertedVariants: Record<ColorType, string> = {
    [ColorType.base]: 'fill-neutral-lighter',
    [ColorType.primary]: 'fill-primary-lighter',
    [ColorType.secondary]: 'fill-secondary-lighter',
    [ColorType.danger]: 'fill-danger-lighter',
    [ColorType.info]: 'fill-info-lighter',
    [ColorType.success]: 'fill-success-lighter',
    [ColorType.warning]: 'fill-warning-lighter',
  };
  const notInvertedVariants: Record<ColorType, string> = {
    [ColorType.base]: 'fill-neutral',
    [ColorType.primary]: 'fill-primary',
    [ColorType.secondary]: 'fill-secondary',
    [ColorType.danger]: 'fill-danger',
    [ColorType.info]: 'fill-info',
    [ColorType.success]: 'fill-success',
    [ColorType.warning]: 'fill-warning',
  };

  return {
    [invertedVariants[props.colorType]]: props.inverted,
    [notInvertedVariants[props.colorType]]: !props.inverted,
  };
});
</script>

<template>
  <svg :class="classes" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        :class="circleClass"
        d="M8 16C12.4183 16 16 12.4183 16 8H14C14 11.5346 11.5346 14 8 14C4.46538 14 2 11.5346 2 8C2 4.46538 4.46538 2 8 2V0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
    />
    <path
        :class="spinningElementClass"
        d="M16 8C16 6.94942 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608963C10.0909 0.206926 9.05057 -1.7116e-07 8 0L8 2C8.78793 2 9.56815 2.15519 10.2961 2.45672C11.0241 2.75825 11.6855 3.20021 12.2426 3.75736C12.7998 4.31451 13.2417 4.97595 13.5433 5.7039C13.8448 6.43185 14 7.21207 14 8H16Z"
    />
  </svg>
</template>
