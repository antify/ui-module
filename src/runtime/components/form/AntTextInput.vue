<script lang="ts" setup>
import {onMounted} from 'vue';
import AntField from './Elements/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {Size} from '../../enums/Size.enum';
import {TextInputType} from './__types/AntTextInput.type';
import {handleEnumValidation} from '../../handler';
import {useVModel} from '@vueuse/core';
import {InputColorType} from '../../enums';
import {BaseInputType} from './Elements/__types';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate']);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  placeholder?: string;
  description?: string;
  showIcon?: boolean;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  type?: TextInputType;
  limiter?: boolean;
  max?: number;
  errors?: string[];
}>(), {
  colorType: InputColorType.base,
  showIcon: false,
  disabled: false,
  skeleton: false,
  size: Size.md,
  type: TextInputType.text,
  limiter: false,
  errors: []
});

const _value = useVModel(props, 'modelValue', emit);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.type, TextInputType, 'Type');
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :color-type="colorType"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter ? _value?.length : undefined"
    :errors="errors"
  >
    <AntBaseInput
      v-model:value="_value"
      :type="type as unknown as BaseInputType"
      wrapper-class="flex-grow"
      :color-type="colorType"
      :size="size"
      :skeleton="skeleton"
      :disabled="disabled"
      :placeholder="placeholder !== undefined ? placeholder : label"
      :show-icon="showIcon"
      v-bind="$attrs"
      :has-errors="errors.length > 0"
      @validate="val => $emit('validate', val)"
    />
  </AntField>
</template>
