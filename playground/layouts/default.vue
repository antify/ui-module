<script setup lang="ts">
import {faHome} from '@fortawesome/free-solid-svg-icons';

const navbarItems = [
  {
    label: 'Home',
    icon: faHome,
    to: '/'
  }
]
</script>

<template>
  <AntNavLeftLayout
    :navbar-items="navbarItems"
    logo-route="/"
  >
    <template #logo-image>
      <img src="~/assets/logo.svg" class="w-full"/>
    </template>

    <AntContent class="h-full">
      <NuxtPage/>
    </AntContent>

    <AntToaster :toasts="$uiModule.toaster.getToasts()"/>
  </AntNavLeftLayout>
</template>
