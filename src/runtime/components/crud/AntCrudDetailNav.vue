<script setup lang="ts">
// TODO:: fix why tabs are not full height in story
import type {TabItem} from '../tabs/__types/AntTabItem.types';
import AntTabs from '../tabs/AntTabs.vue';
import AntDeleteButton from '../buttons/AntDeleteButton.vue';
import AntDeleteDialog from '../dialogs/AntDeleteDialog.vue';
import {ref} from 'vue';

defineEmits(['delete']);
withDefaults(defineProps<{
  tabItems?: TabItem[]
  disabled?: boolean
  getEntityName: () => string
}>(), {
  disabled: false,
});

const dialogOpen = ref(false);
</script>

<template>
  <div class="flex justify-between items-stretch gap-2.5 bg-neutral-50">
    <slot name="tabs">
      <AntTabs
        :tabItems="tabItems"
      />
    </slot>

    <div class="flex gap-2.5 pr-2.5 py-2.5">
      <slot name="buttons">
        <slot name="before-delete-button"/>

        <slot name="delete-button">
          <AntDeleteButton
            :disabled="disabled"
            filled
            @click="() => dialogOpen = true"
          />
        </slot>

        <slot name="after-delete-button"/>
      </slot>
    </div>

    <AntDeleteDialog
      v-model:open="dialogOpen"
      :entity="getEntityName()"
      @confirm="$emit('delete')"
    />
  </div>
</template>
