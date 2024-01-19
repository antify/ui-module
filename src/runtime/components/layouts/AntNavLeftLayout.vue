<script setup lang="ts">
import {computed, useSlots} from 'vue';
import AntNavbar from '../navbar/AntNavbar.vue';
import type {RouteLocationRaw} from 'vue-router';
import type {NavbarItem} from '../navbar/__types/NavbarItem';

defineProps<{
  navbarItems: NavbarItem[];
  logoRoute?: RouteLocationRaw;
}>()

const hasLogoImageSlot = computed(() => useSlots()['logo-image'] || false);
</script>

<template>
  <div class="flex gap-px bg-neutral-light h-screen overflow-hidden">
    <div class="flex flex-col gap-px bg-neutral-light w-52">
      <component
        v-if="hasLogoImageSlot"
        :is="logoRoute ? 'RouterLink' : 'div'"
        :to="logoRoute"
        class="bg-neutral-lightest min-h-[60px] flex justify-center items-center p-2.5"
      >
        <slot name="logo-image"/>
      </component>

      <AntNavbar
        :navbar-items="navbarItems"
      />
    </div>

    <div class="flex-grow">
      <slot/>
    </div>
  </div>
</template>
