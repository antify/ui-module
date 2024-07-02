<script lang="ts" setup>
// TODO:: Fix typo KeyCap with upperchar C
import AntIcon from './AntIcon.vue';
import {type IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IconSize} from './__types';

defineProps<{
  icon?: IconDefinition
}>();
</script>

<template>
  <span
    class="inline-block py-0.5 px-1.5 bg-neutral-300 rounded-md text-sm min-w-[1.5rem] text-center text-neutral-500-font font-medium"
  >
    <AntIcon
      v-if="icon"
      :icon="icon"
      :size="IconSize.xs"
    />

    <slot v-else />
  </span>
</template>
