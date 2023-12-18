<script lang="ts" setup>
import AntSearch from './form/AntSearch.vue';
import AntDropdown from './AntDropdown.vue';
import {ref} from 'vue';
import AntButton from './form/AntButton.vue';
import AntIcon from './AntIcon.vue';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {IconColorType} from './__types/AntIcon.types';
import {Position} from '../enums';
import {useVModel} from '@vueuse/core';

const props = defineProps<{
  search: string | null
}>();
const emit = defineEmits(['update:search']);

const showDropdown = ref(false);
const _search = useVModel(props, 'search', emit);
</script>

<template>
  <div class="flex gap-2.5">
    <AntSearch v-model="_search"/>

    <AntDropdown
      v-model:show-dropdown="showDropdown"
      :position="Position.left"
    >
      <AntButton
        outlined
        @click="() => showDropdown = !showDropdown"
      >
        <AntIcon
          :icon="faFilter"
          :color-type="IconColorType.neutral"
        />
      </AntButton>

      <template #content/>
    </AntDropdown>
  </div>
</template>
