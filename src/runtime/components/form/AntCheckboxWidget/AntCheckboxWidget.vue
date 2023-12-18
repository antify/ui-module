<script lang="ts" setup>
import AntCheckbox from './AntCheckbox.vue';
import { generateId } from '../../../utils/helper';
import { ref, computed } from 'vue';
import type { Checkbox } from '../../../types/Checkbox.type';

const emit = defineEmits(['update:value']);

const props =
  defineProps<{
    value: any[];
    id?: string;
    label?: string;
    description?: string;
    checkboxes: Checkbox[];
    loading?: boolean;
  }>();

const _id = ref<string>(props.id || generateId(40));
const _value = computed<Checkbox[]>({
  get: () => {
    return props.value;
  },
  set: (val) => {
    emit('update:value', val);
  },
});
</script>

<template>
  <div class="px-2 mb-2">
    <slot>
      <slot name="label">
        <legend class="block text-sm font-medium text-gray-700">
          {{ label }}
        </legend>
      </slot>
    </slot>

    <div
      v-for="(checkbox, index) in checkboxes"
      :key="`checkbox-widget-${_id}-${index}`"
    >
      <AntCheckbox
        v-model:checked="_value"
        v-bind="$attrs"
        :id="checkbox.id"
        :value="checkbox.value"
        :label="checkbox.label"
        :description="checkbox.description"
        :legend="checkbox.legend"
        :color="checkbox.color"
        :loading="loading"
        class="relative flex items-start"
      />
    </div>

    <slot name="description">
      <p class="text-sm leading-5 text-gray-500">{{ description }}</p>
    </slot>
  </div>
</template>
