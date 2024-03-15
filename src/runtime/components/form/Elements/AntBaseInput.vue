<script lang="ts" setup>
import {computed, onMounted, watch} from 'vue';
import {Size} from '../../../enums/Size.enum'
import AntSkeleton from '../../AntSkeleton.vue';
import AntIcon from '../../AntIcon.vue';
import {BaseInputType} from './__types/AntBaseInput.type';
import {Grouped} from '../../../enums/Grouped.enum';
import {
  faExclamationTriangle,
  faExclamationCircle,
  faCircleCheck,
  faCircleInfo,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {handleEnumValidation} from '../../../handler';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {classesToObjectSyntax} from '../../../utils';
import {InputColorType} from '../../../enums';
import {IconSize} from '../../__types';

defineOptions({ inheritAttrs: false });

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

const icons = {
  [InputColorType.info]: faCircleInfo,
  [InputColorType.warning]: faExclamationTriangle,
  [InputColorType.danger]: faExclamationCircle,
  [InputColorType.success]: faCircleCheck,
  [InputColorType.base]: null,
};

const inputClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'outline-neutral-300 focus:outline-primary-500 focus:ring-primary/25 bg-white placeholder:text-neutral-500',
    [InputColorType.danger]: 'outline-danger-500 focus:outline-danger-500 focus:ring-danger/25 bg-danger-100 placeholder:text-danger-700',
    [InputColorType.info]: 'outline-info-500 focus:outline-info-500 focus:ring-info/25 bg-info-100 placeholder:text-info-700',
    [InputColorType.success]: 'outline-success-500 focus:outline-success-500 focus:ring-success/25 bg-success-100 placeholder:text-success-700',
    [InputColorType.warning]: 'outline-warning-500 focus:outline-warning-500 focus:ring-warning/25 bg-warning-100 placeholder:text-warning-700',
  };

  return {
    'transition-colors relative border-none outline w-full focus:z-10 text-black': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    'text-right': props.type === BaseInputType.number,
    [variants[_colorType.value]]: true,
    // Size
    'focus:ring-2 p-1.5 text-xs': props.size === Size.sm,
    'focus:ring-4 p-2.5 text-sm': props.size === Size.md,
    // Icon left
    'pl-7': props.size === Size.sm && props.iconLeft,
    'pl-10': props.size === Size.md && props.iconLeft,
    // Icon right
    'pr-7': props.size === Size.sm && props.showIcon && icon.value,
    'pr-10': props.size === Size.md && props.showIcon && icon.value,
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

watch(_value, (val) => {
  if (props.hasErrors) {
    emit('validate', val)
  }
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.value !== null) {
    emit('validate', props.value)
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
    emit('validate', props.value)
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.value)
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
      :class="{'w-7': size === Size.sm, 'w-10': size === Size.md}"
    >
      <AntIcon
        :icon="iconLeft"
        :size="size as unknown as IconSize"
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
      v-if="nullable && _value !== null && _value !== ''"
      class="absolute flex w-fit right-0 top-0 h-full transition-all z-20"
      :class="{'p-1.5': size === Size.sm, 'p-2.5': size === Size.md}"
    >
      <AntIcon
        :icon="faXmark"
        :class="iconClasses"
        class="cursor-pointer"
        :color="iconColorClass"
        :size="size as unknown as IconSize"
        @click="() => _value = null"
      />
    </div>

    <div
      v-else-if="showIcon && icon"
      class="absolute flex w-fit right-0 top-0 h-full transition-all z-20"
      :class="{'p-1.5': size === Size.sm, 'p-2.5': size === Size.md}"
    >
      <AntIcon
        :icon="icon"
        :color="iconColorClass"
        :class="iconClasses"
        :size="size as unknown as IconSize"
      />
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
