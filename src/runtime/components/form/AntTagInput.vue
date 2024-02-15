<script setup lang="ts">

import { AntField } from './Elements';
import type { SelectOption } from './__types';
import { Grouped, InputColorType, Size } from '../../enums';
import type { FieldValidator } from '@antify/validate';
import { useVModel } from '@vueuse/core';
import {
  faChevronRight,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { computed, type Ref, ref } from 'vue';
import AntTag from '../AntTag.vue';
import AntIcon from '../AntIcon.vue';
import { IconSize } from '../__types';
import AntDropDown from './Elements/AntDropDown.vue';
import AntSkeleton from '../AntSkeleton.vue';
import { vOnClickOutside } from '@vueuse/components'

const emit = defineEmits([ 'update:modelValue' ]);
const props = withDefaults(
  defineProps<{
    modelValue: (string | number)[] | null;
    options: SelectOption[];
    label?: string;
    description?: string;
    placeholder?: string;
    size?: Size;
    colorType?: InputColorType;
    disabled?: boolean;
    skeleton?: boolean;
    validator?: FieldValidator;
    name?: string;
    showMessageOnError?: boolean;
    expanded?: boolean;
    icon?: IconDefinition;
    grouped?: Grouped;
    nullable?: boolean;

    allowCreate?: boolean;
    allowDuplicates?: boolean;
    openOnFocus?: boolean;
    autoCloseAfterSelection?: boolean;

    createCallback?: (item: string) => Promise<SelectOption>;
  }>(), {
    size: Size.md,
    colorType: InputColorType.base,
    icon: () => faChevronRight,
    grouped: Grouped.none,

    allowCreate: false,
    allowDuplicates: false,
    openOnFocus: true,
    autoCloseAfterSelection: false,
    showMessageOnError: true,

    placeholder: 'Add new tag'
  }
);

const _modelValue: Ref<(string | number)[] | null> = useVModel(props, 'modelValue', emit);
const _skeleton = useVModel(props, 'skeleton', emit);

const dropDownOpen = ref(false);
const focusedDropDownItem: Ref<string | number | null> = ref(null);
const tagInput = ref('');
const filteredOptions = ref(props.options);

const inputRef: Ref<HTMLElement | null> = ref(null);

const _colorType = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);

const inputContainerClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'outline-neutral-300 focus-within:outline-primary-500 focus-within:ring-primary-200 bg-white',
    [InputColorType.danger]: 'outline-danger-500 focus-within:outline-danger-500 focus-within:ring-danger-200 bg-danger-100',
    [InputColorType.info]: 'outline-info-500 focus-within:outline-info-500 focus-within:ring-info-200 bg-info-100',
    [InputColorType.success]: 'outline-success-500 focus-within:outline-success-500 focus-within:ring-success-200 bg-success-100',
    [InputColorType.warning]: 'outline-warning-500 focus-within:outline-warning-500 focus-within:ring-warning-200 bg-warning-100',
  };

  return {
    'flex gap-1 items-center flex-wrap': true,
    'transition-colors relative border-none outline w-full focus-within:z-10': true,
    'outline-offset-[-1px] outline-1 focus-within:outline-offset-[-1px] focus-within:outline-1': true,
    'opacity-50 cursor-not-allowed': props.disabled,
    [variants[_colorType.value]]: true,
    // Size
    'focus-within:ring-2 px-1.5 py-1.5 text-xs': props.size === Size.sm,
    'focus-within:ring-4 px-2.5 py-1.5 text-sm': props.size === Size.md,
    // Grouping
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-md': props.grouped === Grouped.none,
    'rounded-bl-none rounded-br-none': dropDownOpen.value && (!props.options || props.options.length > 0),
    'invisible': props.skeleton,
  };
});

const inputClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'placeholder:text-neutral-500',
    [InputColorType.danger]: 'placeholder:text-danger-700',
    [InputColorType.info]: 'placeholder:text-info-700',
    [InputColorType.success]: 'placeholder:text-success-700',
    [InputColorType.warning]: 'placeholder:text-warning-700',
  };

  return {
    'outline-0 border:none ring:none bg-transparent w-full': true,
    'opacity-50 cursor-not-allowed': props.disabled,
    [variants[_colorType.value]]: true,
  }
});

const skeletonGrouped = computed(() => {
  if (!props.nullable || (props.nullable && _modelValue.value === null)) {
    return props.grouped;
  }

  if (props.grouped === Grouped.right || props.grouped === Grouped.center) {
    return Grouped.center;
  } else {
    return Grouped.left;
  }
});

