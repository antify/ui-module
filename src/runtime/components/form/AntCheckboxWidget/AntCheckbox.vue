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
import { Validator } from '@antify/validate';

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
      validator?: Validator;
    }>(), {
      colorType: InputColorType.base,
      size: Size.md,
      skeleton: false,
      disabled: false,
      readonly: false,
    });

const _value = useVModel(props, 'modelValue', emits);
const _skeleton = useVModel(props, 'skeleton', emits);

const hasAction = computed(() => (!_skeleton.value && !props.readonly && !props.disabled));

const inputClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0 bg-neutral-lighter border-0': true,
    'outline outline-1 outline-offset-[-1px] outline-neutral-light rounded': true,
    'focus:ring-offset-0': true,
    'invisible': _skeleton.value,
    'cursor-pointer': hasAction.value,
    'focus:ring-2': props.size === Size.sm && hasAction.value,
    'focus:ring-4': props.size === Size.md && hasAction.value,
    'h-5 w-5': props.size === Size.md,
    'h-4 w-4': props.size === Size.sm,
    'cursor-not-allowed opacity-50': props.disabled
  };

  const focusColorVariant = {
    [InputColorType.base]: 'focus:ring-primary-lighter',
    [InputColorType.danger]: 'focus:ring-danger-lighter',
    [InputColorType.info]: 'focus:ring-info-lighter',
    [InputColorType.success]: 'focus:ring-success-lighter',
    [InputColorType.warning]: 'focus:ring-warning-lighter',
  };

  const activeColorVariant = {
    [InputColorType.base]: 'text-primary outline-primary focus:outline-primary',
    [InputColorType.danger]: 'text-danger outline-danger focus:outline-danger',
    [InputColorType.info]: 'text-info outline-info focus:outline-info',
    [InputColorType.success]: 'text-success outline-success focus:outline-success',
    [InputColorType.warning]: 'text-warning outline-warning focus:outline-warning',
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
    :skeleton="_skeleton"
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
          class="absolute !text-neutral-lightest pointer-events-none"
          :size="size as unknown as IconSize"
        />

        <AntSkeleton
          v-model="_skeleton"
          absolute
          rounded
        />
      </div>

      <div class="relative">
        <span :class="valueClass">
          {{ valueLabel }}
        </span>

        <AntSkeleton
          v-model="_skeleton"
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
