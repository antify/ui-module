<script setup lang="ts">
import AntField from './Elements/AntField.vue';
import { computed, type Ref } from 'vue';
import { FieldValidator } from '@antify/validate';
import AntSkeleton from '../AntSkeleton.vue';
import { InputColorType, Size } from '../../enums';
import {AntSwitchSize} from './__types/AntSwitchTypes';

const emits = defineEmits([ 'update:modelValue', 'input' ]);
const props = withDefaults(defineProps<{
  modelValue: boolean;
  label?: string;
  value?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  validator?: FieldValidator;
  size?: AntSwitchSize;
  colorType?: InputColorType
}>(), {
  size: AntSwitchSize.md,
  colorType: InputColorType.base
});

const _value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emits('update:modelValue', value)
    emits('input', value)
  }
});
const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled))
const _colorType: Ref<InputColorType> = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);

const buttonClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0': true,
    'focus:outline-none': true,
    'rounded-full transition-colors ease-in-out duration-200': true,
    'focus-within:ring-2': props.size === AntSwitchSize.sm && hasAction.value,
    'focus-within:ring-4': props.size === AntSwitchSize.md && hasAction.value,
    'h-4 w-[30px]': props.size === AntSwitchSize.sm,
    'h-5 w-9': props.size === AntSwitchSize.md,
    'bg-neutral-300': !_value.value,
    'invisible': props.skeleton,
    // Disabled
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-default': props.readonly
  };

  const colorVariant = {
    [InputColorType.base]: 'focus-within:ring-primary-100',
    [InputColorType.danger]: 'focus-within:ring-danger-100',
    [InputColorType.info]: 'focus-within:ring-info-100',
    [InputColorType.success]: 'focus-within:ring-success-100',
    [InputColorType.warning]: 'focus-within:ring-warning-100',
  };
  const activeColorVariant = {
    [InputColorType.base]: 'bg-primary-500',
    [InputColorType.danger]: 'bg-danger-500',
    [InputColorType.info]: 'bg-info-500',
    [InputColorType.success]: 'bg-success-500',
    [InputColorType.warning]: 'bg-warning-500',
  };

  classes[colorVariant[_colorType.value]] = hasAction.value;
  classes[activeColorVariant[_colorType.value]] = _value.value;

  return classes;
})

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

const valueClasses = computed(() => {
  const classes = {
    'text-for-white-bg-font': true,
    'text-sm': props.size === AntSwitchSize.sm,
    'text-md': props.size === AntSwitchSize.md,
    'opacity-50 cursor-not-allowed': props.disabled
  }

  return classes;
})

function changeValue() {
  if (!props.readonly && !props.disabled) {
    _value.value = !_value.value
  }
}
</script>

<template>
  <AntField
    :label="label"
    :size="size as unknown as Size"
    :description="description"
    :skeleton="skeleton"
    :validator="validator"
    :color-type="colorType"
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
          :tabindex="readonly ? -1 : 1"
          @click="changeValue"
          @blur="validator?.validate(_value)"
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
        class="relative"
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
