<script lang="ts" setup>
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {computed, onMounted} from 'vue';
import {type RouteLocationRaw} from 'vue-router';
import AntSkeleton from '../AntSkeleton.vue';
import AntSpinner from '../AntSpinner.vue';
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {handleEnumValidation} from '../../handler';
import {ColorType, InputColorType, Position} from '../../enums';
import {ButtonType} from './__types';
import AntIcon from '../AntIcon.vue';
import AntTooltip from '../AntTooltip.vue';
import {IconSize} from '../__types/AntIcon.types';

defineEmits(['click', 'blur']);

const props = withDefaults(defineProps<{
	filled?: boolean;
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
	outlined?: boolean;
	noFocus?: boolean;
	tooltipPosition?: Position;
	tooltipColorType?: InputColorType;
	tooltipDelay?: number;
}>(), {
	colorType: ColorType.base,
	disabled: false,
	filled: false,
	skeleton: false,
	spinner: false,
	size: Size.md,
	grouped: Grouped.none,
	readonly: false,
	expanded: false,
	submit: false,
	outlined: true,
	noFocus: false,
	tooltipPosition: Position.bottom,
	tooltipColorType: InputColorType.base,
	tooltipDelay: 800
});

const hasAction = computed(() => (props.skeleton || props.readonly || props.disabled))
const groupedClassList = computed(() => ({
	'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none -mr-px': props.grouped === Grouped.left,
	'rounded-none -mx-px': props.grouped === Grouped.center,
	'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md -ml-px': props.grouped === Grouped.right,
	'rounded-md': props.grouped === Grouped.none,
}));
const classes = computed(() => {
	const variants = {
		[ColorType.base]: 'ring-primary-200 outline-neutral-300',
		[ColorType.danger]: 'ring-danger-200 outline-danger-500',
		[ColorType.info]: 'ring-info-200 outline-info-500',
		[ColorType.primary]: 'ring-primary-200 outline-primary-500',
		[ColorType.secondary]: 'ring-secondary-200 outline-secondary-500',
		[ColorType.success]: 'ring-success-200 outline-success-500',
		[ColorType.warning]: 'ring-warning-200 outline-warning-500',
	};
	const notFilledVariants = {
		[ColorType.base]: 'bg-white text-for-white-bg-font',
		[ColorType.danger]: 'bg-white text-danger-500',
		[ColorType.info]: 'bg-white text-info-500',
		[ColorType.primary]: 'bg-white text-primary-500',
		[ColorType.secondary]: 'bg-white text-secondary-500',
		[ColorType.success]: 'bg-white text-success-500',
		[ColorType.warning]: 'bg-white text-warning-500',
	};
	const notFilledHoverVariants = {
		[ColorType.base]: 'hover:bg-neutral-100',
		[ColorType.danger]: 'hover:bg-danger-100',
		[ColorType.info]: 'hover:bg-info-100',
		[ColorType.primary]: 'hover:bg-primary-100',
		[ColorType.secondary]: 'hover:bg-secondary-100',
		[ColorType.success]: 'hover:bg-success-100',
		[ColorType.warning]: 'hover:bg-warning-100',
	};
	const filledVariants = {
		[ColorType.base]: 'bg-neutral-50 text-neutral-50-font',
		[ColorType.danger]: 'bg-danger-500 text-danger-500-font',
		[ColorType.info]: 'bg-info-500 text-info-500-font',
		[ColorType.primary]: 'bg-primary-500 text-primary-500-font',
		[ColorType.secondary]: 'bg-secondary-500 text-secondary-500-font',
		[ColorType.success]: 'bg-success-500 text-success-500-font',
		[ColorType.warning]: 'bg-warning-500 text-warning-500-font',
	};
	const filledHoverVariants = {
		[ColorType.base]: 'hover:bg-neutral-200',
		[ColorType.danger]: 'hover:bg-danger-600',
		[ColorType.info]: 'hover:bg-info-600',
		[ColorType.primary]: 'hover:bg-primary-600',
		[ColorType.secondary]: 'hover:bg-secondary-600',
		[ColorType.success]: 'hover:bg-success-600',
		[ColorType.warning]: 'hover:bg-warning-600',
	};

	return {
		'transition-all inline-flex items-center justify-center relative font-medium': true,
		'focus:z-10': true,
		'active:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]': !hasAction.value,
		'py-1.5 px-2.5 text-xs gap-1': props.size === Size.sm,
		'py-2.5 px-3.5 text-sm gap-2.5': props.size === Size.md,
		'disabled:opacity-50 disabled:cursor-not-allowed': true,
		'cursor-default': props.readonly,
		'focus:ring-2': !props.readonly && props.size === Size.sm,
		'focus:ring-4': !props.readonly && props.size === Size.md,
		'w-full': props.expanded,
		'invisible': props.skeleton,
		'outline outline-1 outline-offset-[-1px]': props.outlined,
		...groupedClassList.value,
		[variants[props.colorType]]: true,
		[notFilledVariants[props.colorType]]: !props.filled,
		[notFilledHoverVariants[props.colorType]]: !props.filled && !hasAction.value,
		[filledVariants[props.colorType]]: props.filled,
		[filledHoverVariants[props.colorType]]: props.filled && !hasAction.value,
	};
});
const iconColor = computed(() => {
	const notFilledVariants = {
		[ColorType.base]: 'text-for-white-bg-font',
		[ColorType.danger]: 'text-danger-500',
		[ColorType.info]: 'text-info-500',
		[ColorType.primary]: 'text-primary-500',
		[ColorType.secondary]: 'text-secondary-500',
		[ColorType.success]: 'text-success-500',
		[ColorType.warning]: 'text-warning-500',
	};
	const filledVariants = {
		[ColorType.base]: 'text-for-white-bg-font',
		[ColorType.danger]: 'text-danger-500-font',
		[ColorType.info]: 'text-info-500-font',
		[ColorType.primary]: 'text-primary-500-font',
		[ColorType.secondary]: 'text-secondary-500-font',
		[ColorType.success]: 'text-success-500-font',
		[ColorType.warning]: 'text-warning-500-font',
	};

	return props.filled ? filledVariants[props.colorType] : notFilledVariants[props.colorType];
});
const type = computed(() => {
	if (props.to !== undefined) {
		return undefined;
	}

	return props.submit ? ButtonType.submit : ButtonType.button;
});
const is = computed(() => {
	if (props.readonly) {
		return 'div';
	}

	return props.to !== undefined ? 'router-link' : 'button'
})

