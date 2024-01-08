<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { faX } from '@fortawesome/free-solid-svg-icons';

defineEmits(['update:open']);

defineProps<{ open: boolean }>();
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        fixed
        inset-0
        bg-gray-500 bg-opacity-20
        ease-in-out
        duration-500
        transform
        transition-opacity
      "
      :class="{
        'opacity-0 translate-x-full': !open,
        'opacity-100 translate-x-0': open,
      }"
      @click="$emit('update:open', false)"
    />

    <div
      class="
        fixed
        inset-0
        overflow-hidden
        transform
        transition
        ease-in-out
        duration-500
        sm:duration-700
      "
      :class="{ 'translate-x-full': !open, 'translate-x-0': open }"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="
            pointer-events-none
            fixed
            inset-y-0
            right-0
            flex
            max-w-full
            pl-10
          "
        >
          <div class="pointer-events-auto w-screen max-w-sm">
            <div
              class="
                flex
                h-full
                flex-col
                overflow-y-scroll
                bg-white
                py-6
                shadow-xl
              "
            >
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <div>
                    <slot name="title" />
                  </div>

                  <div>
                    <slot name="closeIcon">
                      <span class="sr-only">Close panel</span>

                      <fa-icon
                        :icon="faX"
                        class="
                          opacity-50
                          hover:opacity-100
                          transition-all
                          duration-500
                          w-5
                          h-full
                          pr-3
                          top-0
                          font-thin
                        "
                        @click="$emit('update:open', false)"
                      />
                    </slot>
                  </div>
                </div>
              </div>

              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <slot>
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <div
                      class="h-full border-2 border-dashed border-gray-200"
                      aria-hidden="true"
                    />
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
