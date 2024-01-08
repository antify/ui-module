<template>
  <div class="flex gap-px bg-neutral-light w-full h-full">
    <div class="h-full flex flex-col gap-px flex-grow">
      <div class="bg-neutral-lightest h-14 flex-shrink-0">
        <slot name="search-section"/>
      </div>

      <div class="bg-neutral-lightest flex-grow h-full">
        <slot name="table-section"/>
      </div>

      <div class="bg-neutral-lightest h-14 flex items-center justify-center flex-shrink-0">
        <slot name="table-nav-section"/>
      </div>
    </div>

    <div class="main flex flex-col gap-px w-0 overflow-hidden">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.main {
  transition: width .7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.main:has(> div > div > *) {
  @apply w-9/12;
}

.main:has(> div > div > *) > div > div {
  animation-name: fadeAnimation;
  animation-duration: .5s;
}

.main:has(> div > div > *) > div {
  animation-name: hiddenAnimation;
  animation-duration: .5s;
}

@keyframes fadeAnimation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hiddenAnimation {
  0% {
    overflow: hidden;
  }
  50% {
    overflow: inherit;
  }
  100% {
    overflow: inherit;
  }
}
</style>
