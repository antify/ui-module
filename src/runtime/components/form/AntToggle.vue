<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { generateId } from '../../utils/helper';

const emit = defineEmits(['update:value']);
const props =
  defineProps<{
    id?: string;
    value: boolean;
    color?: string;
  }>();

const _id = ref<string>(props.id || generateId(40));
const _color = ref<string>(props.color || 'primary');

const _value = computed<boolean>({
  get: (): boolean => {
    return props.value;
  },
  set: (val: boolean) => {
    emit('update:value', val);
  },
});
</script>

<template>
  <div class="flex items-center">
    <button
      v-bind="$attrs"
      type="button"
      class="
        relative
        inline-flex
        flex-shrink-0
        h-6
        w-11
        border-2 border-transparent
        rounded-full
        cursor-pointer
        transition-colors
        ease-in-out
        duration-200
        focus:outline-none
        focus:ring-2 focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
      :class="
        (_value ? `bg-${_color}` : 'bg-gray-200') + ` focus:ring-${_color}`
      "
      role="switch"
      aria-checked="false"
      :aria-labelledby="`${_id}-toggle`"
      @click="_value = !_value"
    >
      <span
        aria-hidden="true"
        class="
          pointer-events-none
          inline-block
          h-5
          w-5
          rounded-full
          bg-white
          shadow
          transform
          ring-0
          transition
          ease-in-out
          duration-200
        "
        :class="{ 'translate-x-5': _value, 'translate-x-0': !_value }"
      >
        <slot name="icon"></slot>
      </span>
    </button>

    <span class="ml-3" :id="`${_id}-toggle`">
      <slot></slot>
    </span>
  </div>
</template>
