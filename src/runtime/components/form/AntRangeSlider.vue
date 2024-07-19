<script setup lang="ts">
import AntField from './Elements/AntField.vue';
import {useVModel} from '@vueuse/core';
import {computed, onMounted, watch} from 'vue';
import {InputState, Size} from '../../enums';
import {handleEnumValidation} from '../../handler';

defineOptions({ inheritAttrs: false });

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate', 'blur']);
const props = withDefaults(defineProps<{
  modelValue: number | number[] | undefined;
  label?: string;
  description?: string;
  state?: InputState;
  size?: Size,
  disabled?: boolean;
  skeleton?: boolean;
  min?: number;
  max?: number;
  errors?: string[];
}>(), {
  state: InputState.base,
  size: Size.md,
  disabled: false,
  skeleton: false,
  limiter: false,
  errors: () => []
});

const value = useVModel(props, 'modelValue', emit);
const _state = computed(() => props.errors.length > 0 ? InputState.danger : props.state);
const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-neutral-base',
    [InputState.danger]: 'text-danger-base',
    [InputState.info]: 'text-info-base',
    [InputState.success]: 'text-success-base',
    [InputState.warning]: 'text-warning-base',
  };

  return {
    'ant-range-slider transition-colors relative border-none w-full focus:z-10 h-2 bg-neutral-300 rounded-md outline-none': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    'invisible': props.skeleton,
    [variants[_state.value]]: true
  };
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
watch(value, () => {
  if (props.errors.length > 0) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :errors="errors"
  >
    <input
      v-model="value"
      :class="inputClasses"
      type="range"
      :disabled="disabled || skeleton"
      :min="min"
      :max="max"
      v-bind="$attrs"
      @blur="onBlur"
    >
  </AntField>
</template>

<style scoped>
.ant-range-slider {
  -webkit-appearance: none;
}

.ant-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  border-radius: 100%;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #fff;
  border: 1px solid #CBD5E1;
  cursor: pointer;
}

.ant-range-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}
</style>