function onClickOutside() {
  if (!dropDownOpen.value) {
    return;
  }

  dropDownOpen.value = false;
}

async function checkCreateTag(item: string): Promise<void> {
  if (props.allowCreate && focusedDropDownItem.value) {
    // If allowCreate is active but a item is focused inside the dropdown do nothing here.
    return;
  }

  if (item && props.allowCreate && props.createCallback) {
    const newOption: SelectOption = await props.createCallback(item);

    addTag(newOption.value);
  }
}

function addTagFromOptions(item: string | number) {
  if (props.allowCreate && !focusedDropDownItem.value) {
    // If allowCreate is active we don't need to add it here.
    return;
  }

  const option = props.options?.find(option => option.value === item);

  if (option) {
    addTag(item);

    if (props.autoCloseAfterSelection) {
      dropDownOpen.value = false;
    }
  }
}

function addTag(tagValue: string | number): void {
  _modelValue.value = _modelValue.value || [];

  if (!props.allowDuplicates && _modelValue.value.includes(tagValue) || !tagValue) {
    return;
  }

  _modelValue.value.push(tagValue);

  tagInput.value = '';

  filterDropDown();
}

function removeLastTag() {
  if (tagInput.value === '' && _modelValue.value && _modelValue.value.length > 0) {
    _modelValue.value.splice(-1, 1);

    filterDropDown();
  }
}

function removeTag(tag: string | number) {
  if (_modelValue.value && !props.disabled && !props.skeleton) {
    _modelValue.value.splice(_modelValue.value.findIndex((_value) => _value === tag), 1);

    filterDropDown();
  }
}

function changeFocus() {
  if (props.openOnFocus) {
    dropDownOpen.value = true;
  }
}

function filterDropDown() {
  if (!props.options) {
    return;
  }

  if (props.allowCreate) {
    focusedDropDownItem.value = null;
  }

  dropDownOpen.value = true;

  filteredOptions.value = props.options.filter(option => option.label.toLowerCase().includes(tagInput.value.toLowerCase()));

  // Remove all elements that are in modelValue from the filtered options
  if (_modelValue.value && !props.allowDuplicates) {
    filteredOptions.value = filteredOptions.value.filter(option => !_modelValue.value?.includes(option.value));
  }

  if (!props.allowCreate && filteredOptions.value.length > 0) {
    focusedDropDownItem.value = filteredOptions.value[0]?.value;
  }
}
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="_skeleton"
    :description="description"
    :color-type="colorType"
    :validator="validator"
    :show-message-on-error="showMessageOnError"
    :expanded="expanded"
    class="cursor-pointer"
  >
    <div
      class="relative w-full"
      v-on-click-outside="onClickOutside"
    >
      <AntSkeleton
        v-if="skeleton"
        absolute
        rounded
        :grouped="skeletonGrouped"
      />

      <div
        :class="inputContainerClasses"
        class="w-full flex gap-2.5 items-center"
      >
        <AntTag
          v-for="(tag, index) in _modelValue"
          :key="`tag-input-tag-${index}`"
          :size="size"
          :color-type="_colorType"
          dismiss
          @close="removeTag(tag)"
        >
          {{ options.find((option: SelectOption) => option.value === tag)?.label }}
        </AntTag>

        <!-- Input -->
        <div class="flex items-center gap-1 w-32 shrink grow">
          <AntIcon :icon="icon" :size="size === Size.sm ? IconSize.xs : IconSize.sm"/>

          <input
            v-model="tagInput"
            type="text"
            ref="inputRef"
            @keydown.enter.prevent="checkCreateTag(tagInput)"
            @keydown.delete="removeLastTag"
            :placeholder="placeholder"
            :class="inputClasses"
            @focus="changeFocus"
            @input="filterDropDown"
            class=" py-1"
            :disabled="disabled"
          />
        </div>
      </div>

      <AntDropDown
        v-if="filteredOptions && !disabled"
        :model-value="null"
        v-model:focused="focusedDropDownItem"
        v-model:open="dropDownOpen"
        ref="dropDownRef"
        :auto-select-first-on-open="!allowCreate"
        :options="filteredOptions"
        :input-ref="inputRef"
        :size="size"
        :color-type="_colorType"
        :focus-on-open="false"
        @select-element="addTagFromOptions"
      >
        <template #empty>
          <span v-if="allowCreate">
            No tag found, create now
          </span>
        </template>
      </AntDropDown>
    </div>
  </AntField>
</template>

<style scoped>

</style>
