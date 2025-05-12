<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {
  Position, Size, Grouped, State,
} from '@antify/ui';
import {
  faFloppyDisk,
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
  canSave?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canSave: true,
});

const {
  t,
} = useI18n({
  useScope: 'local',
  messages: {
    de: {
      save: 'Speichern',
      noPermission: 'Sie haben keine Berechtigung um Einträge zu speichern.<br> Bitte kontaktieren Sie ihren Administrator',
    },
    en: {
      save: 'Save',
      noPermission: 'You have no permission to save entries.<br> Please contact your administrator.',
    },
  },
});
</script>

<template>
  <AntActionButton
    :filled="true"
    :state="State.primary"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faFloppyDisk : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :submit="true"
    :has-permission="canSave"
    :tooltip-position="tooltipPosition"
    data-e2e="save-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      {{ t('save') }}
    </template>

    <template #invalidPermissionTooltipContent>
      <div v-html=" t('noPermission')" />
    </template>
  </AntActionButton>
</template>
