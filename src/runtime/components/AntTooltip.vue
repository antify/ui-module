<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {handleEnumValidation} from '../handler';
import {InputColorType, Position} from '../enums';
import {classesToObjectSyntax} from '../utils';

const props = withDefaults(defineProps<{
  content?: string,
  position?: Position,
  tooltipClasses?: string | Record<string, boolean>,
  colorType?: InputColorType
}>(), {
  position: Position.left,
  tooltipClasses: '',
  colorType: InputColorType.base
});
const visible = ref(false);
const _tooltipClasses = computed(() => ({
  'absolute w-max inline-flex': true,
  // Position
  'bottom-full pb-3.5': props.position === Position.top,
  'top-full pt-3.5': props.position === Position.bottom,
  'right-full pr-3.5': props.position === Position.left,
  'left-full pl-3.5': props.position === Position.right,
  ...classesToObjectSyntax(props.tooltipClasses)
}));
const classes = computed(() => ({
  'z-10 absolute flex': true,
  'top-0 left-0 right-0 -m-[2px] justify-center': props.position === Position.bottom,
  'bottom-0 left-0 right-0 -m-[2px] justify-center': props.position === Position.top,
  'top-0 left-0 bottom-0 -ml-[2.2px] items-center': props.position === Position.right,
  'top-0 right-0 bottom-0 -mr-[2.2px] items-center': props.position === Position.left,
}));
const itemContainerClasses = computed(() => ({
  'relative flex items-center': true,
  'justify-center': props.position === Position.bottom,
  'justify-center rotate-180': props.position === Position.top,
  'justify-center -rotate-90': props.position === Position.right,
  'justify-center rotate-90': props.position === Position.left,
}));
const contentClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'text-neutral-lightest-font bg-neutral-lightest border-neutral-light',
    [InputColorType.danger]: 'text-danger-font bg-danger border-danger',
    [InputColorType.info]: 'text-info-font bg-info border-info',
    [InputColorType.success]: 'text-success-font bg-success border-success',
    [InputColorType.warning]: 'text-warning-font bg-warning border-warning',
  };

  return {[variants[props.colorType]]: true};
});
const svgPathClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'fill-neutral-lightest stroke-neutral-lightest',
    [InputColorType.danger]: 'fill-danger stroke-danger',
    [InputColorType.info]: 'fill-info stroke-info',
    [InputColorType.success]: 'fill-success stroke-success',
    [InputColorType.warning]: 'fill-warning stroke-warning',
  };

  return {[variants[props.colorType]]: true};
});
const arrowSvgPathClasses = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.base]: 'stroke-neutral-light',
    [InputColorType.danger]: 'stroke-danger',
    [InputColorType.info]: 'stroke-info',
    [InputColorType.success]: 'stroke-success',
    [InputColorType.warning]: 'stroke-warning',
  };

  return {[variants[props.colorType]]: true};
});

onMounted(() => {
  handleEnumValidation(props.position, Position, 'Position')
  handleEnumValidation(props.colorType, InputColorType, 'colorType')
});

/**
 * To prevent a fliggering ux, add a delay on hover and leaving the hover target,
 * before showing the tooltip content.
 */
const delayVisible = ref(visible.value);

function onMouseOver() {
  delayVisible.value = true;

  setTimeout(() => {
    if (delayVisible.value) {
      visible.value = true
    }
  }, 300)
}

function onMouseLeave() {
  delayVisible.value = false
  visible.value = false
}
</script>

<template>
  <div class="relative inline-flex justify-center items-center"
       @mouseover="onMouseOver"
       @mouseleave="onMouseLeave"
  >
    <slot/>

    <div v-if="visible" :class="_tooltipClasses">
      <div
        class="shadow-lg text-sm relative inline-flex flex-col relative"
      >
        <div
          :class="classes"
        >
          <div
            :class="itemContainerClasses"
          >
            <svg
              class="absolute mt-[.5px]"
              width="30"
              height="8"
              viewBox="0 0 35 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3284 1.82843L23.1569 4.65685C24.6571 6.15715 26.692 7 28.8137 7L6.18629 7C8.30802 7 10.3429 6.15715 11.8431 4.65686L14.6716 1.82843C16.2337 0.266331 18.7663 0.266328 20.3284 1.82843Z"
                :class="svgPathClasses"
              />

              <path
                d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7L34.5 7Z"
                :class="svgPathClasses"
              />
            </svg>

            <svg
              class="absolute"
              width="30"
              height="8"
              viewBox="0 0 35 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.5 7L28.8137 7C26.692 7 24.6571 6.15715 23.1569 4.65685L20.3284 1.82843C18.7663 0.266328 16.2337 0.266331 14.6716 1.82843L11.8431 4.65686C10.3429 6.15715 8.30802 7 6.18629 7L0.5 7"
                :class="arrowSvgPathClasses"
              />
            </svg>
          </div>
        </div>

        <div
          class="p-2.5 rounded-md border"
          :class="contentClasses"
        >
          <slot name="content"/>
        </div>
      </div>
    </div>
  </div>
</template>
