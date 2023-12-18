<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { generateId } from '../../utils/helper';
import AntSkeleton from '../AntSkeleton.vue';

const emit = defineEmits(['update:value']);

const props =
  defineProps<{
    id?: string;
    label?: string;
    value: Date;
    description?: string;
    validator?: Function;
    errors?: string[];
    isError?: boolean;
    loading?: boolean;
  }>();

const _id = ref(props.id ? props.id : generateId(40));

const _value = computed({
  get: () => {
    return props.value;
  },
  set: (val: Date) => {
    emit('update:value', val);
  },
});

function validate() {
  if (props.validator) {
    props.validator(_value.value);
  }
}
</script>

<template>
  <div v-if="!loading">
    <label :for="_id" class="block text-sm font-medium text-gray-700">
      <slot>{{ label }}</slot>
    </label>

    <Datepicker
      :id="_id"
      v-model="_value"
      v-bind="$attrs"
      @blur="validate"
      :class="{
        'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500':
          (errors && errors.length > 0) || isError,
        'border-gray-300 placeholder-gray-400 focus:border-primary focus:ring-primary':
          (!errors || errors.length === 0) && !isError,
      }"
    >
      <template v-for="(_, slot) of $slots" v-slot:[slot.toString()]="scope">
        <slot :name="slot.toString()" v-bind="scope"></slot>
      </template>
    </Datepicker>

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
        <slot name="description">
          {{ description }}
        </slot>
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
      v-if="description || $slots['description']"
      :model-value="loading"
      class="w-4/6 h-4 rounded-md mt-1"
    />
  </div>
</template>
