<script lang="ts" setup>
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import AntActionButton from './AntActionButton.vue';
import {ColorType, Position} from '../../enums';
import {faCopy} from '@fortawesome/free-solid-svg-icons';

defineEmits(['click', 'blur']);
withDefaults(defineProps<{
	size?: Size;
	disabled?: boolean;
	grouped?: Grouped;
	skeleton?: boolean;
	expanded?: boolean;
	canDuplicate?: boolean;
	invalidPermissionTooltipPosition?: Position;
}>(), {
	canDuplicate: true
});
</script>

<template>
  <AntActionButton
    :icon-left="faCopy"
    :color-type="ColorType.base"
    :size="size"
    :disabled="disabled"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canDuplicate"
    :invalid-permission-tooltip-position="invalidPermissionTooltipPosition"
    data-e2e="create-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template #invalidPermissionTooltipContent>
      You have no permission to duplicate entries.<br>
      Please contact your administrator.
    </template>
  </AntActionButton>
</template>
