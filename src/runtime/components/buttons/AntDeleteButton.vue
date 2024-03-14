<script lang="ts" setup>
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {ColorType} from '../../enums/ColorType.enum';
import AntActionButton from './AntActionButton.vue';
import {Position} from '../../enums';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

defineEmits(['click', 'blur']);
withDefaults(defineProps<{
	iconVariant?: boolean;
	size?: Size;
	disabled?: boolean;
	grouped?: Grouped;
	skeleton?: boolean;
	expanded?: boolean;
	canDelete?: boolean;
	invalidPermissionTooltipPosition?: Position;
}>(), {
	iconVariant: false,
	canDelete: true
})
</script>

<template>
  <AntActionButton
    :icon-left="iconVariant ? faTrash : undefined"
    :filled="false"
    :size="size"
    :disabled="disabled"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :color-type="ColorType.danger"
    :has-permission="canDelete"
    :invalid-permission-tooltip-position="invalidPermissionTooltipPosition"
    data-e2e="delete-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Delete
    </template>

    <template #invalidPermissionTooltipContent>
      You have no permission to delete this entry.<br>
      Please contact your administrator.
    </template>
  </AntActionButton>
</template>
