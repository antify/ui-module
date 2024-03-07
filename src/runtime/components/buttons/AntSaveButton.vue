<script lang="ts" setup>
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {ColorType} from '../../enums/ColorType.enum';
import AntActionButton from './AntActionButton.vue';

defineEmits(['click', 'blur']);
defineProps<{
  size?: Size;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  expanded?: boolean;
}>()
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
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    Save
  </AntActionButton>
</template>