onMounted(() => {
	handleEnumValidation(props.size, Size, 'size');
	handleEnumValidation(props.colorType, ColorType, 'colorType');
	handleEnumValidation(props.grouped, Grouped, 'grouped');
});
</script>

<template>
  <div
    class="relative inline-flex h-fit"
    :class="{'w-full': props.expanded}"
    data-e2e="button"
    :data-e2e-color-type="props.colorType"
  >
    <AntSkeleton
      v-if="skeleton"
      :grouped="grouped"
      rounded
      absolute
    />

    <AntTooltip
      :expanded="expanded"
      :position="tooltipPosition"
      :color-type="tooltipColorType"
      :delay="tooltipDelay"
    >
      <template #default>
        <component
          :is="is"
          :class="classes"
          :type="type"
          :to="to"
          :disabled="disabled || undefined"
          :tabindex="noFocus || hasAction ? '-1' : '0'"
          @click="() => !props.readonly ? $emit('click') : null"
          @blur="() => !props.readonly ? $emit('blur') : null"
        >
          <AntSpinner
            v-if="spinner"
            :size="size"
            :color-type="colorType"
            :inverted="!filled"
          />

          <slot
            v-if="!spinner"
            name="icon-left"
          >
            <AntIcon
              v-if="iconLeft"
              :icon="iconLeft"
              :size="size as unknown as IconSize"
              :color="iconColor"
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
              :color="iconColor"
            />
          </slot>
        </component>
      </template>

      <template #content>
        <slot name="tooltip-content" />
      </template>
    </AntTooltip>
  </div>
</template>
