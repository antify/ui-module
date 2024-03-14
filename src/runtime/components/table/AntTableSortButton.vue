<script setup lang="ts">

import AntIcon from '../AntIcon.vue';
import { faAngleDown, faAngleUp, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconSize } from '../__types';
import { AntTableSortDirection } from './__types/TableHeader.type';

defineEmits([ 'sortClick' ])
withDefaults(
  defineProps<{
    sortDirection?: AntTableSortDirection
  }>(), {
    sortDirection: AntTableSortDirection.neutral
  });
</script>

<template>
  <button
    class="bg-white text-for-white-bg-font rounded h-[26px] w-[26px] flex items-center justify-center"
    @click="$emit('sortClick')"
  >
    <AntIcon
      v-if="sortDirection === AntTableSortDirection.asc"
      :icon="faAngleDown"
      :size="IconSize.sm"
    />
    <AntIcon
      v-if="sortDirection === AntTableSortDirection.desc"
      :icon="faAngleUp"
      :size="IconSize.sm"
    />
    <AntIcon
      v-if="sortDirection === AntTableSortDirection.neutral"
      :icon="faMinus"
      :size="IconSize.sm"
    />
  </button>
</template>
