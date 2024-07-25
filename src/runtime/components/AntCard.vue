<script setup lang="ts">
import {AntCardPaddingSize} from './__types/AntCard.types';
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  padding?: AntCardPaddingSize
  expanded?: boolean
}>(), {
  padding: AntCardPaddingSize.md,
  expanded: false
});

const cardClass = computed(() => {
  return {
    'inline-block': true,
    'w-full': props.expanded,
    'p-2.5': props.padding === AntCardPaddingSize.lg,
    'p-2': props.padding === AntCardPaddingSize.md,
    'p-1.5': props.padding === AntCardPaddingSize.sm || props.padding === AntCardPaddingSize.xs,
    'p-1': props.padding === AntCardPaddingSize.xs2,
    'p-0': props.padding === AntCardPaddingSize.xs2,
  };
});
</script>

<template>
  <div
    :class="cardClass"
    class="bg-white border border-neutral-300 rounded-md"
  >
    <slot />
  </div>
</template>
