<script lang="ts" setup>
import { type RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  userName?: string;
}>();
</script>

<template>
  <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
    <router-link :to="to" class="flex-shrink-0 group block cursor-pointer">
      <div class="flex items-center">
        <div>
          <slot name="profilePicture" />
        </div>

        <div class="ml-3">
          <slot name="profileContent">
            <p
              class="
                text-base
                font-medium
                text-gray-700
                group-hover:text-gray-900
              "
            >
              {{ userName }}
            </p>
          </slot>
        </div>
      </div>
    </router-link>
  </div>
</template>
