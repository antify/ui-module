<script lang="ts">
import { antfocus } from '../../utils/helper';

export default {
  name: 'AntInput',
  inheritAttrs: false,
  directives: {
    antfocus,
  },
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { generateId } from '../../utils/helper';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../AntSkeleton.vue';

const emit = defineEmits(['update:value']);

const props =
  defineProps<{
    id?: string;
    value: string;
    label?: string;
    type?: string;
    description?: string;
    placeholder?: string;
    leadingIcon?: Object;
    overlappingLabel?: boolean;
    validator?: Function;
    errors?: string[];
    isError?: boolean;
    loading?: boolean;
    focus?: boolean;
  }>();

const _id = ref(props.id ? props.id : generateId(40));
const _overlappingLabel = ref(
  props.overlappingLabel ? props.overlappingLabel : false
);

const content = computed<string>({
  get: () => {
    return props.value as string;
  },
  set: (val: string) => {
    emit('update:value', val);
  },
});

const validate = () => {
  if (props.validator) {
    props.validator(content.value);
  }
};
</script>

<template>
  <div v-if="!loading" class="w-full">
    <div class="relative">
      <label
        v-if="label || $slots['label']"
        :for="_id"
        :class="{
          'absolute -top-2 left-2 -mt-px bg-white z-50': _overlappingLabel,
        }"
        class="block text-sm font-medium text-gray-700"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </label>

      <div class="flex">
        <div class="relative w-full">
          <slot name="leadingIcon">
            <div
              v-if="leadingIcon"
              class="
                absolute
                inset-y-0
                left-0
                pl-3
                flex
                items-center
                pointer-events-none
                z-10
              "
            >
              <fa-icon :icon="leadingIcon" class="h-5 w-5 text-gray-400" />
            </div>
          </slot>

          <input
            v-model="content"
            v-bind="$attrs"
            :id="_id"
            :type="type"
            :placeholder="placeholder || label"
            :aria-describedby="`${_id}-description`"
            :aria-invalid="(errors && errors.length > 0) || isError"
            :class="{
              'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500':
                (errors && errors.length > 0) || isError,
              'border-gray-300 placeholder-gray-400 focus:border-primary focus:ring-primary':
                (!errors || errors.length === 0) && !isError,
              'pl-10': leadingIcon,
            }"
            class="
              appearance-none
              block
              w-full
              px-3
              py-2
              border
              rounded-md
              shadow-sm
              transition-all
              duration-300
              focus:outline-none
              focus:ring-primary
              sm:text-sm
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
            v-antfocus="focus"
            @blur="validate"
          />

          <slot name="errorIcon">
            <div
              v-if="(errors && errors.length > 0) || isError"
              class="
                absolute
                inset-y-0
                right-0
                pr-3
                flex
                items-center
                pointer-events-none
                z-10
              "
              :title="errors && errors[0]"
            >
              <fa-icon
                :icon="faCircleExclamation"
                class="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          </slot>
        </div>

        <slot></slot>
      </div>
    </div>

    <div
      v-if="description || (errors && errors.length > 0)"
      class="mt-1 text-sm text-gray-500"
      :id="`${_id}-description`"
    >
      <template v-if="errors && errors.length > 0">
        <slot name="errorList" v-bind="{ errors }">
          <div v-for="error in errors" class="text-red-600">{{ error }}</div>
        </slot>
      </template>

      <template v-else>
        {{ description }}
      </template>
    </div>
  </div>

  <div v-else>
    <AntSkeleton
      :model-value="loading"
      v-if="label || $slots['label']"
      class="w-2/6 h-4 rounded-md mb-1"
    />

    <AntSkeleton
      :model-value="loading"
      class="w-full h-8 rounded-md"
    />

    <AntSkeleton
      :model-value="loading"
      v-if="description || $slots['description']"
      class="w-4/6 h-4 rounded-md mt-1"
    />
  </div>
</template>
