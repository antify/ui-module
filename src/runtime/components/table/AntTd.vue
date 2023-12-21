<script setup lang="ts">

import { AntTableAlign, AntTableRowTypes, type TableHeader } from './__types/TableHeader.type';
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

const props =
  withDefaults(
    defineProps<{
      element: Record<string, unknown>;
      header: TableHeader;
      align?: AntTableAlign
    }>(), {
      align: AntTableAlign.left
    });

const cellClasses = computed(() => ({
  'whitespace-nowrap px-2.5 py-0 h-[40px] text-sm font-medium relative': true,
  'text-right': props.align === AntTableAlign.right,
  'text-center': props.align === AntTableAlign.center
}))
</script>

<template>
  <td
    :class="cellClasses"
  >
    <slot
      name="beforeCellContent"
      v-bind="{ elem: element, header: header }"
    />

    <div
      v-if="header.type === AntTableRowTypes.text"
      :class="header.rowClassList"
    >
      {{ element[header.identifier] }}
    </div>

    <div
      v-else-if="header.type === AntTableRowTypes.link && header.toProp"
    >
      <router-link :to="element[header.toProp] as RouteLocationRaw" class="absolute inset-0">
      </router-link>
      {{ element[header.identifier] }}
    </div>

    <div
      v-else-if="header.type === AntTableRowTypes.html"
      :class="header.rowClassList"
      v-html="element[header.identifier]"
    />

    <div
      v-else-if="header.type === AntTableRowTypes.slot"
      :class="header.rowClassList"
    >
      <slot name="cellContent" v-bind="{ element, header }"></slot>
    </div>

    <slot
      name="afterCellContent"
      v-bind="{ elem: element, header: header }"
    />
  </td>
</template>

<style scoped>

</style>
