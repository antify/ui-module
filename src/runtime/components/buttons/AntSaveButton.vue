<script lang="ts" setup>
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {ColorType} from '../../enums/ColorType.enum';
import AntActionButton from './AntActionButton.vue';
import {Position} from '../../enums';

defineEmits(['click', 'blur']);
withDefaults(defineProps<{
	size?: Size;
	disabled?: boolean;
	grouped?: Grouped;
	skeleton?: boolean;
	expanded?: boolean;
	canSave?: boolean;
	invalidPermissionTooltipPosition?: Position;
}>(), {
	canSave: true
});
</script>

<template>
  <AntActionButton
    :size="size"
    :disabled="disabled"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :color-type="ColorType.primary"
    data-e2e="save-button"
    :has-permission="canSave"
    :invalid-permission-tooltip-position="invalidPermissionTooltipPosition"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template #default>Save</template>

    <template #invalidPermissionTooltipContent>
      You have no permission to save this entry.<br>
      Please contact your administrator.
    </template>
  </AntActionButton>
</template>
