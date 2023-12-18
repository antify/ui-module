<script lang="ts" setup>
import AntSkeleton from './AntSkeleton.vue';
import { useVModel } from '@vueuse/core';

const emits = defineEmits(['update:skeleton'])
const props = withDefaults(
    defineProps<{
      skeleton?: boolean
    }>(), {
      skeleton: false
    }
)

const _skeleton = useVModel(props, 'skeleton', emits);
</script>

<template>
  <div class="relative">
    <AntSkeleton v-model="_skeleton" absolute rounded/>

    <div
        class="flex flex-col rounded-md bg-neutral-light gap-px relative border border-neutral-light overflow-hidden"
        :class="{'invisible': _skeleton}"
    >
      <slot/>
    </div>
  </div>
</template>
