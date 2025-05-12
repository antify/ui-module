<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {
  Position, Size, Grouped, State,
} from '@antify/ui';
import {
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  useI18n,
} from 'vue-i18n';

defineEmits([
  'click',
  'blur',
]);
withDefaults(defineProps<{
  iconVariant?: boolean;
  size?: Size;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  expanded?: boolean;
  canDelete?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canDelete: true,
});

const {
  t,
} = useI18n({
  useScope: 'local',
  messages: {
    de: {
      delete: 'Löschen',
      noPermission: 'Sie haben keine Berechtigung um Einträge zu löschen.<br> Bitte kontaktieren Sie ihren Administrator',
    },
    en: {
      delete: 'Delete',
      noPermission: 'You have no permission to delete entries.<br> Please contact your administrator.',
    },
  },
});
</script>

<template>
  <AntActionButton
    :filled="false"
    :state="State.danger"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faTrash : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canDelete"
    :tooltip-position="tooltipPosition"
    data-e2e="delete-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      {{ t('delete') }}
    </template>

    <template #invalidPermissionTooltipContent>
      <div v-html=" t('noPermission')" />
    </template>
  </AntActionButton>
</template>
