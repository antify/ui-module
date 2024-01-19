<template>
  <div class="flex flex-col bg-neutral-light gap-px h-full">
    <slot name="header"/>

    <div class="flex-grow bg-neutral-lightest h-full overflow-y-auto">
      <slot/>
    </div>

    <slot name="footer"/>
  </div>
</template>
