<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import AntField from './Elements/AntField.vue';
import {Validator} from '@antify/validate';
import {useVModel} from '@vueuse/core';
import {computed, onMounted} from 'vue';
import {InputColorType, Size} from '../../enums';
import {handleEnumValidation} from '../../handler';

const emits = defineEmits(['update:modelValue', 'update:skeleton'])
const props = withDefaults(defineProps<{
  modelValue: number | number[] | undefined;
  label?: string;
  description?: string;
  colorType?: InputColorType;
  size?: Size,
  disabled?: boolean;
  skeleton?: boolean;
  validator?: Validator;
  min?: number;
  max?: number;
}>(), {
  colorType: InputColorType.base,
  size: Size.md,
  disabled: false,
  skeleton: false,
  limiter: false
});

const value = useVModel(props, 'modelValue', emits);
const _skeleton = useVModel(props, 'skeleton', emits);

const _colorType = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);
const inputClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral-base',
    [InputColorType.danger]: 'text-danger-base',
    [InputColorType.info]: 'text-info-base',
    [InputColorType.success]: 'text-success-base',
    [InputColorType.warning]: 'text-warning-base',
  };

  return {
    'ant-range-slider transition-colors relative border-none w-full focus:z-10 h-2 bg-neutral-light rounded-md outline-none': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    'invisible': _skeleton.value,
    [variants[_colorType.value]]: true
  };
});

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.size, Size, 'size');

  props.validator?.validate(props.modelValue);
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="_skeleton"
    :description="description"
    :color-type="colorType"
    :validator="validator"
  >
    <input
      v-model="value"
      :class="inputClasses"
      type="range"
      :disabled="disabled || _skeleton"
      :min="min"
      :max="max"
      v-bind="$attrs"
    >
  </AntField>
</template>

<style scoped>
.ant-range-slider {
  -webkit-appearance: none;
}

.ant-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  border-radius: 100%;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #fff;
  border: 1px solid #CBD5E1;
  cursor: pointer;
}

.ant-range-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}
</style>
