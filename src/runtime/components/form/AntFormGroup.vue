<script lang="ts" setup>
import {Direction} from '../../enums/Direction.enum';
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  direction?: Direction;
}>(), {
  direction: Direction.column,
});

const classes = computed(() => ({
  'flex-col gap-y-2.5': props.direction === Direction.column,
  'flex-row gap-x-2.5': props.direction === Direction.row,
}));
</script>

<template>
  <section
    class="flex"
    :class="classes"
  >
    <slot />
  </section>
</template>
