<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import AntHeader from '../AntHeader.vue';
import AntInput from '../../form/AntInput.vue';
import { ref, computed } from 'vue';
import {
  faMagnifyingGlass,
  faList,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import AntSearchField from '../../form/AntSearchField.vue';

const emit = defineEmits(['search']);

defineProps<{
  title?: string;
  searchPlaceholder?: string;
}>();

let interval: number;
const search = ref<string>('');
const activeListStyle = ref<string>('cells');
const _search = computed<string>({
  get: () => {
    return search.value;
  },
  set: (val) => {
    emit('search', val);
  },
});
</script>

<template>
  <div>
    <slot name="title">
      <AntHeader>{{ title }}</AntHeader>
    </slot>

    <div class="bg-gray-100 flex justify-between p-2 border items-center">
      <div class="space-x-2 flex">
        <slot name="filters">
          <div
            class="
              text-gray-500
              hover:text-gray-800
              transition-all
              duration-300
              cursor-pointer
            "
            :class="{ 'text-gray-800': activeListStyle === 'table' }"
            @click="activeListStyle = 'table'"
          >
            <fa-icon :icon="faList" />
          </div>

          <div
            class="
              text-gray-500
              hover:text-gray-800
              transition-all
              duration-300
              cursor-pointer
            "
            :class="{ 'text-gray-800': activeListStyle === 'cells' }"
            @click="activeListStyle = 'cells'"
          >
            <fa-icon :icon="faTableCellsLarge" />
          </div>

          <slot name="addFilters" />
        </slot>
      </div>

      <div>
        <slot name="searchField">
          <AntSearchField
            v-model:value="_search"
            :leading-icon="faMagnifyingGlass"
            :placeholder="searchPlaceholder || 'Search'"
          />
        </slot>
      </div>
    </div>

    <div class="flex justify-start" v-bind="$attrs">
      <slot v-bind="{ style: activeListStyle }"></slot>
    </div>
  </div>
</template>
