<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import AntField from './Elements/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import AntIcon from '../AntIcon.vue';
import {Size} from '../../enums/Size.enum';
import {useVModel} from '@vueuse/core';
import {InputColorType} from '../../enums';
import {BaseInputType} from './Elements/__types';
import {handleEnumValidation} from '../../handler';
import {AntDateInputType} from './__types/AntDateInput.type';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

defineOptions({inheritAttrs: false});

const props = withDefaults(defineProps<{
  modelValue: number | null;
  label?: string;
  type: AntDateInputType
  placeholder?: string;
  description?: string;
  size?: Size;
  colorType?: InputColorType;
  disabled?: boolean;
  skeleton?: boolean;
  errors?: string[];
}>(), {
  colorType: InputColorType.base,
  type: AntDateInputType.date,
  disabled: false,
  skeleton: false,
  size: Size.md,
  errors: () => []
});
const emit = defineEmits(['update:modelValue', 'validate']);
const _modelValue = useVModel(props, 'modelValue', emit);
const _colorType = computed(() => hasErrors.value ? InputColorType.danger : props.colorType);
const hasErrors = computed(() => props.errors.length > 0);
const inputRef = ref<null | HTMLInputElement>(null);

onMounted(() => {
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
  handleEnumValidation(props.size, Size, 'size');
});

function onClickCalendar() {
  inputRef.value?.showPicker();
}
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :color-type="colorType"
    :errors="errors"
  >
    <div
      class="flex relative"
    >
      <AntBaseInput
        v-model:value="_modelValue"
        v-model:input-ref="inputRef"
        :type="type as unknown as BaseInputType"
        :color-type="_colorType"
        :size="size"
        :skeleton="skeleton"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :show-icon="false"
        :has-errors="hasErrors"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      >
        <template #icon-right>
          <AntIcon
            :icon="faCalendar"
            class="cursor-pointer"
            @click="onClickCalendar"
          />
        </template>
      </AntBaseInput>
    </div>
  </AntField>
</template>
