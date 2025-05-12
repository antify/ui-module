<script setup lang="ts">
import {
  AntDialog,
  InputState,
} from '@antify/ui';
import {
  useVModel,
} from '@vueuse/core';
import {
  useI18n,
} from 'vue-i18n';

const emit = defineEmits([
  'update:open',
  'close',
  'confirm',
]);
const props = defineProps<{
  open: boolean;
  entity: string;
}>();

const {
  t,
} = useI18n({
  useScope: 'local',
  messages: {
    de: {
      title: 'Löschen',
      confirmText: 'Löschen',
      cancelText: 'Abbrechen',
      deleteText_1_2: 'Wollen Sie wirklich',
      deleteText_2_2: 'löschen?',
    },
    en: {
      title: 'Delete',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      deleteText_1_2: 'Do you really want to delete',
      deleteText_2_2: '?',
    },
  },
});

const _open = useVModel(props, 'open', emit);
</script>

<template>
  <AntDialog
    v-model:open="_open"
    :state="InputState.danger"
    :title="t('title')"
    :confirm-text="t('confirmText')"
    :cancel-text="t('cancelText')"
    data-e2e="delete-dialog"
    @confirm="() => $emit('confirm')"
    @close="() => $emit('close')"
  >
    <div>
      {{ t('deleteText_1_2') }} <span class="font-semibold">{{ entity }}</span> {{ t('deleteText_2_2') }}
    </div>
  </AntDialog>
</template>
