<script setup lang="ts">
import AntTabItem from './AntTabItem.vue';
import {type TabItem} from './__types/AntTabs.types';
import {useVModel} from '@vueuse/core';
import {computed} from 'vue';

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<{
  modelValue: string | undefined;
  tabItems?: TabItem[];
  expanded?: boolean;
}>(), {
  expanded: false,
});

const currentActive = useVModel(props, 'modelValue', emits);

const containerClasses = computed(() => {
  return {
    'flex bg-neutral-light gap-px transition-all h-full': true,
    'w-fit': !props.expanded,
    'w-full': props.expanded,
  };
});

function clickTab(tabItem: TabItem) {
  if (tabItem.clickHandler) {
    tabItem.clickHandler();
  }

  currentActive.value = tabItem.id;
}
</script>

<template>
  <div :class="containerClasses">
    <slot>
      <AntTabItem
        v-for="(tabItem, index) in tabItems"
        :key="`tab-item-${index}`"
        v-bind="tabItem"
        @click="clickTab(tabItem)"
        :active="currentActive === tabItem.id"
        :expanded="expanded"
      >
        <slot name="content" v-bind="{item: tabItem, isActive: currentActive === tabItem.id}"></slot>
      </AntTabItem>
    </slot>
  </div>
</template>

<style scoped>

</style>
