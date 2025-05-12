<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {
  Position, Size, Grouped, State,
} from '@antify/ui';
import {
  faPencil,
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
  canEdit?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canEdit: true,
});

const {
  t,
} = useI18n({
  useScope: 'local',
  messages: {
    de: {
      edit: 'Bearbeiten',
      noPermission: 'Sie haben keine Berechtigung um Einträge zu bearbeiten.<br> Bitte kontaktieren Sie ihren Administrator',
    },
    en: {
      edit: 'Edit',
      noPermission: 'You have no permission to edit entries.<br> Please contact your administrator.',
    },
  },
});
</script>

<template>
  <AntActionButton
    :filled="false"
    :state="State.base"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faPencil : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canEdit"
    :tooltip-position="tooltipPosition"
    data-e2e="edit-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      {{ t('edit') }}
    </template>

    <template #invalidPermissionTooltipContent>
      <div v-html=" t('noPermission')" />
    </template>
  </AntActionButton>
</template>
