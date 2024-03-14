<script lang="ts" setup>
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import AntActionButton from './AntActionButton.vue';
import {Position} from '../../enums';

defineEmits(['click', 'blur']);
withDefaults(defineProps<{
	size?: Size;
	disabled?: boolean;
	grouped?: Grouped;
	skeleton?: boolean;
	expanded?: boolean;
	canCreate?: boolean;
	invalidPermissionTooltipPosition?: Position;
}>(), {
	canCreate: true
});
</script>

<template>
  <AntActionButton
    :filled="false"
    :size="size"
    :disabled="disabled"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canCreate"
    :invalid-permission-tooltip-position="invalidPermissionTooltipPosition"
    data-e2e="create-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template #default>Create</template>

    <template #invalidPermissionTooltipContent>
      You have no permission to create new entries.<br>
      Please contact your administrator.
    </template>
  </AntActionButton>
</template>
