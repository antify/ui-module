<script lang="ts" setup>
import {computed, onMounted, useSlots} from 'vue';
import {handleEnumValidation} from '../handler';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle, faXmark
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntButton from './form/AntButton.vue';
import {ColorType, InputColorType} from '../enums';
import {IconColorType} from './__types';

const props = withDefaults(defineProps<{
  title: string,
  colorType?: InputColorType,
  showUndo?: boolean,
  icon?: boolean
}>(), {
  colorType: InputColorType.base,
  showUndo: false,
  icon: true
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
    [InputColorType.base]: 'bg-neutral-lighter border-neutral text-neutral',
    [InputColorType.danger]: 'bg-danger-lighter border-danger text-danger',
    [InputColorType.info]: 'bg-info-lighter border-info text-info',
    [InputColorType.success]: 'bg-success-lighter border-success text-success',
    [InputColorType.warning]: 'bg-warning-lighter border-warning text-warning',
  };

  return {
    'inline-flex flex-col gap-2.5 rounded-md p-2.5 border transition-colors': true,
    [variants[props.colorType]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});
</script>

<template>
  <div :class="classes">
    <div class="inline-flex items-center justify-between w-content gap-2.5">
      <div class="inline-flex items-center gap-2.5">
        <AntIcon
          v-if="icon"
          :icon="_icon"
          :color-type="props.colorType as unknown as IconColorType"
        />

        <div :class="{'font-semibold': hasDefaultSlot}">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>

      <AntIcon
        :icon="faXmark"
        class="cursor-pointer"
        :color-type="props.colorType as unknown as IconColorType"
        @click="() => $emit('close')"
      />
    </div>

    <div v-if="hasDefaultSlot">
      <slot/>
    </div>

    <div v-if="showUndo" class="flex justify-end">
      <AntButton
        :color-type="props.colorType as unknown as ColorType"
        @click="() => $emit('undo')"
      >
        undo
      </AntButton>
    </div>
  </div>
</template>
