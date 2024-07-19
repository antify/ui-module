<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AntField} from '../Elements';
import {InputState, Size} from '../../../enums';
import AntSkeleton from '../../AntSkeleton.vue';
import {computed, onMounted, ref, watch} from 'vue';
import {handleEnumValidation} from '../../../handler';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../../AntIcon.vue';
import {IconSize} from '../../__types';
import {AntCheckboxSize} from './__types/AntCheckbox';

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate', 'blur']);
const props =
  withDefaults(
    defineProps<{
      modelValue: boolean | null;
      valueLabel?: string;
      label?: string;
      description?: string;
      state?: InputState;
      size?: AntCheckboxSize,
      skeleton?: boolean;
      disabled?: boolean;
      readonly?: boolean;
      errors?: string[];
    }>(), {
      state: InputState.base,
      size: AntCheckboxSize.md,
      skeleton: false,
      disabled: false,
      readonly: false,
      errors: () => []
    });

const _value = useVModel(props, 'modelValue', emit);
const delayedValue = ref(_value.value);
const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled));
const _state = computed(() => props.errors.length > 0 ? InputState.danger : props.state);
const inputClasses = computed(() => {
  const focusColorVariant: Record<InputState, string> = {
    [InputState.base]: 'focus:ring-primary-200',
    [InputState.danger]: 'focus:ring-danger-200',
    [InputState.info]: 'focus:ring-info-200',
    [InputState.success]: 'focus:ring-success-200',
    [InputState.warning]: 'focus:ring-warning-200',
  };
  const activeColorVariant: Record<InputState, string> = {
    [InputState.base]: 'text-primary-500',
    [InputState.danger]: 'text-danger-500',
    [InputState.info]: 'text-info-500',
    [InputState.success]: 'text-success-500',
    [InputState.warning]: 'text-warning-500',
  };
  const inactiveColorVariant: Record<InputState, string> = {
    [InputState.base]: 'outline-neutral-300',
    [InputState.danger]: 'outline-danger-500',
    [InputState.info]: 'outline-info-500',
    [InputState.success]: 'outline-success-500',
    [InputState.warning]: 'outline-warning-500',
  };

  return {
    'relative inline-flex flex-shrink-0 bg-neutral-100 border-0': true,
    'outline outline-1 outline-offset-[-1px] rounded': true,
    'focus:ring-offset-0': true,
    'invisible': props.skeleton,
    'cursor-pointer': hasAction.value,
    'focus:ring-2': props.size === AntCheckboxSize.sm && hasAction.value,
    'focus:ring-4': props.size === AntCheckboxSize.md && hasAction.value,
    'h-5 w-5': props.size === AntCheckboxSize.md,
    'h-4 w-4': props.size === AntCheckboxSize.sm,
    'cursor-not-allowed opacity-50': props.disabled,
    [focusColorVariant[_state.value]]: hasAction.value,
    [activeColorVariant[_state.value]]: delayedValue.value,
    [inactiveColorVariant[_state.value]]: !_value.value,
  };
});

const valueClass = computed(() => ({
  'text-for-white-bg-font': true,
  'cursor-not-allowed opacity-50': props.disabled,
  'text-sm': props.size === AntCheckboxSize.md,
  'text-xs': props.size === AntCheckboxSize.sm
}));

const fieldSize = computed(() => {
  if (props.size === AntCheckboxSize.md) {
    return Size.sm;
  } else {
    return Size.xs;
  }
});

/**
 * Delay value to change the checkboxes background color after
 * animation is finished.
 */
watch(_value, (val) => {
  if (val === false) {
    setTimeout(() => delayedValue.value = false, 120);
  } else {
    delayedValue.value = true;
  }
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
watch(_value, () => {
  if (props.errors.length > 0) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

onMounted(() => {
  handleEnumValidation(props.size, AntCheckboxSize, 'size');
  handleEnumValidation(props.state, InputState, 'state');
});
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :skeleton="skeleton"
    :state="state"
    :size="fieldSize"
    :expanded="false"
    :errors="errors"
  >
    <div class="flex items-center gap-1.5">
      <div class="relative full-height flex items-center">
        <input
          v-model="_value"
          :class="inputClasses"
          type="checkbox"
          :aria-checked="_value"
          :disabled="disabled || readonly"
          @blur="onBlur"
        />

        <AntIcon
          v-if="_value"
          :icon="faCheck"
          class="absolute !text-white pointer-events-none"
          :size="size === AntCheckboxSize.md ? IconSize.sm : IconSize.xs"
        />

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
        />
      </div>

      <div
        class="relative flex items-center"
        :class="props.size === AntCheckboxSize.md ? 'h-5' : 'h-4'"
      >
        <span :class="valueClass">
          {{ valueLabel }}
        </span>

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
        />
      </div>
    </div>
  </AntField>
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;

  position: relative;
}

input[type="checkbox"]::before {
  content: "";

  position: absolute;

  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: 120ms transform;
  background: currentColor;
  border-radius: inherit;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
