<script lang="ts" setup>
const tabItems = [
  {
    id: '1',
    label: 'First subpage tab',
    to: {
      name: 'index-subPageOne-one',
    },
  },
  {
    id: '2',
    label: 'Second subpage tab',
    to: {
      name: 'index-subPageOne-two',
    },
  },
  {
    id: '3',
    label: 'Third subpage tab',
    to: {
      name: 'index-subPageOne-three',
    },
  },
];
</script>

<template>
  <AntFormGroup>
    <div class="flex flex-col h-[100px]">
      <div>
        <AntTabs :tab-items="tabItems" />
      </div>

      <div>
        <NuxtPage />
      </div>
    </div>
  </AntFormGroup>
</template>
