<script lang="ts" setup></script>

<template>
  <form class="px-4 py-4 space-y-4">
    <div
      v-if="$slots['header']"
      class="w-full h-14 border-b flex justify-between items-center"
    >
      <slot name="header" />
    </div>

    <slot default />
    <div
      v-if="$slots['footer']"
      class="space-x-4 border-t flex justify-end py-4"
    >
      <slot name="footer" />
    </div>
  </form>
</template>
