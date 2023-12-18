<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import AntButton from './AntButton.vue'
import AntField from './Elements/AntField.vue'
import AntBaseInput from './Elements/AntBaseInput.vue'
import {Size} from '../../enums/Size.enum'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {ColorType, InputColorType} from '../../enums/ColorType.enum';
import {Validator} from '@antify/validate'
import {handleEnumValidation} from '../../handler';
import {useVModel} from '@vueuse/core';
import {Grouped} from '../../enums/Grouped.enum';
import {BaseInputType} from './Elements/__types';

const props = withDefaults(defineProps<{
  modelValue: number | null;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  steps?: number;
  min?: number;
  max?: number;
  validator?: Validator;
  limiter?: boolean;
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
  steps: 1,
  limiter: false
});
const emits = defineEmits(['update:modelValue', 'update:skeleton']);

const _skeleton = useVModel(props, 'skeleton', emits)
const _modelValue = useVModel(props, 'modelValue', emits);
const isPrevButtonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }

  if (_modelValue.value === null) {
    return true;
  }

  if (props.min !== undefined && props.min !== null) {
    return _modelValue.value <= props.min;
  }

  return false;
});
const isNextButtonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }

  if (_modelValue.value === null) {
    return true;
  }

  if (props.max !== undefined && props.max !== null) {
    return _modelValue.value >= props.max;
  }

  return false;
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});

function subtract() {
  if (_modelValue.value === null) {
    return _modelValue.value = props.max || 0;
  }

  if (props.max !== undefined && _modelValue.value - props.steps > props.max) {
    return _modelValue.value = props.max;
  }

  _modelValue.value -= props.steps;
}

function add() {
  if (_modelValue.value === null) {
    return _modelValue.value = props.min || 0;
  }

  if (props.min !== undefined && _modelValue.value + props.steps < props.min) {
    return _modelValue.value = props.min;
  }

  _modelValue.value += props.steps;
}
</script>

<template>
  <AntField
      :label="label"
      :size="size"
      :skeleton="_skeleton"
      :description="description"
      :color-type="colorType"
      :validator="validator"
      :limiter-max-value="limiter && max !== undefined ? max : undefined"
      :limiter-value="limiter && _modelValue !== undefined && _modelValue !== null ? _modelValue : undefined"
  >
    <div
        class="flex relative"
    >
      <AntButton
          :icon-left="faMinus"
          :grouped="Grouped.left"
          :color-type="colorType as unknown as ColorType"
          :size="size"
          :skeleton="_skeleton"
          :disabled="isPrevButtonDisabled"
          @click="subtract"
      />

      <AntBaseInput
          v-model:value.number="_modelValue"
          :type="BaseInputType.number"
          :grouped="Grouped.center"
          wrapper-class="flex-grow"
          :color-type="colorType"
          :size="size"
          :skeleton="_skeleton"
          :min="min"
          :max="max"
          :disabled="disabled"
          :placeholder="placeholder || label"
          :show-icon="false"
          :validator="validator"
          v-bind="$attrs"
      />

      <AntButton
          :icon-left="faPlus"
          :grouped="Grouped.right"
          :color-type="colorType as unknown as ColorType"
          :size="size"
          :skeleton="_skeleton"
          :disabled="isNextButtonDisabled"
          @click="add"
      />
    </div>
  </AntField>
</template>
