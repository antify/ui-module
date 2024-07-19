<script setup lang="ts">
import { type AntCheckboxType, AntCheckboxSize } from './__types/AntCheckbox';
import { AntField } from '../Elements';
import { useVModel } from '@vueuse/core';
import AntCheckbox from './AntCheckbox.vue';
import {computed, nextTick, ref, watch} from 'vue';
import { Direction } from '../../../enums/Direction.enum';
import { InputState, Size } from '../../../enums';

const emit = defineEmits(['update:modelValue', 'validate', 'blur']);
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
    errors?: string[]
  }>(),
  {
    direction: Direction.column,
    state: InputState.base,
    size: AntCheckboxSize.md,
    skeleton: false,
    readonly: false,
    disabled: false,
    errors: () => []
  }
);

const _value = useVModel(props, 'modelValue', emit);
const _state = computed(() => props.errors.length > 0 ? InputState.danger : props.state);
const containerClasses = computed(() => {
  const classes = {
    'flex gap-2.5': true,
    'flex-row': props.direction === Direction.row,
    'flex-col': props.direction === Direction.column
  };

  return classes;
});
const containerRef = ref<null | HTMLElement>(null);

watch(_value, () => {
  if (props.errors.length > 0) {
    emit('validate', _value.value);
  }
}, {
  deep: true,
});

function updateValue(value: string) {
  const index = _value.value.indexOf(value);

  if (index === -1) {
    _value.value.push(value);
  } else {
    _value.value.splice(index, 1);
  }
}

function hasFocusedCheckbox() {
  return !!containerRef.value?.querySelector('input[type="checkbox"]:focus');
}

function onBlurCheckbox() {
  setTimeout(() => {
    if (!hasFocusedCheckbox()) {
      emit('validate', _value.value);
    }
  }, 100);
}
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :skeleton="skeleton"
    :state="_state"
    :size="size as unknown as Size"
    :errors="errors"
    label-for="noop"
  >
    <div
      ref="containerRef"
      :class="containerClasses"
    >
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
        @blur="() => onBlurCheckbox()"
      />
    </div>
  </AntField>
</template>
