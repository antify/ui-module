<script lang="ts" setup>
/**
 * This button is used for everything what is the primary
 * action like save, confirm, create, etc.
 */
import {Position, ColorType, InputColorType, Size, Grouped} from '../../enums';
import AntButton from './AntButton.vue';
import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {computed, useSlots} from 'vue';
import {hasSlotContent} from '../../utils';

defineEmits(['click', 'blur']);
const props = withDefaults(
	defineProps<{
		iconLeft?: IconDefinition;
		iconRight?: IconDefinition;
		size?: Size;
		disabled?: boolean;
		grouped?: Grouped;
		colorType?: ColorType;
		skeleton?: boolean;
		expanded?: boolean;
		filled?: boolean;
		hasPermission?: boolean;
		tooltipPosition?: Position;
		tooltipColorType?: InputColorType;
		tooltipDelay?: number;
	}>(), {
		colorType: ColorType.primary,
		hasPermission: true,
		filled: true
	}
)
const slots = useSlots();
const hasTooltip = computed(() => !props.skeleton && !props.disabled && props.hasPermission && hasSlotContent(slots['tooltipContent']));
const hasPermissionTooltip = computed(() => !props.skeleton && !props.disabled && !props.hasPermission && hasSlotContent(slots['invalidPermissionTooltipContent']));
</script>

<template>
  <AntButton
    :icon-left="iconLeft"
    :icon-right="iconRight"
    :size="size"
    :disabled="disabled || !hasPermission"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :color-type="colorType"
    :filled="filled"
    :tooltip-position="tooltipPosition"
    :tooltip-color-type="hasPermissionTooltip ? InputColorType.info : tooltipColorType"
    :tooltip-delay="hasPermissionTooltip ? 300 : tooltipDelay"
    data-e2e="action-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <slot />

    <template #tooltip-content>
      <slot
        v-if="hasTooltip"
        name="tooltipContent"
      />

      <slot
        v-if="hasPermissionTooltip"
        name="invalidPermissionTooltipContent"
      />
    </template>
  </AntButton>
</template>
