<script lang="ts" setup>
import {AntField} from './Elements';
import {InputState, Size} from '../../enums';
import AntSkeleton from '../AntSkeleton.vue';
import {computed, onMounted, watch} from 'vue';
import {AntRadioSize, type AntRadioTypes} from './__types/AntRadio.types';
import {handleEnumValidation} from '../../handler';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate', 'blur']);
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    value: AntRadioTypes;
    description?: string;
    skeleton?: boolean;
    state?: InputState;
    size?: AntRadioSize
    readonly?: boolean;
    disabled?: boolean;
    messages?: string[];
  }>(), {
    state: InputState.base,
    size: AntRadioSize.md,
    readonly: false,
    disabled: false,
    messages: () => []
  }
);
const _modelValue = computed({
  get(): string | null | AntRadioTypes {
    return props.modelValue;
  },
  set(val: string | null | AntRadioTypes) {
    emit('update:modelValue', val ? typeof val === 'string' ? val : val.value : null);
  }
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const isActive = computed(() => _modelValue.value === props.value.value);
const inputClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0': true,
    'focus:ring-offset-0 outline outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1 rounded-full': true,
    'flex items-center justify-center rounded-full appearance-none': true,
    'cursor-pointer': !hasInputState.value,
    'rounded-full transition-colors ease-in-out duration-200 disabled:opacity-50': true,
    'focus:ring-2': props.size === AntRadioSize.sm && !hasInputState.value,
    'focus:ring-4': props.size === AntRadioSize.md && !hasInputState.value,
    'outline-neutral-300': props.state === InputState.base,
    'outline-primary-500': props.state === InputState.base && isActive.value,
    'outline-info-500': props.state === InputState.info,
    'outline-success-500': props.state === InputState.success,
    'outline-warning-500': props.state === InputState.warning,
    'outline-danger-500': props.state === InputState.danger,
    'h-4 w-4 small': props.size === AntRadioSize.sm,
    'h-5 w-5': props.size === AntRadioSize.md,
  };

  const focusColorVariant = {
    [InputState.base]: 'focus:ring-primary-200',
    [InputState.danger]: 'focus:ring-danger-200',
    [InputState.info]: 'focus:ring-info-200',
    [InputState.success]: 'focus:ring-success-200',
    [InputState.warning]: 'focus:ring-warning-200',
  };

  classes[focusColorVariant[props.state]] = !hasInputState.value;

  return classes;
});
const valueClass = computed(() => ({
  'relative w-fit full-height text-for-white-bg-font': true,
  'cursor-pointer': !hasInputState.value,
  'cursor-not-allowed opacity-50': props.disabled,
  'text-sm': props.size === AntRadioSize.md,
  'text-xs': props.size === AntRadioSize.sm
}));
const fieldSize = computed(() => {
  if (props.size === AntRadioSize.md) {
    return Size.sm;
  } else {
    return Size.xs;
  }
});
const innerRadioColor = computed(() => {
  switch (props.state) {
    case InputState.info:
      return 'bg-info-500';
    case InputState.success:
      return 'bg-success-500';
    case InputState.warning:
      return 'bg-warning-500';
    case InputState.danger:
      return 'bg-danger-500';
    default:
      return 'bg-primary-500';
  }
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(_modelValue, (val) => {
  if ([InputState.danger, InputState.warning, InputState.info].includes(props.state)) {
    emit('validate', val);
  }
}, {deep: true});
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');

  /**
   * Validate default value without delayed data fetching.
   */
  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
</script>

<template>
  <AntField
    :description="description"
    :state="state"
    class="cursor-pointer"
    :skeleton="skeleton"
    :size="fieldSize"
    :expanded="false"
    :messages="messages"
  >
    <div class="flex items-center gap-1.5">
      <div class="relative full-height flex items-center">
        <div class="absolute flex items-center justify-center w-full h-full">
          <Transition name="fade-radio">
            <div
              v-if="isActive"
              class="w-3 h-3 rounded-full transition-all"
              :class="innerRadioColor"
            />
          </Transition>
        </div>

        <input
          v-model="_modelValue"
          :value="value.value"
          :class="inputClasses"
          type="radio"
          :aria-checked="isActive"
          :disabled="disabled || readonly"
          @blur="onBlur"
        />

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded-full
        />
      </div>

      <div
        class="relative flex items-center"
        :class="props.size === AntRadioSize.md ? 'h-5' : 'h-4'"
      >
        <span :class="valueClass">
          {{ value.label }}
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
.fade-radio-enter-active,
.fade-radio-leave-active {
  @apply transition-opacity;
}

.fade-radio-enter-from,
.fade-radio-leave-to {
  opacity: 0;
}
</style>
