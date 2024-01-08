<script lang="ts" setup>
import {type RouteLocationRaw} from "vue-router";
import type {TableHeader} from "#uiModule";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useFetch} from "nuxt/app";

const props = defineProps<{
  fullWidth: boolean
  getDetailRoute: (carId: string) => RouteLocationRaw
}>();

const {$uiModule, $carTable} = useNuxtApp();
const route = useRoute();
// TODO:: use skeleton from $carTable in table
const {data, error, execute, refresh, pending, skeleton} = $carTable;
const deleteDialogOpen = ref(false);
const entryToDelete = ref<string | null>(null);
const {
  error: deleteError,
  execute: executeDelete,
  status: deleteStatus,
} = useFetch(
  () => `/api/components/car/car-table/${entryToDelete.value}`,
  {
    method: 'delete',
    immediate: false,
    watch: false,
    onResponse({response}) {
      if (response.status === 200) {
        refresh(false);
        $uiModule.toaster.toastDeleted();
      }
    }
  }
)

const tableHeaders: TableHeader[] = [
  {
    title: 'Manufacturer',
    identifier: 'manufacturer',
    toProp: 'link',
    type: useUi().AntTableRowTypes.link,
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
    car.link = props.getDetailRoute(car.id);

    return car;
  }) || [];
});

onMounted(execute);

watch(error, () => useUiClient().handler.handleResponseError(error));
watch(deleteError, () => useUiClient().handler.handleResponseError(deleteError));

function openDeleteEntry(id: string) {
  entryToDelete.value = id;
  deleteDialogOpen.value = true;
}

async function deleteEntry() {
  if (entryToDelete.value) {
    await executeDelete();
    entryToDelete.value = null;
  }
}
</script>

<template>
  <AntTable
    :selected-row="selectedRow"
    :data="cars"
    :headers="fullWidth ? tableHeaders : [tableHeaders[0]]"
    :loading="pending || deleteStatus === 'pending'"
  >
    <template #cellContent="{header, element}">
      <div
        v-if="header.identifier === 'actions'"
        class="flex justify-end gap-2.5"
      >
        <AntButton
          :to="{name: 'cars-carId', params: {carId: element.id}}"
          :icon-left="faPencil"
          :size="useUi().Size.sm"
          outlined
        />

        <AntButton
          :icon-left="faTrash"
          :size="useUi().Size.sm"
          outlined
          @click="() => openDeleteEntry(element.id)"
        />
      </div>
    </template>
  </AntTable>

  <!-- TODO:: outsource to delete dialog -->
  <AntDialog
    v-model:open="deleteDialogOpen"
    :color-type="useUi().InputColorType.danger"
    title="Delete entry"
    confirm-text="Delete"
    @confirm="deleteEntry"
  >
    Do you really want to delete this entry?
  </AntDialog>
</template>


