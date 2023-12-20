<script setup lang="ts">

import { AntTableAlign, AntTableSortDirection, type TableHeader } from './__types/TableHeader.type';
import { computed, ref, type Ref } from 'vue';
import AntTableSortButton from './AntTableSortButton.vue';

defineEmits([ 'sort' ])
const props = defineProps<{
  header: TableHeader
}>();

const headerClasses = computed(() => {
  const classes = {
    [props.header.headerClassList || '']: true,
    'px-2.5 py-0 h-[40px] text-sm text-neutral-lighter-font uppercase font-semi-bold': true,
    'text-left': !props.header.align || props.header.align === AntTableAlign.left,
    'text-center': props.header.align === AntTableAlign.center,
    'text-right': props.header.align === AntTableAlign.right,
  };

  return classes;
});

const cellClasses = computed(() => ({
  'flex gap-2.5 items-center': true,
  'justify-start': !props.header.align || props.header.align === AntTableAlign.left,
  'justify-center': props.header.align === AntTableAlign.center,
  'justify-end': props.header.align === AntTableAlign.right,
}))

// TODO:: Initial sort should be possible with this
const sortDirection: Ref<AntTableSortDirection> = ref(AntTableSortDirection.neutral);

function getNewSortDirection(): AntTableSortDirection {
  if (sortDirection.value === AntTableSortDirection.neutral) {
    sortDirection.value = AntTableSortDirection.asc;
    return AntTableSortDirection.asc;
  }

  if (sortDirection.value === AntTableSortDirection.asc) {
    sortDirection.value = AntTableSortDirection.desc;
    return AntTableSortDirection.desc;
  }

  sortDirection.value = AntTableSortDirection.neutral;
  return AntTableSortDirection.neutral;
}
</script>

<template>
  <th
    scope="col"
    :class="headerClasses"
  >
    <div :class="cellClasses">
      <slot name="headerContent" v-bind="header">
        {{ header.title }}
      </slot>

      <AntTableSortButton
        v-if="header.sortable"
        @sort-click="$emit('sort', header, getNewSortDirection())"
        :sort-direction="sortDirection"
      />
    </div>
  </th>
</template>
