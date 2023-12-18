<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {Size} from '../../../enums/Size.enum'
import AntSkeleton from '../../AntSkeleton.vue';
import {handleEnumValidation} from '../../../handler';
import {useVModel} from '@vueuse/core';
import {InputColorType} from '../../../enums';

const emits = defineEmits(['update:skeleton']);
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

const _skeleton = useVModel(props, 'skeleton', emits);

const classes = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral',
    [InputColorType.danger]: 'text-danger',
    [InputColorType.info]: 'text-info',
    [InputColorType.success]: 'text-success',
    [InputColorType.warning]: 'text-warning',
  };

  return {
    'relative font-regular inline-block transition-color': true,
    'text-xs': props.size === Size.sm,
    'text-sm': props.size === Size.md,
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
    <span :class="{'invisible': _skeleton}">
        {{ value }}/{{ maxValue }}
    </span>

    <AntSkeleton
        v-model="_skeleton"
        absolute
        rounded
    />
  </div>
</template>
