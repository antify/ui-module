<script lang="ts" setup>
/**
 * This button is used for everything what is the primary
 * action like save, confirm, create, etc.
 */
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {ColorType, InputColorType} from '../../enums/ColorType.enum';
import {Position} from '../../enums/Position.enum';
import AntButton from './AntButton.vue';
import AntTooltip from '../AntTooltip.vue';
import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';

defineEmits(['click', 'blur']);
withDefaults(
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
		invalidPermissionTooltipPosition?: Position;
	}>(), {
		colorType: ColorType.primary,
		hasPermission: true,
		filled: true
	}
)
</script>

<template>
  <AntTooltip
    :expanded="expanded"
    :position="invalidPermissionTooltipPosition"
    :color-type="InputColorType.info"
  >
    <slot name="button">
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
        data-e2e="action-button"
        @click="$emit('click')"
        @blur="$emit('blur')"
      >
        <slot />
      </AntButton>
    </slot>

    <template
      v-if="!hasPermission && !skeleton"
      #content
    >
      <slot name="invalidPermissionTooltipContent" />
    </template>
  </AntTooltip>
</template>
