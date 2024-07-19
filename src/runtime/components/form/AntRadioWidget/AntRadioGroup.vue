<script lang="ts" setup>
import AntRadio from './AntRadio.vue';
import { useVModel } from '@vueuse/core';
import { AntField } from '../Elements';
import { type AntRadioType, AntRadioSize } from './__types/AntRadio.type';
import { InputState, Size } from '../../../enums';
import { FieldValidator } from '@antify/validate';
import {computed, ref, type Ref, watch} from 'vue';
import { Direction } from '../../../enums/Direction.enum';

defineOptions({ inheritAttrs: false });

const emit = defineEmits([ 'update:modelValue', 'update:skeleton', 'validate' ]);
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
    errors?: string[];
  }>(), {
    direction: Direction.column,
    state: InputState.base,
    size: AntRadioSize.md,
    skeleton: false,
    disabled: false,
    readonly: false,
    errors: () => []
  });

const _value = useVModel(props, 'modelValue', emit);
const _state: Ref<InputState | undefined> = computed(() => props.errors?.length > 0 ? InputState.danger : props.state);
const containerClasses = computed(() => {
  const classes = {
    'flex gap-2.5 justify-start': true,
    'flex-row': props.direction === Direction.row,
    'flex-col': props.direction === Direction.column,
  };

  return classes;
});
const containerRef = ref<null | HTMLElement>(null);

const fieldSize = computed(() => {
  if (props.size === AntRadioSize.md) {
    return Size.sm;
  } else {
    return Size.xs;
  }
});

watch(_value, () => {
  if (props.errors.length > 0) {
    emit('validate', props.modelValue);
  }
}, {
  deep: true,
});

function hasFocusedRadio() {
  return !!containerRef.value?.querySelector('input[type="radio"]:focus');
}

function onBlurRadio() {
  setTimeout(() => {
    if (!hasFocusedRadio()) {
      emit('validate', _value.value);
    }
  }, 100);
}
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :state="state"
    :skeleton="skeleton"
    :errors="errors"
    :size="fieldSize"
    label-for="noop"
  >
    <div
      ref="containerRef"
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
        @blur="onBlurRadio"
      />
    </div>
  </AntField>
</template>
