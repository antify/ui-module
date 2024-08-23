<script lang='ts' setup>
import {InputState} from "#ui-module";
</script>

<template>
  <AntFormGroup>
    <AntFormGroupLabel>Playground</AntFormGroupLabel>
    <pre>{{ InputState }}</pre>
    <AntButton @click="$uiModule.toaster.toastSuccess('Toasted')">Toast success message</AntButton>
  </AntFormGroup>
</template>
