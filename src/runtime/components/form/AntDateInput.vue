<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import AntField from './Elements/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import AntIcon from '../AntIcon.vue';
import {Size} from '../../enums/Size.enum';
import {useVModel} from '@vueuse/core';
import {InputState} from '../../enums';
import {BaseInputType} from './Elements/__types';
import {handleEnumValidation} from '../../handler';
import {AntDateInputType} from './__types/AntDateInput.type';
import {faCalendar, faClock} from '@fortawesome/free-solid-svg-icons';
import {IconSize} from '../__types/AntIcon.types';

defineOptions({inheritAttrs: false});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  description?: string;
  size?: Size;
  type?: AntDateInputType;
  state?: InputState;
  disabled?: boolean;
  skeleton?: boolean;
  errors?: string[];
}>(), {
  state: InputState.base,
  type: AntDateInputType.date,
  disabled: false,
  skeleton: false,
  size: Size.md,
  errors: () => []
});
const emit = defineEmits(['update:modelValue', 'validate']);
const _modelValue = useVModel(props, 'modelValue', emit);
const _state = computed(() => hasErrors.value ? InputState.danger : props.state);
const hasErrors = computed(() => props.errors.length > 0);
const inputRef = ref<null | HTMLInputElement>(null);
const iconColor = computed(() => {
  switch (_state.value) {
    case InputState.info:
      return 'text-info-700';
    case InputState.success:
      return 'text-success-700';
    case InputState.warning:
      return 'text-warning-700';
    case InputState.danger:
      return 'text-danger-700';
    default:
      return 'text-for-white-bg';
  }
});
const iconSize = computed(() => props.size === Size.xs || props.size === Size.xs2 ? IconSize.xs : IconSize.sm);
const _icon = computed(() => props.type === AntDateInputType.time ? faClock : faCalendar);

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
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
    :state="state"
    :errors="errors"
  >
    <AntBaseInput
      v-model:value="_modelValue"
      v-model:input-ref="inputRef"
      :type="type as unknown as BaseInputType"
      :state="_state"
      :size="size"
      :skeleton="skeleton"
      :disabled="disabled"
      :show-icon="false"
      :has-errors="hasErrors"
      v-bind="$attrs"
      @validate="val => $emit('validate', val)"
    >
      <template #icon-right>
        <AntIcon
          :icon="_icon"
          :color="iconColor"
          :size="iconSize"
          class="cursor-pointer"
          @click="onClickCalendar"
        />
      </template>
    </AntBaseInput>
  </AntField>
</template>
