<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import AntBaseInput from './Elements/AntBaseInput.vue'
import {Size} from '../../enums/Size.enum'
import {Validator} from '@antify/validate'
import {handleEnumValidation} from '../../handler';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useVModel} from '@vueuse/core';
import {BaseInputType} from './Elements/__types';
import AntField from './Elements/AntField.vue';

const emits = defineEmits(['update:modelValue', 'update:skeleton']);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  disabled?: boolean;
  skeleton?: boolean;
  validator?: Validator;
  inputTimeout?: number;
  query?: string;
}>(), {
  disabled: false,
  skeleton: false,
  size: Size.md,
  inputTimeout: 300,
  placeholder: 'Search'
});

const _skeleton = useVModel(props, 'skeleton', emits);
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

// TODO:: implement query prop. Find a way to use vue router in Storybook.
const _value = computed<string | null>({
  get: () => props.modelValue,
  set: (val: string | null) => {
    if (val === null) {
      return emits('update:modelValue', val);
    }

    if (timeout.value) {
      clearTimeout(timeout.value);
    }

    timeout.value = setTimeout(() => {
      emits('update:modelValue', val);
    }, props.inputTimeout);
  },
});

onMounted(() => handleEnumValidation(props.size, Size, 'size'));
</script>

<template>
  <AntField
      :label="label"
      :size="size"
      :skeleton="_skeleton"
      :description="description"
      :validator="validator"
  >
    <AntBaseInput
        v-model:value="_value"
        :type="BaseInputType.search"
        :size="size"
        :skeleton="_skeleton"
        :disabled="disabled"
        :placeholder="placeholder"
        :validator="validator"
        :icon-left="faSearch"
        nullable
        v-bind="$attrs"
    />
  </AntField>
</template>
