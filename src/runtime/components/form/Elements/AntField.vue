<script lang="ts" setup>
import {onMounted, computed} from 'vue';
import {Size} from '../../../enums/Size.enum'
import AntInputLabel from './AntInputLabel.vue';
import AntInputDescription from './AntInputDescription.vue';
import {handleEnumValidation} from '../../../handler';
import AntInputLimiter from './AntInputLimiter.vue';
import {InputColorType} from '../../../enums';

defineEmits(['clickLabel', 'validate']);
const props = withDefaults(defineProps<{
  label?: string;
  description?: string;
  size?: Size;
  colorType?: InputColorType;
  skeleton?: boolean;
  limiterValue?: number;
  limiterMaxValue?: number;
  labelFor?: string;
  showMessageOnError?: boolean;
  errors?: string[];
  expanded?: boolean;
}>(), {
  colorType: InputColorType.base,
  skeleton: false,
  size: Size.md,
  showMessageOnError: true,
  errors: () => [],
  expanded: true
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});

const _errors = computed(() => props.skeleton ? [] : props.errors);
const _colorType = computed(() => _errors.value.length > 0 ? InputColorType.danger : props.colorType)
</script>

<template>
  <div
      class="flex flex-col items-start gap-1.5"
      :class="{'w-full': expanded}"
  >
    <AntInputLabel
        :label="label"
        :size="size"
        :skeleton="skeleton"
        :for="labelFor"
        @clickContent="$emit('clickLabel')"
    >
      <div class="w-full">
        <slot/>
      </div>
    </AntInputLabel>

    <div
        v-if="showMessageOnError && (description || _errors.length > 0)"
        class="flex justify-between w-full"
    >
      <AntInputDescription
          :size="size"
          :skeleton="skeleton"
          :color-type="_colorType"
      >
        <slot name="description">
          <template v-if="_errors.length === 1">
            {{ errors[0] }}
          </template>

          <template v-else-if="_errors.length > 1">
            <ul class="list-disc list-outside pl-4">
              <li
                v-for="(error, index) of _errors"
                :key="`field-error-${index}`"
                class="marker:m-none marker:p-none"
              >
                {{ error }}
              </li>
            </ul>
          </template>

          <template v-else>
            {{ description }}
          </template>
        </slot>
      </AntInputDescription>

      <AntInputLimiter
          v-if="limiterMaxValue !== undefined && limiterValue !== undefined"
          :value="limiterValue"
          :max-value="limiterMaxValue"
          :color-type="_colorType"
          :size="size"
          :skeleton="skeleton"
      >
        {{ limiterValue }}/{{ limiterMaxValue }}
      </AntInputLimiter>
    </div>
  </div>
</template>
