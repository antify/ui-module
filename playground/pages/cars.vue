<script setup lang='ts'>
import {useRoute} from 'vue-router'

const route = useRoute();
const {$cars} = useNuxtApp();
const {
  skeleton,
  refresh,
  count,
} = $cars.listing;
const {
  error: detailError,
  createError,
  updateError,
  deleteError
} = $cars.item;
const {
  goToDetailPage
} = $cars.routing;
const uiClient = useUiClient();
const isDetailPage = computed(() => route.name !== 'cars');

watch(detailError, () => uiClient.handler.handleResponseError(detailError))
watch(createError, () => uiClient.handler.handleResponseError(createError))
watch(updateError, () => uiClient.handler.handleResponseError(updateError))
watch(deleteError, () => uiClient.handler.handleResponseError(deleteError))
</script>

<template>
  <AntCrud :show-detail="isDetailPage">
    <template #search-section>
      <AntCrudTableFilter
        :full-width="!isDetailPage"
        @search="() => refresh()"
        @create="() => goToDetailPage()"
      />
    </template>

    <template #table-section>
      <CarTable :show-light-version="isDetailPage"/>
    </template>

    <template #table-nav-section>
      <AntCrudTableNav
        :count="count"
        :full-width="!isDetailPage"
        :skeleton="skeleton"
        @changeItemsPerPage="() => refresh()"
        @changePage="() => refresh(false)"
      />
    </template>

    <NuxtPage/>
  </AntCrud>
</template>
