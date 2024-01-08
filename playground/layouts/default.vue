<script setup lang="ts">
import {faCar, faHome} from '@fortawesome/free-solid-svg-icons';

const navbarItems = [
  {
    label: 'Home',
    icon: faHome,
    to: '/'
  }, {
    label: 'Cars',
    icon: faCar,
    to: '/cars'
  }
]
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div class="w-52 border-r border-neutral-light flex flex-col">
      <NuxtLink to="/" class="border-b border-neutral-light">
        <img src="~/assets/logo.svg" class="h-14 p-2.5"/>
      </NuxtLink>

      <AntNavbar :navbar-items="navbarItems"/>
    </div>

    <div class="flex-grow">
      <slot/>
    </div>
  </div>

  <AntToaster/>
</template>
