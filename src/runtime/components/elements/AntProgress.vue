<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { generateId } from '../../utils/helper';

const props =
  defineProps<{
    id?: string;
    value?: number;
    fullValue?: number;
    label?: string;
    color?: string;
  }>();

const _id = ref<string>(props.id || generateId(40));
const _color = ref<string>(props.color || 'primary');

const current = computed<number>(
  () => ((props.value || 0) * 100) / (props.fullValue || 100)
);
</script>

<template>
  <div class="text-xs text-gray-500 flex justify-between">
    <slot name="label">
      <span>{{ label }}</span>

      <span>
        {{ (value || 0).toLocaleString(undefined, {}) }}/{{
          (fullValue || 100).toLocaleString(undefined, {})
        }}
      </span>
    </slot>
  </div>

  <div
    :id="_id"
    class="
      w-full
      bg-gray-400
      min-h-2
      flex
      justify-center
      items-center
      relative
      overflow-hidden
      rounded-full
    "
    v-bind="$attrs"
  >
    <div
      :style="`width: ${current}%`"
      :class="`bg-${_color} h-full absolute left-0 transition-all rounded-full duration-500`"
    />

    <div class="z-10 flex items-center"><slot></slot></div>
  </div>
</template>
