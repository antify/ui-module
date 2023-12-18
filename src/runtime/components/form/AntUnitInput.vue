<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {onMounted} from 'vue';
import AntButton from './AntButton.vue'
import AntField from './Elements/AntField.vue'
import AntBaseInput from './Elements/AntBaseInput.vue'
import {Size} from '../../enums/Size.enum'
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {useVModel} from '@vueuse/core';
import {ColorType, InputColorType} from '../../enums';
import {Grouped} from '../../enums/Grouped.enum';
import {BaseInputType} from './Elements/__types';
import {handleEnumValidation} from '../../handler';

// TODO:: implement missing validator
const props = withDefaults(defineProps<{
  modelValue: number | null;
  unit: string | IconDefinition;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  wrapperClass?: string | Record<string, boolean>;
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
});
const emits = defineEmits(['update:modelValue', 'update:skeleton']);

const _skeleton = useVModel(props, 'skeleton', emits);
const _modelValue = useVModel(props, 'modelValue', emits);

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <AntField
      :label="label"
      :size="size"
      :skeleton="_skeleton"
      :description="description"
      :colorType="colorType"
      :class="wrapperClass"
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
          :skeleton="_skeleton"
          :disabled="disabled"
          :placeholder="placeholder || label"
          :show-icon="false"
          v-bind="$attrs"
      />

      <AntButton
          :icon-left="typeof unit === 'object' ? unit : undefined"
          :grouped="Grouped.right"
          :color-type="colorType as unknown as ColorType"
          :size="size"
          :skeleton="_skeleton"
          :readonly="true"
      >
        <span v-if="typeof unit === 'string'">
          {{ unit }}
        </span>
      </AntButton>
    </div>
  </AntField>
</template>
