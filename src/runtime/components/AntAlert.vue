<script lang="ts" setup>
import {computed, onMounted, useSlots} from 'vue';
import {handleEnumValidation} from '../handler';
import {
  faCheckCircle,
  faCircleQuestion,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntTooltip from './AntTooltip.vue';
import AntSkeleton from './AntSkeleton.vue';
import {InputColorType, Position} from '../enums';
import {IconSize} from './__types';

defineEmits(['close']);

const props = withDefaults(defineProps<{
  title?: string | null,
  colorType?: InputColorType,
  icon?: boolean,
  expanded?: boolean,
  questionMarkText?: string | null,
  skeleton?: boolean,
  dismissBtn?: boolean,
}>(), {
	title: null,
  colorType: InputColorType.base,
  icon: true,
  expanded: false,
	questionMarkText: null,
  skeleton: false,
  dismissBtn: true,
});

const icons = {
  [InputColorType.base]: faInfoCircle,
  [InputColorType.info]: faInfoCircle,
  [InputColorType.danger]: faExclamationCircle,
  [InputColorType.warning]: faExclamationTriangle,
  [InputColorType.success]: faCheckCircle,
};

const _icon = computed(() => icons[props.colorType]);
const classes = computed(() => {
  const variants: Record<InputColorType, string> = {
    [InputColorType.danger]: 'bg-danger-100 text-danger-500',
    [InputColorType.info]: 'bg-info-100 text-info-500',
    [InputColorType.base]: 'bg-neutral-100 text-neutral-500',
    [InputColorType.success]: 'bg-success-100 text-success-500',
    [InputColorType.warning]: 'bg-warning-100 text-warning-500',
  };

  return {
    'inline-flex flex-col gap-2.5 rounded-md p-2.5 transition-colors text-sm relative': true,
    'w-full': props.expanded,
    [variants[props.colorType]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);
const hasQuestionMark = computed(() => (useSlots()['question-mark-text'] || false) || props.questionMarkText);
const iconColor = computed(() => {
  const variants = {
    [InputColorType.base]: 'text-neutral-100-font',
    [InputColorType.danger]: 'text-danger-500',
    [InputColorType.info]: 'text-info-500',
    [InputColorType.success]: 'text-success-500',
    [InputColorType.warning]: 'text-warning-500',
  };

  return variants[props.colorType];
});

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});
</script>

<template>
  <div
    :class="classes"
    data-e2e="alert"
  >
    <AntSkeleton
      v-if="skeleton"
      absolute
      rounded
    />

    <div
      v-if="icon || hasQuestionMark || dismissBtn || title"
      class="inline-flex items-center justify-between w-content gap-2.5"
      :class="{'invisible': skeleton}"
    >
      <div class="inline-flex items-center gap-2.5">
        <AntIcon
          v-if="icon"
          :icon="_icon"
          :color="iconColor"
          :size="IconSize.sm"
        />

        <div
          :class="{'font-semibold': hasDefaultSlot}"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>

      <div class="flex gap-2.5">
        <div v-if="hasQuestionMark">
          <slot name="questionMarkText">
            <AntTooltip :position="Position.bottom">
              <AntIcon
                :icon="faCircleQuestion"
                :color="iconColor"
                :size="IconSize.sm"
              />

              <template #content>
                {{ questionMarkText }}
              </template>
            </AntTooltip>
          </slot>
        </div>

        <AntIcon
          v-if="dismissBtn"
          :icon="faXmark"
          class="cursor-pointer"
          :color="iconColor"
          :size="IconSize.sm"
          @click="() => $emit('close')"
        />
      </div>
    </div>

    <div v-if="hasDefaultSlot">
      <slot />
    </div>
  </div>
</template>
