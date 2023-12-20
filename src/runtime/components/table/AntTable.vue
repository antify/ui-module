<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { AntTableSortDirection, type TableHeader } from './__types/TableHeader.type';
import { type Ref, ref, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import { ColorType } from '../../enums';
import AntTh from './AntTh.vue';
import AntTd from './AntTd.vue';

const emits = defineEmits([ 'update:modelValue', 'update:skeleton', 'rowClick' ]);
// TODO:: add pagination prop and pagination to table
const props = withDefaults(
  defineProps<{
    modelValue?: Record<string, unknown> | undefined,
    headers: TableHeader[];
    data: Record<string, unknown>[];
    rowKey?: string;
    loading?: boolean;
    selectableRows?: boolean;
  }>(), {
    rowKey: 'id',
    loading: false,
    selectableRows: false,
  });

const selected: Ref<Record<string, unknown> | undefined> = useVModel(props, 'modelValue', emits);
const _loading: Ref<boolean> = useVModel(props, 'loading', emits);
const internalRows: Ref<Record<string, unknown>[]> = ref([]);

watch(() => props.data, () => {
  internalRows.value = [ ...props.data ];

  // TODO after update current sort should be reapplied
}, {
  deep: true,
  immediate: true
});

function sortTable(header: TableHeader, newDirection: AntTableSortDirection) {
  // TODO:: Sorting is always done externally, here should only be a emit sort with header and direction.
  // TODO:: Save current sort in some kind of prop (maybe same as pagination?)
  // TODO:: Multi column sort?
  if (newDirection !== AntTableSortDirection.neutral) {
    if (header.sort) {
      const sortFn = header.sort;
      internalRows.value.sort((a, b) => sortFn(a, b, newDirection));
    } else {
      internalRows.value.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
        if (newDirection === AntTableSortDirection.asc) {
          return (a[header.identifier] as string) < (b[header.identifier] as string) ? -1 : 1
        } else {
          return (a[header.identifier] as string) > (b[header.identifier] as string) ? -1 : 1
        }
      });
    }
  } else {
    // Reset sort to default
    internalRows.value = [ ...props.data ];
  }
}

function rowClick(elem: Record<string, unknown>): void {
  selected.value = elem;

  emits('rowClick', elem);
}
</script>

<template>
  <div class="relative inline-block min-w-full align-middle h-full">
    <div class="overflow-hidden h-full overflow-x-auto overflow-y-auto">
      <table
        v-bind="$attrs"
        class="min-w-full max-h-full h-full relative"
        :class="{'overflow-hidden': data.length > 0 && _loading}"
      >
        <thead class="bg-neutral-lighter sticky top-0">
        <tr class="">
          <slot name="headerFirstCell"></slot>

          <AntTh
            v-for="(header, index) in headers"
            :key="`table-header-${header.identifier}-${index}`"
            :header="header"
            @sort="sortTable"
          >
            <template #headerContent>
              <slot name="headerContent" v-bind="header">
              </slot>
            </template>
          </AntTh>

          <slot name="headerLastCell"></slot>
        </tr>
        </thead>

        <tbody class="bg-white">
        <!-- TODO:: Add some kind of virtual list for very large tree data (or required pagination??) -->
        <tr
          v-for="(elem, index) in internalRows"
          :key="`table-row-${elem[rowKey]}-${index}`"
          :id="elem[rowKey] as string"
          class="transition-all"
          :class="{
            'bg-primary-light text-primary-light-font': elem === selected,
            'bg-neutral-lightest text-neutral-lightest-font': elem !== selected && index % 2 === 0,
            'bg-neutral-lighter text-neutral-lighter-font': elem !== selected && index % 2 !== 0,
            'cursor-pointer': selectableRows
          }"
        >
          <slot name="rowFirstCell" v-bind="{ elem }"/>

          <AntTd
            v-for="(header, index) in headers"
            :key="`table-cell-${header.identifier}-${index}`"
            :header="header"
            :element="elem"
            :align="header.align"
            @click="rowClick(elem)"
          >
            <template #beforeCellContent="props">
              <slot name="beforeCellContent" v-bind="props"/>
            </template>

            <template #cellContent="props">
              <slot name="cellContent" v-bind="props"/>
            </template>

            <template #afterCellContent="props">
              <slot name="afterCellContent" v-bind="props"/>
            </template>
          </AntTd>

          <slot name="rowLastCell" v-bind="{ elem }"/>
        </tr>

        <tr v-if="data.length <= 0 && !_loading">
          <td
            colspan="100"
            class="w-full h-full py-2 text-center text-neutral-lightest-font text-lg"
          >
            <slot name="emptyState">
              <div class="flex items-center flex-col">
                <span class="font-semibold">We couldn't find any entry</span>
              </div>
            </slot>
          </td>
        </tr>

        <tr v-if="!data || data.length <= 0 && _loading">
          <slot name="emptyState">
            <td
              colspan="100"
              class="w-full h-full py-2 text-center text-gray-500 text-2xl italic relative"
            >
              <AntSkeleton v-model="_loading" absolute/>
            </td>
          </slot>
        </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="data.length > 0 && _loading"
      class="absolute bg-opacity-50 w-full top-0 bottom-0 bg-neutral-light flex items-center justify-center"
    >
      <AntSpinner class="!w-24 !h-24" :color-type="ColorType.primary"/>
    </div>
  </div>
</template>
