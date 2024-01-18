<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {computed, onMounted, watch} from 'vue';
import {Size} from '../../enums/Size.enum'
import AntSkeleton from '../AntSkeleton.vue';
import AntIcon from '../AntIcon.vue';
import {Grouped} from '../../enums/Grouped.enum';
import {
  faExclamationTriangle,
  faExclamationCircle,
  faCircleCheck,
  faCircleInfo
} from '@fortawesome/free-solid-svg-icons';
import {handleEnumValidation} from '../../handler';
import {classesToObjectSyntax} from '../../utils';
import AntField from './Elements/AntField.vue';
import {useVModel} from '@vueuse/core';
import {InputColorType} from '../../enums';
import {IconColorType, IconSize} from '../__types';

const emit = defineEmits(['update:modelValue', 'validate', 'blur']);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  grouped?: Grouped;
  wrapperClass?: string | Record<string, boolean>;
  showIcon?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  limiter?: boolean;
  max?: number;
  errors?: string[];
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  size: Size.md,
  skeleton: false,
  grouped: Grouped.none,
  showIcon: true,
  limiter: false,
  errors: []
});
const _modelValue = useVModel(props, 'modelValue', emit);
const icons = {
  [InputColorType.info]: faCircleInfo,
  [InputColorType.warning]: faExclamationTriangle,
  [InputColorType.danger]: faExclamationCircle,
  [InputColorType.success]: faCircleCheck,
  [InputColorType.base]: null,
};
const inputClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'outline-neutral-light focus:outline-primary focus:ring-primary/25 bg-neutral-lightest placeholder:text-neutral',
    [InputColorType.danger]: 'outline-danger focus:outline-danger focus:ring-danger/25 bg-danger-lighter placeholder:text-danger-dark',
    [InputColorType.info]: 'outline-info focus:outline-info focus:ring-info/25 bg-info-lighter placeholder:text-info-dark',
    [InputColorType.success]: 'outline-success focus:outline-success focus:ring-success/25 bg-success-lighter placeholder:text-success-dark',
    [InputColorType.warning]: 'outline-warning focus:outline-warning focus:ring-warning/25 bg-warning-lighter placeholder:text-warning-dark',
  };
  return {
    'block transition-colors relative border-none outline w-full focus:z-10': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    [variants[_colorType.value]]: true,
    // Size
    'focus:ring-2 p-1.5 text-xs': props.size === Size.sm,
    'focus:ring-4 p-2.5 text-sm': props.size === Size.md,
    // Icon right
    'pr-7': props.size === Size.sm && props.showIcon && icon.value,
    'pr-10': props.size === Size.md && props.showIcon && icon.value,
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-md': props.grouped === Grouped.none,
    'invisible': props.skeleton
  };
});
const _wrapperClass = computed(() => classesToObjectSyntax(props.wrapperClass));
const icon = computed(() => icons[_colorType.value]);
const hasErrors = computed(() => props.errors.length > 0);
const _colorType = computed(() => hasErrors.value ? InputColorType.danger : props.colorType);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.grouped, Grouped, 'grouped');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

watch(_modelValue, (val) => {
  if (hasErrors.value) {
    emit('validate', val);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :colorType="colorType"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter ? _modelValue.length : undefined"
    :errors="errors"
  >
    <div class="block relative w-full" :class="{...{'-mr-px': grouped !== Grouped.none}, ..._wrapperClass}">
      <textarea
        v-model="_modelValue"
        :class="inputClasses"
        :placeholder="placeholder !== undefined ? placeholder : label"
        :disabled="disabled || skeleton"
        v-bind="$attrs"
        @blur="onBlur"
      />

      <div
        v-if="showIcon && icon"
        class="absolute flex w-fit right-0 top-0 transition-all z-20"
        :class="{'p-1.5': size === Size.sm, 'p-2.5': size === Size.md}"
      >
        <AntIcon
          :icon="icon"
          :size="size as unknown as IconSize"
          :color-type="_colorType as unknown as IconColorType"
        />
      </div>

      <AntSkeleton
        v-if="skeleton"
        absolute
        :grouped="grouped"
        rounded
      />
    </div>
  </AntField>
</template>
