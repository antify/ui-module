<script lang="ts" setup>
/**
 * This select is a custom component instead of a native <select> because the dropdown is not good
 * customizable with css.
 *
 * Known problem using a custom select instead of a native one:
 * - Label tags does not trigger the custom select by containing the select input or using the for attribute.
 * This means, this select is not usable in a custom field with multiple elements in there.
 * If the user clicks on the label, this select will not be focused.
 *
 * TODO:: add screen reader support
 * Fix overflow bug (See Ellipsis Text story)
 * TODO:: if the dropdown is open and the user types something, the element with a matching value should be focused.
 */
import AntField from './Elements/AntField.vue';
import {type SelectOption} from './__types/AntSelect.type';
import {computed, onMounted, ref} from 'vue';
import {Size} from '../../enums/Size.enum';
import {FieldValidator} from '@antify/validate';
import {handleEnumValidation} from '../../handler';
import {Grouped} from '../../enums/Grouped.enum';
import AntIcon from '../AntIcon.vue';
import {faChevronDown, faChevronUp, faMultiply} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../AntSkeleton.vue';
import {vOnClickOutside} from '@vueuse/components';
import AntButton from '../buttons/AntButton.vue';
import {ColorType, InputColorType} from '../../enums';
import {IconSize} from '../__types';
import AntDropDown from './Elements/AntDropDown.vue';

defineOptions({ inheritAttrs: false });
const props = withDefaults(
    defineProps<{
      modelValue: string | number | null;
      options: SelectOption[];
      label?: string;
      description?: string;
      placeholder?: string;
      size?: Size;
      colorType?: InputColorType;
      disabled?: boolean;
      skeleton?: boolean;
      validator?: FieldValidator;
      nullable?: boolean;
      grouped?: Grouped;
      name?: string;
      wrapperClass?: string | Record<string, boolean>;
      showMessageOnError?: boolean;
      expanded?: boolean;
    }>(), {
      colorType: InputColorType.base,
      grouped: Grouped.none,
      size: Size.md,
      disabled: false,
      skeleton: false,
      nullable: false,
      showMessageOnError: true,
      expanded: true
    }
);
const emit = defineEmits(['update:modelValue']);
const isOpen = ref(false);
const _modelValue = computed({
  get: () => props.modelValue,
  set: (val: string | number | null) => {
    props.validator?.validate(val);
    emit('update:modelValue', val);
  },
});
const valueLabel = computed(() => props.options.find(option => option.value === _modelValue.value)?.label || null);
const inputClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'outline-neutral-300 focus:outline-primary-500 bg-neutral-50 focus:ring-primary/25',
    [InputColorType.success]: 'outline-success-500 focus:outline-success-500 bg-success-100 focus:ring-success/25',
    [InputColorType.info]: 'outline-info-500 focus:outline-info-500 bg-info-100 focus:ring-info/25',
    [InputColorType.warning]: 'outline-warning-500 focus:outline-warning-500 bg-warning-100 focus:ring-warning/25',
    [InputColorType.danger]: 'outline-danger-500 focus:outline-danger-500 bg-danger-100 focus:ring-danger/25',
  };

  return {
    'flex items-center transition-colors border-none outline relative focus:z-10': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    [variants[_colorType.value]]: true,
    // Skeleton
    'invisible': props.skeleton,
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed': true,
    // Size
    'focus:ring-2 p-1.5 gap-1.5 text-xs': props.size === Size.sm,
    'focus:ring-4 p-2.5 gap-2.5 text-sm': props.size === Size.md,
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-md': props.grouped === Grouped.none,
    'rounded-tr-none rounded-br-none': props.nullable && _modelValue.value !== null,
    'rounded-bl-none rounded-br-none': isOpen.value,
    // Open
    'shadow-md': isOpen.value,
    // Disabled
    'opacity-50 cursor-not-allowed': props.disabled,
  };
});
const placeholderClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral-500',
    [InputColorType.success]: 'text-success-700',
    [InputColorType.info]: 'text-info-700',
    [InputColorType.warning]: 'text-warning-700',
    [InputColorType.danger]: 'text-danger-700',
  };

  return {
    'select-none text-ellipsis overflow-hidden whitespace-nowrap w-full': true,
    [variants[_colorType.value]]: true,
  };
});
const inputValueClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral-50-font',
    [InputColorType.success]: 'text-success-100-font',
    [InputColorType.info]: 'text-info-100-font',
    [InputColorType.warning]: 'text-warning-100-font',
    [InputColorType.danger]: 'text-danger-100-font',
  };
  return {
    'select-none text-ellipsis overflow-hidden whitespace-nowrap w-full': true,
    [variants[_colorType.value]]: true,
  };
});
const arrowClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral-50-font',
    [InputColorType.success]: 'text-success-100-font',
    [InputColorType.info]: 'text-info-100-font',
    [InputColorType.warning]: 'text-warning-100-font',
    [InputColorType.danger]: 'text-danger-100-font',
  };

  return {[variants[_colorType.value]]: true};
});
const _colorType = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);
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
const inputRef = ref<HTMLElement | null>(null);
const dropDownRef = ref<HTMLElement | null>(null);
const focusedDropDownItem = ref<string | number | null>(null);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.grouped, Grouped, 'grouped');

  props.validator?.validate(_modelValue.value);

  focusedDropDownItem.value = _modelValue.value;
});
// watch(isOpen, (val) => {
//   nextTick(() => {
//     if (val) {
//       dropDownRef.value?.focus();
//     }
//   });
// });

