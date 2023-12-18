<script lang="ts" setup>
import AntButton from '../AntButton.vue';

defineProps<{
  errors?: string[];
}>();
</script>

<template>
  <form class="mt-8 space-y-6">
    <input type="hidden" name="remember" value="true" />

    <div>
      <div class="rounded-md shadow-sm -space-y-px">
        <slot name="emailField"> </slot>
        <slot name="passwordField"> </slot>
      </div>

      <div
        v-for="(error, index) in errors || []"
        :key="`login-error-${index}`"
        class="text-red-600 text-sm"
      >
        <slot name="error" v-bind="{ error }">{{ error }}</slot>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <slot name="beforeSubmit"> </slot>
    </div>

    <div>
      <slot name="submitButton">
        <AntButton type="submit" label="Sign in" />
      </slot>
    </div>
  </form>
</template>
