<script setup lang="ts">
import AntField from './Elements/AntField.vue';
import AntButton from '../buttons/AntButton.vue';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../AntSkeleton.vue';
import { FieldValidator } from '@antify/validate';
import { type SwitcherOption } from './__types/AntSwitcher.type';
import { ColorType, InputColorType } from '../../enums';
import { Grouped, Size } from '../../enums';
import { computed, onMounted, watch } from 'vue';

const emits = defineEmits([ 'update:modelValue' ]);
const props = withDefaults(defineProps<{
  modelValue: string;
  options: string[] | SwitcherOption[];
  label?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  colorType?: InputColorType;
  validator?: FieldValidator;
  size?: Size,
}>(), {
  colorType: InputColorType.base,
  size: Size.md
});

const _value = computed({
  get() {
    const found = props.options.find((option: string | SwitcherOption) => typeof option === 'string' ? option === props.modelValue : option.value === props.modelValue);

    if (!found) {
      return props.options[0];
    }

    return found;
  },
  set(val: string | SwitcherOption) {
    emits('update:modelValue', typeof val === 'string' ? val : val.value);
  }
});

const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled))
const _colorType = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType);

watch(_value, () => props.validator?.validate(_value.value));

onMounted(() => {
  props.validator?.validate(_value.value);
});

const containerClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'flex relative ring-primary/25 rounded-md outline-none': true,
    'focus-within:ring-2': (props.size as Size) === Size.sm && hasAction.value,
    'focus-within:ring-4': (props.size as Size) === Size.md && hasAction.value,
  };
  const colorVariant = {
    [InputColorType.base]: 'focus-within:ring-primary-100',
    [InputColorType.danger]: 'focus-within:ring-danger-100',
    [InputColorType.info]: 'focus-within:ring-info-100',
    [InputColorType.success]: 'focus-within:ring-success-100',
    [InputColorType.warning]: 'focus-within:ring-warning-100',
  };

  classes[colorVariant[_colorType.value]] = true;

  return classes;
});

const itemClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'grow text-center': true,
    'p-2.5 text-sm ': (props.size as Size) === Size.md,
    'p-1.5 text-xs ': (props.size as Size) === Size.sm,
    'invisible': props.skeleton,
    'opacity-50 cursor-not-allowed': props.disabled,
  };

  const colorVariant = {
    [InputColorType.base]: 'border-neutral-300 bg-white text-for-white-bg-font',
    [InputColorType.danger]: 'border-danger-500 bg-danger-100 text-danger-100-font',
    [InputColorType.info]: 'border-info-500 bg-info-100 text-info-100-font',
    [InputColorType.success]: 'border-success-500 bg-success-100 text-success-100-font',
    [InputColorType.warning]: 'border-warning-500 bg-warning-100 text-warning-100-font',
  };

  classes[colorVariant[_colorType.value]] = true;

  return classes;
});

function prevOption() {
  if (props.readonly || props.disabled) {
    return;
  }

  const index = props.options.findIndex((option) => option === _value.value);

  if (index !== -1 && props.options[index - 1]) {
    _value.value = props.options[index - 1];
  } else {
    _value.value = props.options[props.options.length - 1];
  }
}

function nextOption() {
  if (props.readonly || props.disabled) {
    return;
  }

  const index = props.options.findIndex((option) => option === _value.value);

  if (index !== -1 && props.options[index + 1]) {
    _value.value = props.options[index + 1];
  } else {
    _value.value = props.options[0];
  }
}
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :color-type="colorType"
    :validator="validator"
    label-for="noop"
  >
    <div
      :class="containerClasses"
      tabindex="0"
      @keydown.left.prevent="prevOption()"
      @keydown.right.prevent="nextOption()"
    >
      <AntButton
        :icon-left="faChevronLeft"
        :grouped="Grouped.left"
        no-focus
        :color-type="_colorType as unknown as ColorType"
        :size="size"
        :skeleton="skeleton"
        :readonly="readonly"
        :disabled="disabled"
        @click="prevOption"
      />

      <div class="grow relative">
        <div
          :class="itemClasses"
          class="switcher-content"
        >
          {{ typeof _value === 'string' ? _value : _value.label }}
        </div>

        <AntSkeleton
          v-if="skeleton"
          absolute
          :grouped="Grouped.center"
          rounded
        />
      </div>

      <AntButton
        :icon-left="faChevronRight"
        :grouped="Grouped.right"
        no-focus
        :color-type="_colorType as unknown as ColorType"
        :size="size"
        :skeleton="skeleton"
        :readonly="readonly"
        :disabled="disabled"
        @click="nextOption"
      />
    </div>
  </AntField>
</template>

<style scoped>
.switcher-content {
  position: relative;
}

.switcher-content:before {
  content: '';

  position: absolute;

  inset: 0;

  border-top: 1px;
  border-bottom: 1px;
  border-style: solid;

  border-color: inherit;
}
</style>
