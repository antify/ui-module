<script lang="ts" setup>
import AntAccordionItem from './AntAccordionItem.vue';
import {onMounted, ref} from 'vue';
import {CollapseStrategy} from './__types/Accordion.types';

const props = withDefaults(defineProps<{
  items: {
    label?: string;
    content?: string;
    isOpen?: boolean;
  }[];
  collapseStrategy?: CollapseStrategy;
}>(), {
  collapseStrategy: CollapseStrategy.single
});

const openItems = ref<number[]>([]);

onMounted(() => {
  openItems.value = props.items
    .map((item, index) => item.isOpen ? index : -1)
    .filter((index) => index !== -1);
})

function onOpen(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    openItems.value = [index];
  } else {
    openItems.value = [...openItems.value, index];
  }
}

function onClose(index: number) {
  if (props.collapseStrategy === CollapseStrategy.single) {
    openItems.value = [];
  } else {
    openItems.value = openItems.value.filter((item) => item !== index);
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col bg-neutral-light gap-px">
    <slot>
      <AntAccordionItem
        v-for="(item, index) in items"
        :label="item.label"
        :is-open="openItems.includes(index)"
        :key="`accordion-item-${index}`"
        @open="() => onOpen(index)"
        @close="() => onClose(index)"
      >
        <slot name="item-content" v-bind="{item, index}">
          <div v-html="item.content"/>
        </slot>
      </AntAccordionItem>
    </slot>
  </div>
</template>
