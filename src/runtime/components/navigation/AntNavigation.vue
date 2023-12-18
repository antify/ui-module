<script lang="ts" setup>
import { type RouteLocationRaw } from 'vue-router';
import AntNavItem from './AntNavItem.vue';
import AntNavProfile from './AntNavProfile.vue';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from '../../types/NavItem.type';

defineProps<{
  navItems?: NavItem[];
  profileHref: RouteLocationRaw;
  userName?: string;
  // only relevant on mobile
  isOpen?: boolean;
}>();
</script>

<template>
  <div
    class="
      relative
      flex-1 flex flex-col
      max-w-xs
      w-full
      bg-white
      border-r border-gray-200
      h-screen
    "
  >
    <div
      class="
        md:hidden
        absolute
        top-0
        right-0
        -mr-12
        pt-2
        transition-all
        ease-in-out
        duration-500
      "
      :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }"
    >
      <slot name="mobileCloseButton">
        <button
          type="button"
          class="
            ml-1
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            focus:outline-none
            focus:ring-2 focus:ring-inset focus:ring-white
          "
          @click="() => $emit('close')"
        >
          <!-- TODO: Translate -->
          <span class="sr-only">Close sidebar</span>

          <fa-icon :icon="faX" class="h-5 w-5 text-gray-400" />
        </button>
      </slot>
    </div>

    <div class="flex-shrink-0 flex items-center px-4 h-14 border-b w-full">
      <slot name="logo" />
    </div>

    <slot name="header" />

    <div class="flex-1 h-0 pb-4 overflow-y-auto">
      <nav class="mt-5 px-2 space-y-1">
        <AntNavItem
          v-for="(navItem, index) in navItems"
          :key="`${index}-${navItem.label}`"
          :navItem="navItem"
        />
      </nav>
    </div>

    <slot name="footer" />

    <AntNavProfile :to="profileHref" :user-name="userName">
      <template v-for="(_, slot) of $slots" v-slot:[slot.toString()]="scope">
        <slot :name="slot.toString()" v-bind="scope"></slot>
      </template>
    </AntNavProfile>

    <div class="flex-shrink-0 w-14">
      <!-- Force sidebar to shrink to fit close icon -->
    </div>
  </div>
</template>
