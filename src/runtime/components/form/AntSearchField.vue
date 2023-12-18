<script setup lang="ts">
import { generateId } from '../../utils/helper';
import { ref, computed } from 'vue';
import AntInput from './AntInput.vue';

const emit = defineEmits(['update:value']);

const props =
  defineProps<{
    id?: string;
    value: string;
    timeoutLength?: number;
  }>();

const _id = ref(props.id ? props.id : generateId(40));
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

const content = computed<string>({
  get: () => {
    return props.value ;
  },
  set: (val: string) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }

    timeout.value = setTimeout(() => {
      emit('update:value', val);
    }, props.timeoutLength || 300);
  },
});
</script>

<template>
  <AntInput
    v-bind="$attrs"
    v-model:value="content"
    :id="_id"
    :loading="false"
  />
</template>
