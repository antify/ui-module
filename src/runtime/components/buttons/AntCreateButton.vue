<script lang="ts" setup>
import AntActionButton from './AntActionButton.vue';
import {
  Position, Size, Grouped, State,
} from '@antify/ui';
import {
  faPlus,
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
  canCreate?: boolean;
  tooltipPosition?: Position;
}>(), {
  iconVariant: false,
  canCreate: true,
});

const {
  t,
} = useI18n({
  useScope: 'local',
  messages: {
    de: {
      create: 'Erstellen',
      noPermission: 'Sie haben keine Berechtigung um Einträge zu erstellen.<br> Bitte kontaktieren Sie ihren Administrator',
    },
    en: {
      create: 'Create',
      noPermission: 'You have no permission to create new entries.<br> Please contact your administrator.',
    },
  },
});
</script>

<template>
  <AntActionButton
    :filled="false"
    :state="State.primary"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faPlus : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canCreate"
    :tooltip-position="tooltipPosition"
    data-e2e="create-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      {{ t('create') }}
    </template>

    <template #invalidPermissionTooltipContent>
      <div v-html=" t('noPermission')" />
    </template>
  </AntActionButton>
</template>
