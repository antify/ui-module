<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {Size} from '../enums/Size.enum'
import {TagColorType} from '../types/AntTag.type';
import {handleEnumValidation} from '../handler';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';

defineEmits(['close']);
const props = withDefaults(defineProps<{
  colorType?: TagColorType,
  size?: Size;
  iconLeft?: IconDefinition;
  dismiss?: boolean
}>(), {
  size: Size.md,
  colorType: TagColorType.neutralLight,
  dismiss: false
});

const classes = computed(() => {
  const variants: Record<TagColorType, string> = {
    [TagColorType.danger]: 'bg-danger text-danger-font',
    [TagColorType.info]: 'bg-info text-info-font',
    [TagColorType.neutralLight]: 'bg-neutral-light text-neutral-light-font',
    [TagColorType.neutralLightest]: 'bg-neutral-lightest text-neutral-lightest-font',
    [TagColorType.success]: 'bg-success text-success-font',
    [TagColorType.warning]: 'bg-warning text-warning-font',
  };

  return {
    'rounded-md inline-flex items-center': true,
    'px-1.5 py-1 text-sm gap-1.5': props.size === Size.md,
    'px-1 py-0.5 text-xs  gap-1': props.size === Size.sm,
    [variants[props.colorType]]: true,
  };
});
const iconClasses = computed(() => ({
  'h-3': props.size === Size.sm,
  'h-4': props.size === Size.md,
}));

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, TagColorType, 'colorType');
});
</script>

<template>
  <span :class="classes">
    <span
        v-if="iconLeft"
        class="inline-flex items-center justify-center"
        :class="{'w-4 h-4': props.size === Size.sm, 'w-5 h-5': props.size === Size.md}"
    >
      <fa-icon
          :icon="iconLeft"
          :class="iconClasses"
      />
    </span>

    <slot/>

    <span
        v-if="dismiss"
        class="inline-flex items-center justify-center"
        :class="{'w-4 h-4': props.size === Size.sm, 'w-5 h-5': props.size === Size.md}"
    >
      <fa-icon
          :icon="faCircleXmark"
          :class="iconClasses"
          class="cursor-pointer"
          @click="() => $emit('close')"
      />
    </span>
  </span>
</template>
