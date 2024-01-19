<script setup lang="ts">
withDefaults(defineProps<{
  showDetail?: boolean,
}>(), {
  showDetail: false,
});
</script>

<template>
  <div class="flex w-full h-full">
    <div
      class="left-content h-full flex flex-col bg-neutral-light gap-px overflow-hidden"
      :class="{'w-96': showDetail, 'w-full': !showDetail}"
    >
      <div class="bg-neutral-lightest">
        <slot name="search-section"/>
      </div>

      <div class="bg-neutral-lightest flex-grow h-full">
        <slot name="table-section"/>
      </div>

      <div class="bg-neutral-lightest">
        <slot name="table-nav-section"/>
      </div>
    </div>

    <transition name="right-content">
      <div
        v-if="showDetail"
        class="flex flex-col gap-px border-l border-neutral-light overflow-hidden"
        :class="{'w-full': showDetail}"
      >
        <slot/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.left-content {
  transition: width .5s ease-in-out, opacity .5s ease;
}
.right-content-enter-active {
  transition: width .5s ease-in-out, opacity .5s ease .3s;
}
.right-content-enter-from {
  width: 0;
  opacity: 0;
}
.right-content-enter-to {
  width: 100%;
  opacity: 1;
}
.right-content-leave-active {
  transition: width .5s ease-in-out, opacity .2s ease;
}
.right-content-leave-from {
  width: 100%;
  opacity: 1;
}
.right-content-leave-to {
  width: 0;
  opacity: 0;
}
</style>
