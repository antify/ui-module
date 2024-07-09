<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {TagColorType} from '../types/AntTag.type';
import {handleEnumValidation} from '../handler';
import {faCircleXmark, type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {AntTagSize} from './__types/AntTag.types';
import AntIcon from './AntIcon.vue';
import {IconSize} from './__types/AntIcon.types';

defineEmits(['close']);
const props = withDefaults(defineProps<{
  colorType?: TagColorType,
  size?: AntTagSize;
  iconLeft?: IconDefinition;
  dismiss?: boolean
}>(), {
  size: AntTagSize.md,
  colorType: TagColorType.base,
  dismiss: false
});

const classes = computed(() => {
  const variants: Record<TagColorType, string> = {
    [TagColorType.danger]: 'bg-danger-500 text-danger-500-font',
    [TagColorType.info]: 'bg-info-500 text-info-500-font',
    [TagColorType.primary]: 'bg-primary-500 text-primary-500-font',
    [TagColorType.secondary]: 'bg-secondary-500 text-secondary-500-font',
    [TagColorType.base]: 'bg-neutral-300 text-neutral-300-font',
    [TagColorType.success]: 'bg-success-500 text-success-500-font',
    [TagColorType.warning]: 'bg-warning-500 text-warning-500-font',
  };
  return {
    'rounded-md inline-flex items-center': true,
    'px-1 py-0.5 text-xs gap-0.5': props.size === AntTagSize.xs3,
    'px-1.5 py-1 text-xs gap-1': props.size === AntTagSize.xs2,
    'px-2 py-1.5 text-xs gap-1.5': props.size === AntTagSize.xs,
    'px-2 py-1.5 text-sm gap-1.5': props.size === AntTagSize.sm,
    'px-2.5 py-2 text-sm gap-2': props.size === AntTagSize.md,
    'px-3 py-2.5 text-sm gap-2.5': props.size === AntTagSize.lg,
    [variants[props.colorType]]: true,
  };
});
const getIconSize = computed(() => {
  if (props.size === AntTagSize.xs || props.size === AntTagSize.xs2 || props.size === AntTagSize.xs3) {
    return IconSize.xs;
  } else {
    return IconSize.sm;
  }
});
const iconColorType = computed(() => {
  if (props.colorType === TagColorType.info) {
    return 'text-info-500-font';
  }  else if (props.colorType === TagColorType.success) {
    return 'text-success-500-font';
  } else if (props.colorType === TagColorType.warning) {
    return 'text-warning-500-font';
  } else if (props.colorType === TagColorType.danger) {
    return 'text-danger-500-font';
  } else if (props.colorType === TagColorType.primary){
    return 'text-primary-500-font';
  } else if (props.colorType === TagColorType.secondary) {
    return 'text-secondary-500-font';
  } else {
    return 'text-neutral-300-font';
  }
});
const iconWrapperClass = computed(() => {
  return {
    'w-4 h-4': props.size === AntTagSize.xs2 || props.size === AntTagSize.xs,
    'w-5 h-5': props.size === AntTagSize.sm || props.size === AntTagSize.md || props.size === AntTagSize.lg
  };
});

onMounted(() => {
  handleEnumValidation(props.size, AntTagSize, 'size');
  handleEnumValidation(props.colorType, TagColorType, 'colorType');
});
</script>

<template>
  <span
    :class="classes"
    data-e2e="tag"
  >
    <span
      v-if="iconLeft"
      class="inline-flex items-center justify-center"
      :class="iconWrapperClass"
    >
      <AntIcon
        :icon="iconLeft"
        :size="getIconSize"
        :color="iconColorType"
      >
      </anticon>
    </span>

    <slot />

    <span
      v-if="dismiss"
      class="inline-flex items-center justify-center"
      :class="iconWrapperClass"
    >
      <AntIcon
        :icon="faCircleXmark"
        :size="getIconSize"
        :color="iconColorType"
        class="cursor-pointer"
        @click="() => $emit('close')"
      />
    </span>
  </span>
</template>
