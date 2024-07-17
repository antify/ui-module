<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import AntButton from '../buttons/AntButton.vue';
import AntField from './Elements/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {Size} from '../../enums/Size.enum';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {useVModel} from '@vueuse/core';
import {ColorType, InputColorType} from '../../enums';
import {Grouped} from '../../enums/Grouped.enum';
import {BaseInputType} from './Elements/__types';
import {handleEnumValidation} from '../../handler';
import {FieldValidator} from '@antify/validate';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  modelValue: number | null;
  unit: string | IconDefinition;
  label?: string;
  placeholder?: string;
  description?: string;
  limiter?: boolean;
  min?: number;
  max?: number;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  wrapperClass?: string | Record<string, boolean>;
  errors?: string[];
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
  limiter: false,
  errors: () => []
});
const emit = defineEmits(['update:modelValue', 'validate']);
const _modelValue = useVModel(props, 'modelValue', emit);
const _colorType = computed(() => hasErrors.value ? InputColorType.danger : props.colorType);
const hasErrors = computed(() => props.errors.length > 0);

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :color-type="colorType"
    :validator="validator"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter && _modelValue !== undefined && _modelValue !== null ? _modelValue : undefined"
    :errors="errors"
  >
    <div
      class="flex relative"
    >
      <AntBaseInput
        v-model:value="_modelValue"
        :type="BaseInputType.number"
        :grouped="Grouped.left"
        wrapper-class="flex-grow"
        :color-type="colorType"
        :size="size"
        :min="min"
        :max="max"
        :skeleton="skeleton"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :show-icon="false"
        :has-errors="hasErrors"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      />

      <AntButton
        :icon-left="typeof unit === 'object' ? unit : undefined"
        :grouped="Grouped.right"
        :color-type="_colorType as unknown as ColorType"
        :size="size"
        :skeleton="skeleton"
        :readonly="true"
      >
        <span
          v-if="typeof unit === 'string'"
        >
          {{ unit }}
        </span>
      </AntButton>
    </div>
  </AntField>
</template>
