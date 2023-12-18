<script lang="ts" setup>
import {onMounted, computed} from 'vue';
import {Size} from '../../../enums/Size.enum'
import AntInputLabel from './AntInputLabel.vue';
import AntInputDescription from './AntInputDescription.vue';
import {Validator} from '@antify/validate';
import {handleEnumValidation} from '../../../handler';
import AntInputLimiter from './AntInputLimiter.vue';
import {useVModel} from '@vueuse/core';
import {InputColorType} from '../../../enums';

const emits = defineEmits(['update:skeleton', 'clickLabel']);
const props = withDefaults(defineProps<{
  label?: string;
  description?: string;
  size?: Size;
  colorType?: InputColorType;
  skeleton?: boolean;
  validator?: Validator;
  limiterValue?: number;
  limiterMaxValue?: number;
  labelFor?: string;
  showMessageOnError?: boolean;
  expanded?: boolean;
}>(), {
  colorType: InputColorType.base,
  skeleton: false,
  size: Size.md,
  showMessageOnError: true,
  expanded: true
});

const _skeleton = useVModel(props, 'skeleton', emits);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.colorType, InputColorType, 'colorType');
});

const _colorType = computed(() => props.validator?.hasErrors() ? InputColorType.danger : props.colorType)
const errors = computed(() => props.validator?.getErrors() || [])
</script>

<template>
  <div
      class="flex flex-col items-start gap-1.5"
      :class="{'w-full': expanded}"
  >
    <AntInputLabel
        :label="label"
        :size="size"
        :skeleton="_skeleton"
        :for="labelFor"
        @clickContent="$emit('clickLabel')"
    >
      <div class="w-full">
        <slot/>
      </div>
    </AntInputLabel>

    <div
        v-if="showMessageOnError && (description || errors.length > 0)"
        class="flex justify-between w-full"
    >
      <AntInputDescription
          :size="size"
          :skeleton="_skeleton"
          :color-type="_colorType"
      >
        <slot name="description">
          <template v-if="errors.length === 1">
            {{ errors[0] }}
          </template>

          <template v-else-if="errors.length > 1">
            <ul class="list-disc list-outside pl-4">
              <li
                v-for="(error, index) of errors"
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
          :skeleton="_skeleton"
      >
        {{ limiterValue }}/{{ limiterMaxValue }}
      </AntInputLimiter>
    </div>
  </div>
</template>
