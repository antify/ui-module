<script lang="ts" setup>
import {computed, onMounted, useSlots} from 'vue';
import {handleEnumValidation} from '../handler';
import {
  faCheckCircle,
  faCircleQuestion,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle, faXmark
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntTooltip from './AntTooltip.vue';
import AntSkeleton from './AntSkeleton.vue';
import {useVModel} from '@vueuse/core';
import {InputColorType, Position} from '../enums';
import {IconColorType} from './__types';

const emit = defineEmits(['update:skeleton', 'close']);
const props = withDefaults(defineProps<{
  title: string,
  colorType?: InputColorType,
  icon?: boolean,
  expanded?: boolean,
  questionMarkText?: string,
  skeleton?: boolean
}>(), {
  colorType: InputColorType.base,
  icon: true,
  expanded: false,
  skeleton: false
});

const _skeleton = useVModel(props, 'skeleton', emit);
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
    [InputColorType.danger]: 'bg-danger-lighter text-danger',
    [InputColorType.info]: 'bg-info-lighter text-info',
    [InputColorType.base]: 'bg-neutral-lighter text-neutral',
    [InputColorType.success]: 'bg-success-lighter text-success',
    [InputColorType.warning]: 'bg-warning-lighter text-warning',
  };

  return {
    'inline-flex flex-col gap-2.5 rounded-md p-2.5 transition-colors text-sm relative': true,
    'w-full': props.expanded,
    [variants[props.colorType]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);
const hasQuestionMark = computed(() => (useSlots()['question-mark-text'] || false) || props.questionMarkText);

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});
</script>

<template>
  <div :class="classes">
    <AntSkeleton v-model="_skeleton" absolute rounded/>

    <div
      class="inline-flex items-center justify-between w-content gap-2.5"
      :class="{'invisible': _skeleton}"
    >
      <div class="inline-flex items-center gap-2.5">
        <AntIcon
          v-if="icon"
          :icon="_icon"
          :color-type="colorType as unknown as IconColorType"
        />

        <div :class="{'font-semibold': hasDefaultSlot}">
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
                :color-type="colorType as unknown as IconColorType"
              />

              <template #content>
                {{ questionMarkText }}
              </template>
            </AntTooltip>
          </slot>
        </div>

        <AntIcon
          :icon="faXmark"
          class="cursor-pointer"
          :color-type="colorType as unknown as IconColorType"
          @click="() => $emit('close')"
        />
      </div>
    </div>

    <div v-if="hasDefaultSlot">
      <slot/>
    </div>
  </div>
</template>
