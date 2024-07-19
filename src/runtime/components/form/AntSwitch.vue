<script setup lang="ts">
import AntField from './Elements/AntField.vue';
import {computed, type Ref, watch} from 'vue';
import AntSkeleton from '../AntSkeleton.vue';
import {InputState, Size} from '../../enums';
import {AntSwitchSize} from './__types/AntSwitchTypes';

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'validate']);
const props = withDefaults(defineProps<{
  modelValue: boolean;
  label?: string;
  value?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  size?: AntSwitchSize;
  state?: InputState
  errors?: string[]
}>(), {
  size: AntSwitchSize.md,
  state: InputState.base,
  errors: () => []
});

const _value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value);
    emit('input', value);
  }
});
const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled));
const _state: Ref<InputState> = computed(() => props.errors.length > 0 ? InputState.danger : props.state);

const buttonClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0': true,
    'focus:outline-none': true,
    'rounded-full transition-colors ease-in-out duration-200': true,
    'focus-within:ring-2': props.size === AntSwitchSize.sm,
    'focus-within:ring-4': props.size === AntSwitchSize.md,
    'h-4 w-[30px]': props.size === AntSwitchSize.sm,
    'h-5 w-9': props.size === AntSwitchSize.md,
    'bg-neutral-300': !_value.value,
    'invisible': props.skeleton,
    // Disabled
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-default': props.readonly
  };

  const colorVariant = {
    [InputState.base]: 'focus-within:ring-primary-200',
    [InputState.danger]: 'focus-within:ring-danger-200 outline outline-1 -outline-offset-1 outline-danger-500',
    [InputState.info]: 'focus-within:ring-info-200 outline outline-1 -outline-offset-1 outline-info-500',
    [InputState.success]: 'focus-within:ring-success-200 outline outline-1 -outline-offset-1 outline-success-500',
    [InputState.warning]: 'focus-within:ring-warning-200 outline outline-1 -outline-offset-1 outline-warning-500',
  };
  const activeColorVariant = {
    [InputState.base]: 'bg-primary-500',
    [InputState.danger]: 'bg-danger-500',
    [InputState.info]: 'bg-info-500',
    [InputState.success]: 'bg-success-500',
    [InputState.warning]: 'bg-warning-500',
  };

  classes[colorVariant[_state.value]] = true;
  classes[activeColorVariant[_state.value]] = _value.value;

  return classes;
});

const ballClasses = computed(() => ({
  'pointer-events-none inline-block rounded-full bg-neutral-100 shadow transform ring-0 transition ease-in-out duration-200': true,
  'h-4 w-4 translate-y-0.5': props.size === AntSwitchSize.md,
  'h-3.5 w-3.5  translate-y-[1px]': props.size === AntSwitchSize.sm,
  'translate-x-[1.125rem]': _value.value && props.size === AntSwitchSize.md,
  'translate-x-0.5': !_value.value && props.size === AntSwitchSize.md,
  'translate-x-[.925rem]': _value.value && props.size === AntSwitchSize.sm,
  'translate-x-[1px]': !_value.value && props.size === AntSwitchSize.sm,
  'invisible': props.skeleton
}));

const valueClasses = computed(() => ({
  'text-for-white-bg-font': true,
  'text-xs': props.size === AntSwitchSize.sm,
  'text-sm': props.size === AntSwitchSize.md,
  'opacity-50 cursor-not-allowed': props.disabled
}));

const fieldSize = computed(() => {
  if (props.size === AntSwitchSize.md) {
    return Size.sm;
  } else {
    return Size.xs;
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

function changeValue() {
  if (!props.readonly && !props.disabled) {
    _value.value = !_value.value;
  }
}

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}
</script>

<template>
  <AntField
    :label="label"
    :size="fieldSize"
    :description="description"
    :skeleton="skeleton"
    :state="state"
    :errors="errors"
    :expanded="false"
  >
    <div class="relative w-fit flex items-center gap-1.5">
      <div class="relative w-fit flex items-center">
        <button
          v-bind="$attrs"
          type="button"
          :class="buttonClasses"
          role="switch"
          :aria-checked="_value"
          :disabled="disabled"
          :tabindex="hasAction ? 1 : -1"
          @click="changeValue"
          @blur="onBlur"
        >
          <span
            aria-hidden="true"
            :class="ballClasses"
          >
            <slot name="icon"></slot>
          </span>
        </button>

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded-full
        ></AntSkeleton>
      </div>

      <div
        v-if="value"
        class="relative flex items-center"
        :class="props.size === AntSwitchSize.md ? 'h-5' : 'h-4'"
      >
        <span :class="valueClasses">{{ value }}</span>

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
          class="l-1.5"
        ></AntSkeleton>
      </div>
    </div>
  </AntField>
</template>
