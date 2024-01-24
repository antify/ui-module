<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {handleEnumValidation} from '../handler';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IconSize} from './__types/AntIcon.types';

const props = withDefaults(defineProps<{
  icon: IconDefinition;
  size?: IconSize;

  /**
   * A css text-* class
   */
  color?: string;
}>(), {
  size: IconSize.md,
  color: 'text-for-white-bg-font'
});

const containerClasses = computed(() => ({
  'inline-flex items-center justify-center': true,
  'w-4 h-4': props.size === IconSize.sm,
  'w-5 h-5': props.size === IconSize.md,
  'w-9 h-9': props.size === IconSize.xl3,
  [props.color]: true,
}));

// TODO:: replace with/height with font-size
const iconClasses = computed(() => ({
  'transition-colors': true,
  'h-3 w-3': props.size === IconSize.sm,
  'h-4 w-4': props.size === IconSize.md,
  'text-3xl': props.size === IconSize.xl3,
}));

onMounted(() => {
  handleEnumValidation(props.size, IconSize, 'size');
});
</script>

<template>
  <span
      v-if="icon"
      :class="containerClasses"
  >
    <fa-icon
        :icon="icon"
        :class="iconClasses"
    />
  </span>
</template>
