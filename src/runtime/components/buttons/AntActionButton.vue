<script lang="ts" setup>
/**
 * This button is used for everything what is the primary
 * action like save, confirm, create, etc.
 */
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {ColorType} from '../../enums/ColorType.enum';
import AntButton from './AntButton.vue';

defineEmits(['click', 'blur']);
withDefaults(
	defineProps<{
		size?: Size;
		disabled?: boolean;
		grouped?: Grouped;
		colorType?: ColorType;
		skeleton?: boolean;
		expanded?: boolean;
	}>(), {
		colorType: ColorType.primary,
	}
)
</script>

<template>
  <AntButton
    :size="size"
    :disabled="disabled"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :color-type="colorType"
    filled
    data-e2e="action-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <slot />
  </AntButton>
</template>
