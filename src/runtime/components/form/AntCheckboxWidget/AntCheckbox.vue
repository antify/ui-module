<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { AntField } from '../Elements';
import { InputColorType, Size } from '../../../enums';
import AntSkeleton from '../../AntSkeleton.vue';
import { computed, onMounted, watch } from 'vue';
import { handleEnumValidation } from '../../../handler';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../../AntIcon.vue';
import { IconSize } from '../../__types';
import { FieldValidator } from '@antify/validate';

const emits = defineEmits([ 'update:modelValue', 'update:skeleton' ]);
const props =
  withDefaults(
    defineProps<{
      modelValue: boolean;
      valueLabel?: string;
      label?: string;
      description?: string;
      colorType?: InputColorType;
      size?: Size,
      skeleton?: boolean;
      disabled?: boolean;
      readonly?: boolean;
      validator?: FieldValidator;
    }>(), {
      colorType: InputColorType.base,
      size: Size.md,
      skeleton: false,
      disabled: false,
      readonly: false,
    });

const _value = useVModel(props, 'modelValue', emits);
const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled));
const inputClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0 bg-neutral-100 border-0': true,
    'outline outline-1 outline-offset-[-1px] outline-neutral-300 rounded': true,
    'focus:ring-offset-0': true,
    'invisible': props.skeleton,
    'cursor-pointer': hasAction.value,
    'focus:ring-2': props.size === Size.sm && hasAction.value,
    'focus:ring-4': props.size === Size.md && hasAction.value,
    'h-5 w-5': props.size === Size.md,
    'h-4 w-4': props.size === Size.sm,
    'cursor-not-allowed opacity-50': props.disabled
  };

  const focusColorVariant = {
    [InputColorType.base]: 'text-primary-500 focus:ring-primary-100',
    [InputColorType.danger]: 'text-danger-500 focus:ring-danger-100',
    [InputColorType.info]: 'text-info-500 focus:ring-info-100',
    [InputColorType.success]: 'text-success-500 focus:ring-success-100',
    [InputColorType.warning]: 'text-warning-500 focus:ring-warning-100',
  };

  const activeColorVariant = {
    [InputColorType.base]: 'text-primary-500 outline-primary-500 focus:outline-primary-500',
    [InputColorType.danger]: 'text-danger-500 outline-danger-500 focus:outline-danger-500',
    [InputColorType.info]: 'text-info-500 outline-info-500 focus:outline-info-500',
    [InputColorType.success]: 'text-success-500 outline-success-500 focus:outline-success-500',
    [InputColorType.warning]: 'text-warning-500 outline-warning-500 focus:outline-warning-500',
  }

  classes[focusColorVariant[props.colorType]] = hasAction.value;
  classes[activeColorVariant[props.colorType]] = _value.value;

  return classes;
});

const valueClass = computed(() => {
  const classes = {
    'text-sm': true,
    'cursor-not-allowed opacity-50': props.disabled,
  };

  return classes;
});

watch(_value, () => {
  props.validator?.validate(_value.value);
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :skeleton="skeleton"
    :color-type="colorType"
    :validator="validator"
    :size="size"
    :expanded="false"
  >
    <div class="flex items-center gap-1.5">
      <div class="relative full-height flex items-center">
        <input
          v-model="_value"
          :class="inputClasses"
          type="checkbox"
          :aria-checked="_value"
          :disabled="disabled || readonly"
        />

        <AntIcon
          v-if="_value"
          :icon="faCheck"
          class="absolute !text-white pointer-events-none"
          :size="size as unknown as IconSize"
        />

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
        />
      </div>

      <div class="relative">
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
