<script lang="ts" setup>
import AntRadio from './AntRadio.vue';
import { useVModel } from '@vueuse/core';
import { AntField } from '../Elements';
import { type AntRadioType, AntRadioSize } from './__types/AntRadio.type';
import { InputState, Size } from '../../../enums';
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
    state?: InputState;
    size?: AntRadioSize;
    skeleton?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    validator?: FieldValidator;
  }>(), {
    direction: Direction.column,
    state: InputState.base,
    size: AntRadioSize.md,
    skeleton: false,
    disabled: false,
    readonly: false
  });

const _value = useVModel(props, 'modelValue', emits);
const _state: Ref<InputState | undefined> = computed(() => props.validator?.hasErrors() ? InputState.danger : undefined);
const containerClasses = computed(() => {
  const classes = {
    'flex gap-2.5 justify-start': true,
    'flex-row': props.direction === Direction.row,
    'flex-col': props.direction === Direction.column,
  };

  return classes;
});

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
    :state="state"
    :skeleton="skeleton"
    :validator="validator"
    :size="size as unknown as Size"
    label-for="noop"
  >
    <div
      :class="containerClasses"
    >
      <AntRadio
        v-for="(radio, index) in radioButtons"
        :key="`radio-button-widget_${radio.value}-${index}`"
        v-model="_value"
        :value="radio"
        :skeleton="skeleton"
        :disabled="disabled || radio.disabled"
        :readonly="readonly || radio.readonly"
        :state="_state || radio.state || state"
        :size="size"
      />
    </div>
  </AntField>
</template>
