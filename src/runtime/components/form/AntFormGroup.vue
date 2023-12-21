<script lang="ts" setup>
import {Direction} from '../../enums/Direction.enum';
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  direction?: Direction;
}>(), {
  direction: Direction.column,
});

const classes = computed(() => ({
  'flex-col space-y-2.5': props.direction === Direction.column,
  'flex-row space-x-2.5': props.direction === Direction.row,
}));
</script>

<template>
  <section class="flex" :class="classes">
    <slot/>
  </section>
</template>
