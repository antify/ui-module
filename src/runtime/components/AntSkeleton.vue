<script lang="ts" setup>
import {Grouped} from '../enums/Grouped.enum';
import {computed, ref, watch} from 'vue';
import {useVModel} from '@vueuse/core';

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<{
  modelValue: boolean;
  grouped?: Grouped;
  rounded?: boolean;
  roundedFull?: boolean;
  absolute?: boolean;
  minShowTime?: number;
}>(), {
  grouped: Grouped.none,
  rounded: false,
  roundedFull: false,
  absolute: false,
  minShowTime: 1000
});

const value = useVModel(props, 'modelValue', emits);

const show = ref(false);
const blockUnShow = ref(false);

const groupedClassList = computed(() => ({
  'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
  'rounded-none': props.grouped === Grouped.center,
  'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
}));
const classList = computed(() => ({
  'animate-skeleton min-h-[1px] min-w-[1px] inline-block': true,
  'absolute inset-0 w-full h-full z-40': props.absolute,
  'rounded-md': props.rounded && props.grouped === Grouped.none,
  'rounded-xl': props.roundedFull && props.grouped === Grouped.none,
  ...groupedClassList.value
}));

watch(value, (val) => {
  if (val) {
    if (value.value) {
      show.value = true;
      blockUnShow.value = true;

      setTimeout(() => {
        blockUnShow.value = false;

        if (!value.value) {
          show.value = false;
        }
      }, props.minShowTime);
    }
  } else if (!blockUnShow.value) {
    show.value = false;
  }
}, {immediate: true});
</script>

<template>
  <div v-if="show" :class="classList"/>
</template>
