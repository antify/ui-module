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

const emit = defineEmits([ 'update:modelValue' ]);
const props = withDefaults(
  defineProps<{
    modelValue: string[] | null;
    options?: SelectOption[];
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
  }>(), {
    size: Size.md,
    colorType: InputColorType.base,
    icon: () => faChevronRight,
    grouped: Grouped.none,

    allowCreate: false,
    allowDuplicates: false,
    openOnFocus: false
  }
);

const _modelValue = useVModel(props, 'modelValue', emit);
const _skeleton = useVModel(props, 'skeleton', emit);

const dropDownOpen = ref(false);
const focusedDropDownItem: Ref<string | number | null> = ref(null);
const tagInput = ref('');
const filteredOptions = ref(props.options);

const inputRef: Ref<HTMLElement | null> = ref(null);

const _colorType = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);

const inputContainerClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'outline-neutral-light focus:outline-primary focus-within:ring-primary/25 bg-neutral-lightest placeholder:text-neutral',
    [InputColorType.danger]: 'outline-danger focus:outline-danger focus-within:ring-danger/25 bg-danger-lighter placeholder:text-danger-dark',
    [InputColorType.info]: 'outline-info focus:outline-info focus-within:ring-info/25 bg-info-lighter placeholder:text-info-dark',
    [InputColorType.success]: 'outline-success focus:outline-success focus-within:ring-success/25 bg-success-lighter placeholder:text-success-dark',
    [InputColorType.warning]: 'outline-warning focus:outline-warning focus-within:ring-warning/25 bg-warning-lighter placeholder:text-warning-dark',
  };

  return {
    'flex gap-1 items-center': true,
    'transition-colors relative border-none outline w-full focus-within:z-10': true,
    'outline-offset-[-1px] outline-1 focus-within:outline-offset-[-1px] focus-within:outline-1': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    [variants[_colorType.value]]: true,
    // Size
    'focus-within:ring-2 px-1.5 text-xs': props.size === Size.sm,
    'focus-within:ring-4 px-2.5 text-sm': props.size === Size.md,
    'py-2.5': _modelValue.value?.length === 0 && props.size === Size.md,
    'py-2': _modelValue.value?.length === 0 && props.size === Size.sm,
    'py-1.5': _modelValue.value ? _modelValue.value.length > 0 : false,
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
  return {
    'outline-0 border:none ring:none': true,
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
  inputRef.value?.focus();
}

function addTag(): void {
  if ((tagInput.value && props.allowCreate) || props.options?.findIndex(option => option.label === tagInput.value) !== -1) {
    _modelValue.value = _modelValue.value || [];

    if (!props.allowDuplicates && _modelValue.value.includes(tagInput.value)) {
      return;
    }

    _modelValue.value.push(tagInput.value);

    tagInput.value = '';

    filterDropDown();
  }
}

function removeLastTag() {
  if (tagInput.value === '' && _modelValue.value && _modelValue.value.length > 0) {
    _modelValue.value.splice(-1, 1);

    filterDropDown();
  }
}

function removeTag(tag: string) {
  if (_modelValue.value) {
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

  dropDownOpen.value = true;


  filteredOptions.value = props.options.filter(option => option.label.toLowerCase().includes(tagInput.value.toLowerCase()));

  // Remove all elements that are in modelValue from the filtered options
  if (_modelValue.value) {
    filteredOptions.value = filteredOptions.value.filter(option => !_modelValue.value?.includes(option.label));
  }

  // if (filteredOptions.value.length === 0) {
  //   dropDownOpen.value = false;
  // } else {
  //   dropDownOpen.value = true;
  // }
}

function controlDropDown(e: KeyboardEvent) {
  console.log(dropDownOpen.value, filteredOptions.value);
  if (!dropDownOpen.value || !filteredOptions.value || filteredOptions.value.length === 0) {
    // Open dropdown if the user presses down or up key and select the first element
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && filteredOptions.value && filteredOptions.value.length > 0) {
      focusedDropDownItem.value = filteredOptions.value[0].value;
      dropDownOpen.value = true;
    }

    return;
  }

  console.log('control dropdown')

  if (e.key === 'Escape') {
    dropDownOpen.value = false;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    // Select the prev element in the list
    const index = filteredOptions.value.findIndex(option => option.value === focusedDropDownItem.value);

    if (index !== -1 && index !== 0) {
      focusedDropDownItem.value = filteredOptions.value[index - 1].value;
    } else {
      focusedDropDownItem.value = filteredOptions.value[filteredOptions.value.length - 1].value;
      return;
    }

    console.log('focusUp');
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();


    // Select the next element in the list
    const index = filteredOptions.value.findIndex(option => option.value === focusedDropDownItem.value);

    if (index !== -1 && index !== filteredOptions.value.length - 1) {
      focusedDropDownItem.value = filteredOptions.value[index + 1].value;
    } else {
      focusedDropDownItem.value = filteredOptions.value[0].value;
      return;
    }

    console.log('focusdown', focusedDropDownItem.value, index);
  }

  if (e.key === 'Enter') {
    e.preventDefault();

    dropDownOpen.value = false;
    _modelValue.value = _modelValue.value || [];

    if (filteredOptions.value && filteredOptions.value.length > 0) {
      // find the focused item in the options and add it to the model value
      const option = filteredOptions.value.find(option => option.value === focusedDropDownItem.value);

      if (option) {
        tagInput.value = option.label;
      }

      addTag();
    } else {
      addTag();
    }
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
    >
      <AntSkeleton
        v-if="skeleton"
        absolute
        rounded
        :grouped="skeletonGrouped"
      />

      <div
        ref="InputRef"
        :class="inputContainerClasses"
        class="w-full flex gap-1 items-center"
        @click-outside="onClickOutside"
      >
        <AntTag
          v-for="(tag, index) in _modelValue"
          :key="`tag-input-tag-${index}`"
          :size="size"
          dismiss
          @close="removeTag(tag)"
        >
          {{ tag }}
        </AntTag>

        <!-- Input -->
        <AntIcon :icon="icon" :size="size === Size.sm ? IconSize.xs : IconSize.sm"/>

        <input
          v-model="tagInput"
          type="text"
          @keydown.enter.prevent="addTag"
          @keydown.delete="removeLastTag"
          :placeholder="placeholder"
          :class="inputClasses"
          @focus="changeFocus"
          @input="filterDropDown"
          @keydown="controlDropDown"
        />
      </div>

      <AntDropDown
        v-if="options"
        v-model="focusedDropDownItem"
        v-model:open="dropDownOpen"
        ref="dropDownRef"
        :options="filteredOptions"
        :input-ref="inputRef"
        :size="size"
        :color-type="_colorType"
        :focus-on-open="false"
      />
    </div>
  </AntField>
</template>

<style scoped>

</style>
