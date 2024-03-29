<script lang="ts" setup>
import AntRadio from './AntRadio.vue';
import { useVModel } from '@vueuse/core';
import { AntField } from '../Elements';
import { type AntRadioType } from './__types/AntRadio.type';
import { InputColorType, Size } from '../../../enums';
import { FieldValidator } from '@antify/validate';
import { computed, type Ref, watch } from 'vue';
import { Direction } from '../../../enums/Direction.enum';

defineOptions({ inheritAttrs: false });

const emits = defineEmits([ 'update:modelValue', 'update:skeleton' ]);
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    radioButtons: AntRadioType[];
    label?: string;
    description?: string;
    direction?: Direction;
    colorType?: InputColorType;
    size?: Size;
    skeleton?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    validator?: FieldValidator;
  }>(), {
    direction: Direction.column,
    colorType: InputColorType.base,
    size: Size.md,
    skeleton: false,
    disabled: false,
    readonly: false
  });

const _value = useVModel(props, 'modelValue', emits);
const _colorType: Ref<InputColorType | undefined> = computed(() => props.validator?.hasErrors() ? InputColorType.danger : undefined);
const containerClasses = computed(() => {
  const classes = {
    'flex gap-2.5 justify-start': true,
    'flex-row': props.direction === Direction.row,
    'flex-col': props.direction === Direction.column,
  };

  return classes;
})

watch(_value, () => {
  props.validator?.validate(_value.value);
}, {
  deep: true
});
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :color-type="colorType"
    :skeleton="skeleton"
    :validator="validator"
    :size="size"
    label-for="noop"
  >
    <div
      :class="containerClasses"
    >
      <AntRadio
        v-model="_value"
        v-for="(radio, index) in radioButtons"
        :key="`radio-button-widget_${radio.value}-${index}`"
        :value="radio"
        :skeleton="skeleton"
        :disabled="disabled || radio.disabled"
        :readonly="readonly || radio.readonly"
        :color-type="_colorType || radio.colorType || colorType"
      />
    </div>
  </AntField>
</template>
