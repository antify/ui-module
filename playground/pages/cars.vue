<script setup lang='ts'>
import {useRoute} from 'vue-router'

const route = useRoute();
const {$carTable} = useNuxtApp();
const {skeleton} = $carTable;
const isFullWidth = computed(() => route.name === 'cars');
const getDetailRoute = (carId = 'create') => ({
  name: 'cars-carId',
  params: {carId},
  query: route.query
});
</script>

<template>
  <AntNavLeftCrud>
    <template #search-section>
      <AntTableFilter
        :full-width="isFullWidth"
        @search="() => $carTable.refresh()"
        @create="() => $router.push(getDetailRoute())"
      />
    </template>

    <template #table-section>
      <CarTable
        :get-detail-route="getDetailRoute"
        :full-width="isFullWidth"
      />
    </template>

    <template #table-nav-section>
      <AntTableNav
        :count="$carTable.count.value"
        :full-width="isFullWidth"
        :skeleton="skeleton"
        @changeItemsPerPage="() => $carTable.refresh()"
        @changePage="() => $carTable.refresh(false)"
      />
    </template>

    <NuxtPage/>
  </AntNavLeftCrud>
</template>
