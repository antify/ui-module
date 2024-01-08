<template>
  <div class="h-screen max-h-screen flex flex-col">
    <div
      class="
        bg-white
        border-b
        pl-10
        md:pl-4
        px-4
        h-14
        min-h-14
        flex
        justify-between
        items-center
      "
    >
      <slot name="head"></slot>
    </div>

    <div class="overflow-y-auto h-full">
      <slot default name="body"></slot>
    </div>

    <div
      v-if="$slots['footer']"
      class="flex justify-between bg-white px-4 py-3.5"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>
