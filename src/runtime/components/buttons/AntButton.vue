<script lang="ts" setup>
/**
 * TODO:: - summary height with border is not correct
 *  - not outlined version has no border
 */
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {computed, onMounted} from 'vue';
import {type RouteLocationRaw} from 'vue-router';
import AntSkeleton from '../AntSkeleton.vue';
import AntSpinner from '../AntSpinner.vue';
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {handleEnumValidation} from '../../handler';
import {ColorType} from '../../enums';
import {ButtonType} from '../form/__types';
import AntIcon from '../AntIcon.vue';
import {IconSize} from '../__types/AntIcon.types';

const emit = defineEmits(['click', 'blur']);
const props = withDefaults(defineProps<{
  outlined?: boolean;
  size?: Size;
  colorType?: ColorType;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  to?: RouteLocationRaw;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  spinner?: boolean;
  readonly?: boolean;
  expanded?: boolean;
  submit?: boolean;
  bordered?: boolean;
  noFocus?: boolean;
}>(), {
  colorType: ColorType.base,
  disabled: false,
  outlined: false,
  skeleton: false,
  spinner: false,
  size: Size.md,
  grouped: Grouped.none,
  readonly: false,
  expanded: false,
  submit: false,
  bordered: true,
  noFocus: false,
});

const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled))
const groupedClassList = computed(() => ({
  'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
  'rounded-none': props.grouped === Grouped.center,
  'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
  'rounded-md': props.grouped === Grouped.none,
}));
const classes = computed(() => {
  const hasActionVariants = {
    'base': 'focus:ring-primary/25',
    'danger': 'focus:ring-danger/25',
    'info': 'focus:ring-info/25',
    'primary': 'focus:ring-primary/25',
    'secondary': 'focus:ring-secondary/25',
    'success': 'focus:ring-success/25',
    'warning': 'focus:ring-warning/25',
  };
  const notOutlinedVariants = {
    'base': 'text-neutral-light-font bg-neutral-light',
    'danger': 'text-danger-font bg-danger',
    'info': 'text-info-font bg-info',
    'primary': 'text-primary-font bg-primary',
    'secondary': 'text-secondary-font bg-secondary',
    'success': 'text-success-font bg-success',
    'warning': 'text-warning-font bg-warning',
  };
  const outlinedAndWithActionVariants = {
    'base': 'hover:bg-neutral-light',
    'danger': 'hover:bg-danger',
    'info': 'hover:bg-info',
    'primary': 'hover:bg-primary',
    'secondary': 'hover:bg-secondary',
    'success': 'hover:bg-success',
    'warning': 'hover:bg-warning',
  };
  const outlinedVariants = {
    'base': 'text-neutral-light-font border-neutral-light focus:border-primary',
    'danger': 'text-danger border-danger',
    'info': 'text-info border-info',
    'primary': 'text-primary border-primary',
    'secondary': 'text-secondary border-secondary',
    'success': 'text-success border-success',
    'warning': 'text-warning border-warning',
  };

  return {
    'transition-colors inline-flex items-center relative focus:z-10 overflow-hidden': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled && !props.skeleton,
    'cursor-default': props.skeleton || props.readonly,
    'focus:ring-2': props.size === Size.sm && hasAction.value && !props.noFocus,
    'focus:ring-4': props.size === Size.md && hasAction.value && !props.noFocus,
    'w-full': props.expanded,
    'invisible': props.skeleton,
    'bg-neutral-lightest': props.outlined,
    ...groupedClassList.value,
    'border -m-px': props.outlined && props.bordered,
    [hasActionVariants[props.colorType]]: hasAction.value && !props.noFocus,
    [notOutlinedVariants[props.colorType]]: !props.outlined,
    [outlinedVariants[props.colorType]]: props.outlined,
    [outlinedAndWithActionVariants[props.colorType]]: props.outlined && hasAction.value,
  };
});
const buttonContentClasses = computed(() => ({
  'd-block w-full inline-flex items-center justify-center transition-colors font-medium': true,
  'py-1.5 px-2.5 text-xs gap-1': props.size === Size.sm,
  'py-2.5 px-3.5 text-sm gap-2.5': props.size === Size.md,
  'active:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]': hasAction.value,
  'hover:bg-white/75': props.outlined && hasAction.value,
  'hover:bg-black/25': !props.outlined && hasAction.value,
  // Make sure, nothing shimmer through the skeleton
  'invisible': props.skeleton
}));
const type = computed(() => {
  if (props.to !== undefined) {
    return undefined;
  }

  return props.submit ? ButtonType.submit : ButtonType.button;
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, ColorType, 'colorType');
});
</script>

<template>
  <div class="relative inline-flex">
    <AntSkeleton
        v-if="skeleton"
        :grouped="grouped"
        rounded
        absolute
    />

    <component
        :is="to !== undefined ? 'router-link' : 'button'"
        :class="classes"
        :type="type"
        :to="to"
        :disabled="disabled || undefined"
        :tabindex="noFocus ? '-1' : '0'"
        @click="() => !props.readonly ? $emit('click') : null"
        @blur="() => $emit('blur')"
    >
      <span
          :class="buttonContentClasses"
      >
        <AntSpinner
            v-if="spinner"
            :size="size"
            :color-type="colorType"
            :inverted="!outlined"
        />

        <slot
            v-if="!spinner"
            name="icon-left"
        >
          <AntIcon
            v-if="iconLeft"
            :icon="iconLeft"
            :size="size as unknown as IconSize"
          />
        </slot>

        <slot
            v-if="!spinner"
        />

        <slot
            v-if="!spinner"
            name="icon-right"
        >
          <AntIcon
            v-if="iconRight"
            :icon="iconRight"
            :size="size as unknown as IconSize"
          />
        </slot>
      </span>
    </component>
  </div>
</template>