function onClickOutside() {
  if (!isOpen.value) {
    return;
  }

  isOpen.value = false;
  inputRef.value?.focus();
}

function onKeyDownInput(e: KeyboardEvent) {
  // if (e.key === 'Enter') {
  //   isOpen.value = true;
  //   inputRef.value?.blur();
  // }
  //
  // if (e.key === 'Escape') {
  //   isOpen.value = false;
  //   inputRef.value?.focus();
  // }
  //
  // if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
  //   const index = props.options.findIndex(option => option.value === _modelValue.value);
  //   const option = props.options[index + 1];
  //
  //   if (index === -1) {
  //     _modelValue.value = props.options[0].value;
  //   } else if (option !== undefined) {
  //     _modelValue.value = option.value;
  //   }
  // }
  //
  // if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
  //   const index = props.options.findIndex(option => option.value === _modelValue.value);
  //   const option = props.options[index - 1];
  //
  //   if (option !== undefined) {
  //     _modelValue.value = option.value;
  //   }
  // }
}

function onFocusInInput() {
  inputRef.value?.addEventListener('keydown', onKeyDownInput);
}

function onFocusOutInput(e: FocusEvent) {
  e.preventDefault();
  inputRef.value?.removeEventListener('keydown', onKeyDownInput);
}

function onClickSelectInput(e: MouseEvent) {
  e.preventDefault();

  if (props.disabled) {
    return;
  }

  if (isOpen.value) {
    inputRef.value?.focus()
  }

  isOpen.value = !isOpen.value;
}

function onClickRemoveButton() {
  inputRef.value?.focus();
  _modelValue.value = null;
}
</script>

<template>
  <AntField
      :label="label"
      :size="size"
      :skeleton="skeleton"
      :description="description"
      :color-type="colorType"
      :validator="validator"
      :class="wrapperClass"
      :show-message-on-error="showMessageOnError"
      :expanded="expanded"
      label-for="noop"
      data-e2e="select"
      @clickLabel="() => inputRef?.focus()"
  >
    <div
        class="h-fit flex flex-row w-full"
    >
      <div
          class="relative w-full"
          :class="{'cursor-pointer': !skeleton}"
          v-on-click-outside="onClickOutside"
      >
        <AntSkeleton
            v-if="skeleton"
            absolute
            rounded
            :grouped="skeletonGrouped"
        />

        <input type="hidden" :name="name" v-model="_modelValue">

        <!-- Input -->
        <div
            :class="inputClasses"
            ref="inputRef"
            :tabindex="disabled ? undefined : 0"
            @mousedown="onClickSelectInput"
            @focusin="onFocusInInput"
            @focusout="onFocusOutInput"
            v-bind="$attrs"
            @click="inputRef?.focus()"
        >
          <div
              v-if="_modelValue === null && placeholder !== undefined"
              :class="placeholderClasses"
          >
            {{ placeholder }}
          </div>

          <div
              v-else-if="_modelValue === null && label !== undefined"
              :class="placeholderClasses"
          >
            {{ label }}
          </div>

          <div
              v-else
              :class="inputValueClasses"
          >
            {{ valueLabel }}
          </div>

          <AntIcon
              v-if="isOpen"
              :icon="faChevronUp"
              :size="size as unknown as IconSize"
              :class="arrowClasses"
          />

          <AntIcon
              v-else
              :icon="faChevronDown"
              :size="size as unknown as IconSize"
              :class="arrowClasses"
          />
        </div>

        <!-- Dropdown -->
        <AntDropDown
          v-model="_modelValue"
          v-model:open="isOpen"
          ref="dropDownRef"
          :options="options"
          :input-ref="inputRef"
          :size="size"
          :color-type="_colorType"
          @select-element="(e) => _modelValue = e"
          close-on-enter
        />
      </div>

      <AntButton
          v-if="nullable && _modelValue !== null"
          :icon-left="faMultiply"
          :color-type="_colorType as unknown as ColorType"
          :grouped="[Grouped.left, Grouped.center].some(item => item === grouped) ? Grouped.center : Grouped.right"
          :size="size"
          :skeleton="skeleton"
          @click="onClickRemoveButton"
      />
    </div>
  </AntField>
</template>
