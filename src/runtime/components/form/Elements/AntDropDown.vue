<script setup lang="ts">
/**
 * This is the custom DropDown for each element (like select / tag-select)
 *
 * TODO:: add screen reader support
 * Fix overflow bug (See Ellipsis Text story)
 * TODO:: if the dropdown is open and the user types something, the element with a matching value should be focused.
 */

import { computed, nextTick, ref, watch } from 'vue';
import { InputColorType, Size } from '../../../enums';
import type { SelectOption } from '../__types';
import { useVModel } from '@vueuse/core';
import type { Validator } from '@antify/validate';

const emit = defineEmits(['update:open', 'update:modelValue']);
const props = withDefaults(defineProps<{
  modelValue: string | number | null;
  open: boolean;
  options: SelectOption[];
  colorType?: InputColorType;
  validator?: Validator;
  size?: Size;
  inputRef?: HTMLElement | null;
  focusOnOpen?: boolean;
}>(), {
  colorType: InputColorType.base,
  focusOnOpen: true,
});

const _modelValue = useVModel(props, 'modelValue', emit);
const isOpen = useVModel(props, 'open', emit);

const focusedDropDownItem = ref<string | number | null>(null);
const dropDownRef = ref<HTMLElement | null>(null);

const dropdownClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'bg-neutral-300 border-neutral-300',
    [InputColorType.success]: 'bg-success-500 border-success-500',
    [InputColorType.info]: 'bg-info-500 border-info-500',
    [InputColorType.warning]: 'bg-warning-500 border-warning-500',
    [InputColorType.danger]: 'bg-danger-500 border-danger-500',
  };

  return {
    'absolute w-full border flex flex-col gap-px outline-none -mt-px overflow-hidden shadow-md z-40': true,
    'rounded-bl-md rounded-br-md': true,
    [variants[props.colorType]]: true,
    // Size
    'text-xs': props.size === Size.sm,
    'text-sm': props.size === Size.md,
  };
});
const dropDownItemClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'bg-neutral-50 text-neutral-50-font',
    [InputColorType.success]: 'bg-success-100 border-success-100-font',
    [InputColorType.info]: 'bg-info-100 border-info-100-font',
    [InputColorType.warning]: 'bg-warning-100 border-warning-100-font',
    [InputColorType.danger]: 'bg-danger-100 border-danger-100-font',
  };

  return {
    'select-none text-ellipsis overflow-hidden whitespace-nowrap': true,
    [variants[props.colorType]]: true,
    // Size
    'p-1.5': props.size === Size.sm,
    'p-2.5': props.size === Size.md,
  };
});

watch(isOpen, (val) => {
  nextTick(() => {
    if (val && props.focusOnOpen) {
      dropDownRef.value?.focus();
    }
    focusedDropDownItem.value = _modelValue.value || props.options[0].value;
  });
});

function onKeyDownDropDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    isOpen.value = false;
    _modelValue.value = focusedDropDownItem.value;
    props.inputRef?.focus();
  }

  if (e.key === 'Escape') {
    isOpen.value = false;
    props.inputRef?.focus();
  }

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const index = props.options.findIndex(option => option.value === focusedDropDownItem.value);
    const option = props.options[index + 1];

    if (index === -1) {
      focusedDropDownItem.value = props.options[0].value
    } else if (option !== undefined) {
      focusedDropDownItem.value = option.value
    }
  }

  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const index = props.options.findIndex(option => option.value === focusedDropDownItem.value);
    const option = props.options[index - 1];

    if (option !== undefined) {
      focusedDropDownItem.value = option.value
    }
  }

  if (e.key === 'Tab') {
    isOpen.value = false;
  }
}

function getActiveDropDownItemClasses(option: SelectOption) {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'bg-neutral-50/25',
    [InputColorType.success]: 'bg-success-100/25',
    [InputColorType.info]: 'bg-info-100/25',
    [InputColorType.warning]: 'bg-warning-100/25',
    [InputColorType.danger]: 'bg-danger-100/25',
  };

  return option.value === focusedDropDownItem.value ? {[variants[props.colorType]]: true} : {};
}

function onClickDropDownItem(e: MouseEvent, value: string | number | null) {
  e.preventDefault();
  props.inputRef?.focus();

  isOpen.value = false;
  _modelValue.value = value;
}

watch(_modelValue, (val) => {
  focusedDropDownItem.value = val;
});
</script>

<template>
  <div
    v-if="isOpen"
    :class="dropdownClasses"
    @keydown="onKeyDownDropDown"
    ref="dropDownRef"
    tabindex="0"
  >
    <div
      v-for="(option, index) in options"
      :key="`option-${index}`"
      :class="{...dropDownItemClasses, ...getActiveDropDownItemClasses(option)}"
      @mousedown="(e) => onClickDropDownItem(e, option.value)"
      @mouseover="() => focusedDropDownItem = option.value"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<style scoped>

</style>
