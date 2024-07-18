<script setup lang="ts">
import { type AntCheckboxType, AntCheckboxSize } from './__types/AntCheckbox';
import { AntField } from '../Elements';
import { useVModel } from '@vueuse/core';
import AntCheckbox from './AntCheckbox.vue';
import { computed, watch } from 'vue';
import { Direction } from '../../../enums/Direction.enum';
import { InputState } from '../../../enums';
import { FieldValidator } from '@antify/validate';

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<{
    modelValue: string[];
    checkboxes?: AntCheckboxType[];
    label?: string;
    description?: string;
    direction?: Direction;
    state?: InputState;
    size?: AntCheckboxSize,
    skeleton?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    validator?: FieldValidator;
  }>(),
  {
    direction: Direction.column,
    state: InputState.base,
    size: AntCheckboxSize.md,
    skeleton: false,
    readonly: false,
    disabled: false
  }
);

const _value = useVModel(props, 'modelValue', emits);
const _state = computed(() => props.validator?.hasErrors() ? InputState.danger : props.state);
const containerClasses = computed(() => {
  const classes = {
    'flex gap-2.5': true,
    'flex-row': props.direction === Direction.row,
    'flex-col': props.direction === Direction.column
  };

  return classes;
});

function updateValue(value: string) {
  const index = _value.value.indexOf(value);

  if (index === -1) {
    _value.value.push(value);
  } else {
    _value.value.splice(index, 1);
  }
}

watch(_value, () => {
  props.validator?.validate(_value.value);
}, {
  deep: true,
});

</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :skeleton="skeleton"
    :validator="validator"
    :state="_state"
    :size="size"
    label-for="noop"
  >
    <div :class="containerClasses">
      <AntCheckbox
        v-for="(checkbox, index) in checkboxes"
        :key="`checkbox-group-${index}`"
        :model-value="_value.indexOf(checkbox.value) !== -1"
        :value-label="checkbox.label"
        :size="size"
        :state="_state"
        :skeleton="skeleton"
        :disabled="disabled || checkbox.disabled"
        :readonly="readonly || checkbox.readonly"
        @update:model-value="updateValue(checkbox.value)"
      />
    </div>
  </AntField>
</template>
