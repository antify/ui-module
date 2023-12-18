<script lang="ts" setup>
import { type RouteLocationRaw } from 'vue-router';
import { ref } from 'vue';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AntNavigation from '../navigation/AntNavigation.vue';
import { NavItem } from '../../types/NavItem.type';
import AntButton from '../form/AntButton.vue';

defineProps<{
  navItems?: NavItem[];
  profileHref: RouteLocationRaw;
  userName?: string;
}>();

const sidebarDisplayed = ref<boolean>(false);
</script>

<template>
  <div>
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->

    <div
      class="
        block
        md:hidden
        fixed
        inset-0
        w-screen
        h-screen
        bg-gray-500 bg-opacity-20
        transition-all
        duration-500
      "
      :class="{
        'opacity-100': sidebarDisplayed,
        'opacity-0 max-h-0': !sidebarDisplayed,
      }"
      @click="() => (sidebarDisplayed = false)"
    />

    <div
      class="
        flex
        md:hidden
        w-3/5
        fixed
        inset-0
        z-40
        transition-all
        duration-500
        ease-in-out
        transform
      "
      :class="{
        'overflow-hidden m-0 -translate-x-full': !sidebarDisplayed,
        'translate-x-0': sidebarDisplayed,
      }"
    >
      <AntNavigation
        :nav-items="navItems"
        :profile-href="profileHref"
        :user-name="userName"
        :is-open="sidebarDisplayed"
        @close="() => (sidebarDisplayed = false)"
      >
        <template v-for="(_, slot) of $slots" v-slot:[slot.toString()]="scope">
          <slot :name="slot.toString()" v-bind="scope"></slot>
        </template>
      </AntNavigation>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <AntNavigation
        :nav-items="navItems"
        :profile-href="profileHref"
        :user-name="userName"
        :is-open="false"
      >
        <template v-for="(_, slot) of $slots" v-slot:[slot.toString()]="scope">
          <slot :name="slot.toString()" v-bind="scope"></slot>
        </template>
      </AntNavigation>
    </div>

    <!-- Content -->
    <div class="md:pl-64 flex-1">
      <div class="absolute top-0 z-10 md:hidden pl-1 py-1.5">
        <!-- Open nav on mobile-->
        <slot name="mobileSidebarButton" v-bind="{ isOpen: sidebarDisplayed }">
          <AntButton
            type="button"
            class="ml-0.5 -mt-0.5 h-12 w-12 border-none"
            @click="() => (sidebarDisplayed = true)"
          >
            <span class="sr-only">Open sidebar</span>

            <fa-icon :icon="faBars" class="h-6 w-6" />
          </AntButton>
        </slot>
      </div>

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
