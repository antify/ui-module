<script lang="ts" setup>
import {Grouped} from '../../enums/Grouped.enum';
import {Size} from '../../enums/Size.enum';
import {ColorType} from '../../enums/ColorType.enum';
import AntButton from './AntButton.vue';

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
  <AntButton
    :size="size"
    :disabled="disabled"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :color-type="ColorType.primary"
    filled
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    Create
  </AntButton>
</template>
