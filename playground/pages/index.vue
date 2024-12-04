<script lang='ts' setup>
import {InputState} from "#ui-module";
</script>

<template>
  <AntFormGroup>
    <AntFormGroupLabel>Playground</AntFormGroupLabel>
    <pre class="bg-customColor-200 p-4 rounded">{{ InputState }}</pre>
    <AntButton @click="$uiModule.toaster.toastSuccess('Toasted')">Toast success message</AntButton>
  </AntFormGroup>
</template>
