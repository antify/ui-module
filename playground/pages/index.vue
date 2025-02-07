<script lang="ts" setup>
import {InputState} from "#ui-module";
</script>

<template>
  <AntFormGroup>
    <AntFormGroupLabel>Playground</AntFormGroupLabel>
    <pre class="bg-base-200 p-4 rounded">{{ InputState }}</pre>
    <AntButton @click="$uiModule.toaster.toastSuccess('Toasted')">Toast success message</AntButton>
    <div class="text-for-white-bg-font bg-custom-color p-2 rounded">
      Color Test
    </div>
  </AntFormGroup>
</template>
