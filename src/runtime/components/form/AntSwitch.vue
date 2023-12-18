<script setup lang="ts">
import AntField from './Elements/AntField.vue';
import { useVModel } from '@vueuse/core';
import { computed, type Ref } from 'vue';
import { Validator } from '@antify/validate';
import AntSkeleton from '../AntSkeleton.vue';
import { InputColorType, Size } from '../../enums';

const emits = defineEmits([ 'update:modelValue', 'update:skeleton' ]);
const props = withDefaults(defineProps<{
  modelValue: boolean;
  label?: string;
  value?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  validator?: Validator;
  size?: Size;
  colorType?: InputColorType
}>(), {
  size: Size.md,
  colorType: InputColorType.base
});

const _value = useVModel(props, 'modelValue', emits);
const _skeleton = useVModel(props, 'skeleton', emits);

const hasAction = computed(() => (!_skeleton.value && !props.readonly && !props.disabled))
const _colorType: Ref<InputColorType> = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);

const buttonClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0': true,
    'focus:outline-none': true,
    'rounded-full transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed': true,
    'focus-within:ring-2': props.size === Size.sm && hasAction.value,
    'focus-within:ring-4': props.size === Size.md && hasAction.value,
    'h-4 w-[30px]': props.size === Size.sm,
    'h-5 w-9': props.size === Size.md,
    'bg-neutral-light': !_value.value,
    'invisible': _skeleton.value,
    // Disabled
    'cursor-pointer': !props.disabled,
    'opacity-50 cursor-not-allowed': props.disabled,
  };

  const colorVariant = {
    [InputColorType.base]: 'focus-within:ring-primary-lighter',
    [InputColorType.danger]: 'focus-within:ring-danger-lighter',
    [InputColorType.info]: 'focus-within:ring-info-lighter',
    [InputColorType.success]: 'focus-within:ring-success-lighter',
    [InputColorType.warning]: 'focus-within:ring-warning-lighter',
  };
  const activeColorVariant = {
    [InputColorType.base]: 'bg-primary',
    [InputColorType.danger]: 'bg-danger',
    [InputColorType.info]: 'bg-info',
    [InputColorType.success]: 'bg-success',
    [InputColorType.warning]: 'bg-warning',
  };

  classes[colorVariant[_colorType.value]] = hasAction.value;
  classes[activeColorVariant[_colorType.value]] = _value.value;

  return classes;
})

const ballClasses = computed(() => {
  const classes = {
    'pointer-events-none inline-block rounded-full bg-neutral-lighter shadow transform ring-0 transition ease-in-out duration-200': true,
    'h-4 w-4 translate-y-0.5': props.size === Size.md,
    'h-3.5 w-3.5  translate-y-[1px]': props.size === Size.sm,
    'translate-x-[1.125rem]': _value.value && props.size === Size.md,
    'translate-x-0.5': !_value.value && props.size === Size.md,
    'translate-x-[.925rem]': _value.value && props.size === Size.sm,
    'translate-x-[1px]': !_value.value && props.size === Size.sm,
    'invisible': _skeleton.value
  }

  return classes;
});

const valueClasses = computed(() => {
  const classes = {
    'text-neutral-lightest-font': true,
    'text-sm': props.size === Size.sm,
    'text-md': props.size === Size.md,
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
    :size="size"
    :description="description"
    :skeleton="_skeleton"
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
          v-model="_skeleton"
          absolute
          rounded-full
        ></AntSkeleton>
      </div>

      <div v-if="value" class="relative">
        <span :class="valueClasses">{{ value }}</span>

        <AntSkeleton
          v-model="_skeleton"
          absolute
          rounded
          class="l-1.5"
        ></AntSkeleton>
      </div>
    </div>
  </AntField>
</template>

<style scoped>

</style>
