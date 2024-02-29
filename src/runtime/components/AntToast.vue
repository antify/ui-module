<script lang="ts" setup>
import {computed, onMounted, useSlots} from 'vue';
import {handleEnumValidation} from '../handler';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntButton from './buttons/AntButton.vue';
import {ColorType, InputColorType} from '../enums';

const props = withDefaults(defineProps<{
  title?: string,
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
    [InputColorType.base]: 'bg-neutral-100 border-neutral-500 text-neutral-500',
    [InputColorType.danger]: 'bg-danger-100 border-danger-500 text-danger-500',
    [InputColorType.info]: 'bg-info-100 border-info-500 text-info-500',
    [InputColorType.success]: 'bg-success-100 border-success-500 text-success-500',
    [InputColorType.warning]: 'bg-warning-100 border-warning-500 text-warning-500',
  };

  return {
    'inline-flex flex-col gap-2.5 rounded-md p-2.5 border transition-colors shadow-md': true,
    [variants[props.colorType]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);
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
    data-e2e="toast"
    :data-e2e-color-type="props.colorType"
  >
    <div class="inline-flex items-center justify-between w-content gap-2.5">
      <div class="inline-flex items-center gap-2.5">
        <AntIcon
          v-if="icon"
          :icon="_icon"
          :color="iconColor"
        />

        <div class="whitespace-pre" :class="{'font-semibold': hasDefaultSlot}">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>

      <AntIcon
        :icon="faXmark"
        class="cursor-pointer"
        :color="iconColor"
        @click="() => $emit('close')"
      />
    </div>

    <div v-if="hasDefaultSlot">
      <slot/>
    </div>

    <div v-if="showUndo" class="flex justify-end">
      <AntButton
        :color-type="props.colorType as unknown as ColorType"
        filled
        @click="() => $emit('undo')"
      >
        undo
      </AntButton>
    </div>
  </div>
</template>
