<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {Size} from '../../../enums/Size.enum'
import AntSkeleton from '../../AntSkeleton.vue';
import {handleEnumValidation} from '../../../handler';
import {InputColorType} from '../../../enums';

const props = withDefaults(defineProps<{
  value: number;
  maxValue: number;
  colorType?: InputColorType;
  size?: Size;
  skeleton?: boolean;
}>(), {
  skeleton: false,
  size: Size.md,
  colorType: InputColorType.base
});

const classes = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral-500',
    [InputColorType.danger]: 'text-danger-500',
    [InputColorType.info]: 'text-info-500',
    [InputColorType.success]: 'text-success-500',
    [InputColorType.warning]: 'text-warning-500',
  };

  return {
    'relative font-regular inline-block transition-color': true,
		'text-2xs': props.size === Size.xs2,
		'text-xs': props.size === Size.xs,
		'text-sm': props.size === Size.sm,
    'text-md': props.size === Size.md,
		'text-lg': props.size === Size.lg,
    [variants[props.colorType]]: true,
  };
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});
</script>

<template>
  <div :class="classes">
    <span :class="{'invisible': skeleton}">
      {{ value }}/{{ maxValue }}
    </span>

    <AntSkeleton
      v-if="skeleton"
      absolute
      rounded
    />
  </div>
</template>
