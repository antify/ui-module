<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {computed, onMounted, watch} from 'vue';
import AntButton from '../buttons/AntButton.vue'
import AntField from './Elements/AntField.vue'
import AntBaseInput from './Elements/AntBaseInput.vue'
import {Size} from '../../enums/Size.enum'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {ColorType, InputColorType} from '../../enums/ColorType.enum';
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
  limiter?: boolean;
  errors?: string[];
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
  steps: 1,
  limiter: false,
  errors: []
});
const emit = defineEmits(['update:modelValue', 'validate']);
const _modelValue = useVModel(props, 'modelValue', emit);
const isPrevButtonDisabled = computed(() => {
  if (props.disabled) {
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

  if (props.max !== undefined && props.max !== null) {
    return _modelValue.value >= props.max;
  }

  return false;
});
const hasErrors = computed(() => props.errors.length > 0);
const buttonColorType = computed(() => {
  if (hasErrors.value) {
    return ColorType.danger;
  }

  return props.colorType;
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});

watch(_modelValue, (val) => {
  if (hasErrors.value) {
    emit('validate', val)
  }
});

function subtract() {
  if (_modelValue.value === null) {
    _modelValue.value = props.max || 0;
  } else if (props.max !== undefined && _modelValue.value - props.steps > props.max) {
    _modelValue.value = props.max;
  } else {
    _modelValue.value -= props.steps;
  }

  if (hasErrors.value) {
    emit('validate', _modelValue.value)
  }
}

function add() {
  if (_modelValue.value === null) {
    return _modelValue.value = props.min || 0;
  } else if (props.min !== undefined && _modelValue.value + props.steps < props.min) {
    return _modelValue.value = props.min;
  } else {
    _modelValue.value += props.steps;
  }

  if (hasErrors.value) {
    emit('validate', _modelValue.value)
  }
}
function onButtonBlur() {
  emit('validate', _modelValue.value)
}
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :color-type="colorType"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter && _modelValue !== undefined && _modelValue !== null ? _modelValue : undefined"
    :errors="errors"
  >
    <div
      class="flex relative"
    >
      <AntButton
        :icon-left="faMinus"
        :grouped="Grouped.left"
        :color-type="buttonColorType"
        :size="size"
        :skeleton="skeleton"
        :disabled="isPrevButtonDisabled"
        @click="subtract"
        @blur="onButtonBlur"
      />

      <AntBaseInput
        v-model:value.number="_modelValue"
        :type="BaseInputType.number"
        :grouped="Grouped.center"
        wrapper-class="flex-grow"
        :color-type="colorType"
        :size="size"
        :skeleton="skeleton"
        :min="min"
        :max="max"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :show-icon="false"
        :has-errors="hasErrors"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      />

      <AntButton
        :icon-left="faPlus"
        :grouped="Grouped.right"
        :color-type="buttonColorType"
        :size="size"
        :skeleton="skeleton"
        :disabled="isNextButtonDisabled"
        @click="add"
        @blur="onButtonBlur"
      />
    </div>
  </AntField>
</template>
