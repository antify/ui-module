<script lang="ts" setup>
import {computed, onMounted, watch, useSlots} from 'vue';
import {Size} from '../../../enums/Size.enum';
import AntSkeleton from '../../AntSkeleton.vue';
import AntIcon from '../../AntIcon.vue';
import {BaseInputType} from './__types/AntBaseInput.type';
import {Grouped} from '../../../enums/Grouped.enum';
import {
  faCircleCheck,
  faCircleInfo,
  faExclamationCircle,
  faExclamationTriangle,
  faXmark,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {handleEnumValidation} from '../../../handler';
import {classesToObjectSyntax, hasSlotContent} from '../../../utils';
import {InputColorType} from '../../../enums';
import {IconSize} from '../../__types';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:value', 'blur', 'validate']);
const props = withDefaults(defineProps<{
  value: string | number | null;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  placeholder?: string;
  skeleton?: boolean;
  type?: BaseInputType;
  grouped?: Grouped;
  wrapperClass?: string | Record<string, boolean>;
  showIcon?: boolean;
  iconLeft?: IconDefinition;
  nullable?: boolean;
  hasErrors?: boolean;
}>(), {
  colorType: InputColorType.base,
  disabled: false,
  size: Size.md,
  skeleton: false,
  type: BaseInputType.text,
  grouped: Grouped.none,
  showIcon: true,
  default: false,
  nullable: false,
  hasErrors: false
});
const slot = useSlots();

const icons = {
  [InputColorType.info]: faCircleInfo,
  [InputColorType.warning]: faExclamationTriangle,
  [InputColorType.danger]: faExclamationCircle,
  [InputColorType.success]: faCircleCheck,
  [InputColorType.base]: null,
};

const inputClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'outline-neutral-300 focus:ring-primary-200 bg-white placeholder:text-neutral-500',
    [InputColorType.danger]: 'outline-danger-500 focus:ring-danger-200 bg-danger-100 placeholder:text-danger-700',
    [InputColorType.info]: 'outline-info-500 focus:ring-info-200 bg-info-100 placeholder:text-info-700',
    [InputColorType.success]: 'outline-success-500 focus:ring-success-200 bg-success-100 placeholder:text-success-700',
    [InputColorType.warning]: 'outline-warning-500 focus:ring-warning-200 bg-warning-100 placeholder:text-warning-700',
  };

  return {
    'block transition-colors relative border-none outline w-full focus:z-10 text-black': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    'text-right': props.type === BaseInputType.number,
    [variants[_colorType.value]]: true,
    // Size
    'focus:ring-2 p-1 text-xs': props.size === Size.xs2,
    'focus:ring-2 p-1.5 text-xs': props.size === Size.xs,
    'focus:ring-2 p-1.5 text-sm': props.size === Size.sm,
    'focus:ring-4 p-2 text-sm': props.size === Size.md,
    'focus:ring-4 p-2.5 text-sm': props.size === Size.lg,
    // Icon left
    'pl-6': props.size === Size.xs2 && props.iconLeft,
    'pl-7': props.size === Size.sm && props.iconLeft || props.size === Size.xs && props.iconLeft,
    'pl-8': props.size === Size.md && props.iconLeft,
    'pl-9': props.size === Size.lg && props.iconLeft,
    // Icon right
    'pr-6': props.size === Size.xs2 && props.showIcon && icon.value ||
            props.size === Size.xs2 && props.nullable ||
            props.size === Size.xs2 && hasSlotContent(slot['icon-right']),
    'pr-7': props.size === Size.xs && props.showIcon && icon.value ||
            props.size === Size.xs && props.nullable ||
            props.size === Size.xs && hasSlotContent(slot['icon-right']),
    'pr-8': props.size === Size.sm && props.showIcon && icon.value ||
            props.size === Size.sm && props.nullable ||
            props.size === Size.sm && hasSlotContent(slot['icon-right']),
    'pr-9': props.size === Size.md && props.showIcon && icon.value ||
            props.size === Size.md && props.nullable ||
            props.size === Size.md && hasSlotContent(slot['icon-right']),
    'pr-10': props.size === Size.lg && props.showIcon && icon.value ||
            props.size === Size.lg && props.nullable ||
            props.size === Size.lg && hasSlotContent(slot['icon-right']),
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-md': props.grouped === Grouped.none,
    'invisible': props.skeleton,
  };
});
const iconClasses = computed(() => ({
  'transition-[height]': true,
}));
const iconColorClass = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-for-white-bg-font',
    [InputColorType.danger]: 'text-danger-500',
    [InputColorType.info]: 'text-info-500',
    [InputColorType.success]: 'text-success-500',
    [InputColorType.warning]: 'text-warning-500',
  };

  return variants[_colorType.value];
});
const _wrapperClass = computed(() => classesToObjectSyntax(props.wrapperClass));
const icon = computed(() => icons[_colorType.value]);
const _value = computed<string | number | null>({
  get: () => props.value,
  set: (val: string | number | null) => {
    if (props.type === BaseInputType.number && typeof val !== 'number') {
      return emit('update:value', null);
    }

    emit('update:value', val);
  },
});
const _colorType = computed(() => props.hasErrors ? InputColorType.danger : props.colorType);
const inputIconSize = computed(() => {
  if (props.size === Size.xs || props.size === Size.xs2) {
    return IconSize.xs;
  } else {
    return IconSize.sm;
  }
});

watch(_value, (val) => {
  if (props.hasErrors) {
    emit('validate', val);
  }
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.value !== null) {
    emit('validate', props.value);
  }
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.type, BaseInputType, 'Type');
  handleEnumValidation(props.grouped, Grouped, 'grouped');

  /**
   * Validate default value without delayed data fetching.
   */
  if (!props.skeleton && props.value !== null) {
    emit('validate', props.value);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.value);
  emit('blur', e);
}
</script>

<template>
  <div
    class="block relative w-full"
    :class="{...{'-mr-px': grouped !== Grouped.none}, ..._wrapperClass}"
  >
    <div
      v-if="iconLeft"
      class="absolute h-full flex items-center justify-center z-20"
      :class="{'w-6': size === Size.xs2, 'w-7': size === Size.xs || size === Size.sm, 'w-8': size === Size.md, 'w-9': size === Size.lg}"
    >
      <AntIcon
        :icon="iconLeft"
        :size="inputIconSize"
        color="text-for-white-bg-font"
      />
    </div>

    <input
      v-model="_value"
      :class="inputClasses"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled || skeleton"
      v-bind="$attrs"
      @blur="onBlur"
    >

    <div
      v-if="(nullable && _value !== null && _value !== '') || (showIcon && icon) || hasSlotContent(slot['icon-right'])"
      class="absolute h-full flex items-center justify-center right-0 top-0 transition-all z-20"
      :class="{'w-6': size === Size.xs2, 'w-7': size === Size.xs || size === Size.sm, 'w-8': size === Size.md, 'w-9': size === Size.lg}"
    >
      <slot name="icon-right">
        <AntIcon
          v-if="nullable && _value !== null && _value !== ''"
          :icon="faXmark"
          :class="iconClasses"
          class="cursor-pointer"
          :color="iconColorClass"
          :size="inputIconSize"
          @click="() => _value = null"
        />

        <AntIcon
          v-else-if="showIcon && icon"
          :icon="icon"
          :color="iconColorClass"
          :class="iconClasses"
          :size="inputIconSize"
        />
      </slot>
    </div>

    <AntSkeleton
      v-if="skeleton"
      absolute
      :grouped="grouped"
      rounded
    />
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* clears the "X" from Internet Explorer */
input[type=search]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input[type=search]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the "X" from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>
