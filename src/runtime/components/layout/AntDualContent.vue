<template>
  <div class="h-screen max-h-screen flex overflow-hidden">
    <main
      class="
        h-screen
        max-h-screen
        flex flex-col flex-1
        relative
        z-0
        overflow-y-auto
        focus:outline-none
        md::order-last
      "
    >
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
        <slot name="mainHead"></slot>
      </div>

      <div class="overflow-y-auto h-full">
        <slot name="mainBody"></slot>
      </div>

      <div
        v-if="$slots['mainFooter']"
        class="flex justify-between bg-white px-4 py-3.5"
      >
        <slot name="mainFooter"></slot>
      </div>
    </main>

    <aside
      class="
        hidden
        xl:flex
        relative
        xl:order-first
        xl:flex-col
        flex-shrink-0
        w-96
        border-r border-gray-200
        h-screen
        max-h-screen
        flex-col
      "
    >
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
        <slot name="asideHead"></slot>
      </div>

      <div class="overflow-y-auto h-full">
        <slot name="asideBody"></slot>
      </div>

      <div
        v-if="$slots['asideFooter']"
        class="flex justify-between bg-white px-4 py-3.5"
      >
        <slot name="asideFooter"></slot>
      </div>
    </aside>
  </div>
</template>
