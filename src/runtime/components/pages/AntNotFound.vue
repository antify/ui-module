<script lang="ts" setup>
import AntHeader from '../layout/AntHeader.vue';

defineProps<{
  imageSrc?: string;
}>();
</script>

<template>
  <div class="bg-white min-h-full flex flex-col lg:relative">
    <div class="flex-grow flex flex-col">
      <main class="flex-grow flex flex-col bg-white">
        <div
          class="
            flex-grow
            mx-auto
            max-w-7xl
            w-full
            flex flex-col
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div class="flex-shrink-0 pt-10 sm:pt-16">
            <slot name="logo"></slot>
          </div>
          <div class="flex-shrink-0 my-auto py-16 sm:py-32">
            <p
              class="text-sm font-semibold text-primary uppercase tracking-wide"
            >
              <slot name="error">404 error</slot>
            </p>

            <AntHeader
              class="
                mt-2
                text-4xl
                font-extrabold
                text-gray-900
                tracking-tight
                sm:text-5xl
              "
            >
              <slot name="header">Page not found</slot>
            </AntHeader>

            <slot>
              <p class="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
            </slot>
          </div>
        </div>
      </main>

      <footer class="flex-shrink-0 bg-gray-50">
        <div class="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
          <nav class="flex space-x-4">
            <slot name="footerNav" />
          </nav>
        </div>
      </footer>
    </div>

    <div
      v-if="imageSrc"
      class="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
    >
      <img
        class="absolute inset-0 h-full w-full object-cover"
        :src="imageSrc"
        alt=""
      />
    </div>
  </div>
</template>
