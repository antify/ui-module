<script lang="ts" setup>
import {
  InputState,
} from '#ui-module';

const tabItems = [
  {
    id: '1',
    label: 'First tab',
    to: {
      name: 'index-subPageOne',
    },
  },
  {
    id: '2',
    label: 'Second tab',
    to: {
      name: 'index-subPageTwo',
    },
  },
  {
    id: '3',
    label: 'Third tab',
    to: {
      name: 'index-subPageThree',
    },
  },
];
</script>

<template>
  <AntFormGroup>
    <AntFormGroupLabel>Playground</AntFormGroupLabel>

    <pre class="bg-base-200 p-4 rounded">{{ InputState }}</pre>

    <AntButton @click="$uiModule.toaster.toastSuccess('Toasted')">
      Toast success message
    </AntButton>

    <div class="text-for-white-bg-font bg-custom-color p-2 rounded">
      Color Test
    </div>

    <div class=" border border-base-300 flex flex-col h-[100px]">
      <div>
        <AntTabs :tab-items="tabItems" />
      </div>

      <div>
        <NuxtPage />
      </div>
    </div>
  </AntFormGroup>
</template>
