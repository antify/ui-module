<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {Size} from '../../../enums/Size.enum';
import AntSkeleton from '../../AntSkeleton.vue';
import {handleEnumValidation} from '../../../handler';

defineEmits(['clickContent']);

const props = withDefaults(defineProps<{
  label?: string;
  size?: Size;
  skeleton?: boolean;
}>(), {
  skeleton: false,
  size: Size.md,
});

const classes = computed(() => ({
  'relative font-medium w-fit': true,
  'text-2xs': props.size === Size.xs2,
  'text-xs': props.size === Size.xs,
  'text-sm': props.size === Size.sm,
  'text-md': props.size === Size.md,
  'text-lg': props.size === Size.lg
}));

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <label
    class="flex flex-col gap-1.5 w-full"
  >
    <span
      v-if="label"
      :class="classes"
    >
      <span
        :class="{'invisible': skeleton}"
        @click="$emit('clickContent')"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </span>

      <AntSkeleton
        v-if="skeleton"
        absolute
        rounded
      />
    </span>

    <slot />
  </label>
</template>
