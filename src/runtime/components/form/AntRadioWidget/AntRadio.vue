<script lang="ts" setup>
import {AntField} from '../Elements';
import {InputColorType, Size} from '../../../enums';
import AntSkeleton from '../../AntSkeleton.vue';
import {computed, onMounted} from 'vue';
import {AntRadioSize, type AntRadioType} from './__types/AntRadio.type';
import {handleEnumValidation} from '../../../handler';

defineOptions({ inheritAttrs: false });

const emits = defineEmits([ 'update:modelValue', 'update:skeleton' ]);
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    value: AntRadioType;

    description?: string;
    skeleton?: boolean;
    colorType?: InputColorType;
    size?: AntRadioSize
    readonly?: boolean;
    disabled?: boolean;
  }>(), {
    colorType: InputColorType.base,
    size: AntRadioSize.md,
    readonly: false,
    disabled: false,
  }
);

const _value = computed({
  get(): string | null | AntRadioType {
    return props.modelValue;
  },
  set(val: string | null | AntRadioType) {
    emits('update:modelValue',  val ? typeof val === 'string' ? val : val.value : null);
  }
});
const hasAction = computed(() => (!props.skeleton && !props.readonly && !props.disabled))
const isActive = computed(() => {
  return _value.value === props.value.value
});

const inputClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0': true,
    'focus:ring-offset-0 outline outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1 rounded-full': true,
    'cursor-pointer': hasAction.value,
    'outline-neutral-300 focus:outline-neutral-300': !isActive.value,
    'rounded-full transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed': true,
    'focus:ring-2': props.size === AntRadioSize.sm && hasAction.value,
    'focus:ring-4': props.size === AntRadioSize.md && hasAction.value,
    'h-4 w-4 small': props.size === AntRadioSize.sm,
    'h-5 w-5': props.size === AntRadioSize.md,
  };

  const focusColorVariant = {
    [InputColorType.base]: 'focus:ring-primary-100',
    [InputColorType.danger]: 'focus:ring-danger-100',
    [InputColorType.info]: 'focus:ring-info-100',
    [InputColorType.success]: 'focus:ring-success-100',
    [InputColorType.warning]: 'focus:ring-warning-100',
  };

  const activeColorVariant = {
    [InputColorType.base]: 'text-primary-500 outline-primary-500 focus:outline-primary-500',
    [InputColorType.danger]: 'text-danger-500 outline-danger-500 focus:outline-danger-500',
    [InputColorType.info]: 'text-info-500 outline-info-500 focus:outline-info-500',
    [InputColorType.success]: 'text-success-500 outline-success-500 focus:outline-success-500',
    [InputColorType.warning]: 'text-warning-500 outline-warning-500 focus:outline-warning-500',
  }

  classes[focusColorVariant[props.colorType]] = hasAction.value;
  classes[activeColorVariant[props.colorType]] = isActive.value;

  return classes;
});

const valueClass = computed(() => {
  const classes = {
    'relative w-fit full-height': true,
		'cursor-pointer': hasAction.value,
		'cursor-not-allowed opacity-50': props.disabled,
		'text-sm': props.size === AntRadioSize.md,
		'text-xs': props.size === AntRadioSize.sm
  }

  return classes;
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});
</script>

<template>
  <AntField
    :description="description"
    :color-type="colorType"
    class="cursor-pointer"
    :skeleton="skeleton"
    :size="size as unknown as Size"
    :expanded="false"
  >
    <div class="flex items-center gap-1.5">
      <div class="relative full-height flex items-center">
        <input
          v-model="_value"
          :value="value.value"
          :class="inputClasses"
          type="radio"
          :aria-checked="isActive"
          :disabled="disabled"
        />

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded-full
        />
      </div>

      <div
        class="relative flex items-center"
        :class="props.size === AntRadioSize.md ? 'h-5' : 'h-4'"
      >
        <span :class="valueClass">
          {{ value.label }}
        </span>

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
        />
      </div>
    </div>
  </AntField>
</template>

<style scoped>
input[type="radio"] {
  appearance: none;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 100%;
  transform: scale(0);
  transition: 120ms transform;
  background: currentColor;
}

input[type="radio"].small::before {
  width: 8px;
  height: 8px;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
