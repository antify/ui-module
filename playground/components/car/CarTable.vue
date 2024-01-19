<script lang="ts" setup>
import type {TableHeader} from "#uiModule";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ref} from 'vue';
import {type Car} from "../../glue/plugins/car";

defineProps<{
  showLightVersion: boolean
}>();

const {$cars} = useNuxtApp();
const route = useRoute();
const {
  executeDelete,
  deleteStatus,
  deleteError
} = $cars.item;
const {
  execute,
  data,
  pending,
  error
} = $cars.listing;
const {getDetailRoute} = $cars.routing;
const deleteDialogOpen = ref(false);
const entryToDelete = ref<Car | null>(null);
const tableHeaders: TableHeader[] = [
  {
    title: 'Manufacturer',
    identifier: 'manufacturer',
    toProp: 'link',
    type: useUi().AntTableRowTypes.link,
    lightVersion: true,
  },
  {
    title: 'Model',
    identifier: 'model',
    type: useUi().AntTableRowTypes.text,
  },
  {
    title: 'Type',
    identifier: 'type',
    type: useUi().AntTableRowTypes.text,
  },
  {
    title: 'Color',
    identifier: 'color',
    type: useUi().AntTableRowTypes.text,
  },
  {
    identifier: 'actions',
    type: useUi().AntTableRowTypes.slot,
  },
];
const selectedRow = computed(() => route.params.carId ? data.value?.cars?.find((car) => car.id === route.params.carId) : undefined);
const cars = computed(() => {
  return data.value?.cars?.map((car) => {
    car.link = getDetailRoute(car.id);

    return car;
  }) || [];
});

onMounted(execute);

watch(error, () => useUiClient().handler.handleResponseError(error));
watch(deleteError, () => useUiClient().handler.handleResponseError(deleteError));

function openDeleteEntry(entry: Car) {
  entryToDelete.value = entry;
  deleteDialogOpen.value = true;
}

async function deleteEntry() {
  if (entryToDelete.value?.id) {
    await executeDelete(entryToDelete.value.id);
    entryToDelete.value = null;
  }
}
</script>

<template>
  <AntTable
    :selected-row="selectedRow"
    :data="cars"
    :headers="tableHeaders"
    :loading="pending || deleteStatus === 'pending'"
    :show-light-version="showLightVersion"
  >
    <template #cellContent="{header, element}">
      <div
        v-if="header.identifier === 'actions'"
        class="flex justify-end gap-2.5"
      >
        <AntButton
          :to="getDetailRoute(element.id)"
          :icon-left="faPencil"
          :size="useUi().Size.sm"
          outlined
        />

        <AntButton
          :icon-left="faTrash"
          :size="useUi().Size.sm"
          outlined
          @click="() => openDeleteEntry(element)"
        />
      </div>
    </template>
  </AntTable>

  <AntDeleteDialog
    v-model:open="deleteDialogOpen"
    :entry="`${entryToDelete?.manufacturer} ${entryToDelete?.model}`"
    @confirm="deleteEntry"
  />
</template>


