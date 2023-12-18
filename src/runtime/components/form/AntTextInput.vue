<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {onMounted} from 'vue';
import AntField from './Elements/AntField.vue'
import AntBaseInput from './Elements/AntBaseInput.vue'
import {Size} from '../../enums/Size.enum'
import {Validator} from '@antify/validate'
import {TextInputType} from './__types/AntTextInput.type'
import {handleEnumValidation} from '../../handler';
import { useVModel } from '@vueuse/core';
import {InputColorType} from '../../enums';
import {BaseInputType} from './Elements/__types';

const emit = defineEmits(['update:value', 'update:skeleton']);
const props = withDefaults(defineProps<{
  value: string;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  validator?: Validator;
  type?: TextInputType;
  limiter?: boolean;
  max?: number;
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
  type: TextInputType.text,
  limiter: false
});

const _skeleton = useVModel(props, 'skeleton', emit);
const _value = useVModel(props, 'value', emit);

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
      :skeleton="_skeleton"
      :description="description"
      :colorType="colorType"
      :validator="validator"
      :limiter-max-value="limiter && max !== undefined ? max : undefined"
      :limiter-value="limiter ? _value.length : undefined"
  >
    <AntBaseInput
        v-model:value="_value"
        :type="type as unknown as BaseInputType"
        wrapper-class="flex-grow"
        :colorType="colorType"
        :size="size"
        :skeleton="_skeleton"
        :disabled="disabled"
        :placeholder="placeholder !== undefined ? placeholder : label"
        :show-icon="false"
        :validator="validator"
        v-bind="$attrs"
    />
  </AntField>
</template>
