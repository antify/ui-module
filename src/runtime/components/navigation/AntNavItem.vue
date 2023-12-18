<script lang="ts" setup>
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import type { NavItem } from '../../types/NavItem.type';

defineProps<{
  navItem: NavItem;
}>();

const showSubNavigation = ref<boolean>(false);

const openSubItemMenu = () => {
  showSubNavigation.value = !showSubNavigation.value;
};
</script>

<template>
  <component
    :is="navItem.route ? 'router-link' : 'div'"
    :to="navItem.route"
    @click="navItem.clickHandler"
    class="group grid px-2 py-2 text-base font-medium rounded-md"
    :class="{
      'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !navItem.active,
      'bg-gray-100 text-gray-900': navItem.active,
      'grid-cols-2': navItem.subItems,
      'cursor-pointer': navItem.clickHandler,
    }"
  >
    <div class="flex">
      <fa-icon
        v-if="navItem.icon"
        :icon="navItem.icon"
        class="text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
      />
      <!-- Spacer if no icon is supplyed-->
      <div v-else class="mr-3 w-6" />

      <p>{{ navItem.label }}</p>
    </div>

    <div
      v-if="navItem.subItems"
      class="justify-self-end cursor-pointer"
      @click="openSubItemMenu()"
    >
      <fa-icon :icon="faAngleDown" />
    </div>

    <div
      class="col-span-2 -mx-2 transition-all duration-500 ease-in-out"
      :class="{
        'max-h-0 overflow-hidden m-0 -translate-y-96 opacity-0':
          !showSubNavigation,
        'max-h-60 mt-2 translate-y-96 opacity-100': showSubNavigation,
      }"
    >
      <AntNavItem
        class="px-0"
        v-for="(subNavItem, index) in navItem.subItems"
        :key="`${index}-${navItem.label}-${subNavItem.label}`"
        :navItem="subNavItem"
      />
    </div>
  </component>
</template>
