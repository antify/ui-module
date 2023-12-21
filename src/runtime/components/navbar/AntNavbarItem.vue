<script setup lang="ts">

import type { NavbarItem } from './__types/NavbarItem';
import { computed, ref } from 'vue';
import AntIcon from '../AntIcon.vue';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AntTransitionCollapseHeight from '../transitions/AntTransitionCollapseHeight.vue';
import { IconColorType } from '../__types';

const props = defineProps<{
  navbarItem: NavbarItem
}>()

const itemClasses = computed(() => ({
  'w-full text-sm p-1.5 rounded-md cursor-pointer flex items-center flex-nowrap gap-1': true,
  'hover:bg-neutral-lighter': true,
  'text-primary': props.navbarItem.active
}))

const open = ref(false)

function itemClick(): void {
  if (props.navbarItem.click) {
    props.navbarItem.click();
  }

  if (props.navbarItem.children && props.navbarItem.children.length > 0) {
    open.value = !open.value;
  }
}

</script>

<template>
  <component
    :is="navbarItem.to ? 'router-link' : 'div'"
    :to="navbarItem.to"
    v-bind="$attrs"
    :class="itemClasses"
    @click="itemClick"
  >
    <AntIcon v-if="navbarItem.icon" :icon="navbarItem.icon" :color-type="navbarItem.active ? IconColorType.primary : IconColorType.base"/>

    <div class="flex-grow select-none">
      {{ navbarItem.label }}
    </div>

    <div
      v-if="navbarItem.children && navbarItem.children.length > 0"
    >
      <AntIcon
        v-if="!open"
        :icon="faChevronDown"
        :color-type="navbarItem.active ? IconColorType.primary : IconColorType.base"
      />

      <AntIcon
        v-if="open"
        :icon="faChevronUp"
        :color-type="navbarItem.active ? IconColorType.primary : IconColorType.base"
      />
    </div>
  </component>

  <AntTransitionCollapseHeight
    v-if="navbarItem.children && navbarItem.children.length > 0"
  >
    <div v-show="open">
      <AntNavbarItem
        v-for="(child, index) in navbarItem.children"
        :key="`navbar-item-child-${index}`"
        :navbar-item="child"
        class="pl-[30px]"
      ></AntNavbarItem>
    </div>
  </AntTransitionCollapseHeight>
</template>
