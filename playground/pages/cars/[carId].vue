<script setup lang='ts'>
const {$carTable, $car, $cars} = useNuxtApp();
const {validator, resetData} = $cars.item
const carId = useRoute().params.carId;
const ui = useUi();
const route = useRoute();

const tabItems = computed(() => ([
  {
    // TODO:: remove id if #11 is solved
    id: 'main-data',
    label: 'Main data',
    to: {name: 'cars-carId', params: {carId}, query: route.query},
    colorType: validator.hasErrors('mainData') ? ui.TabItemColorType.danger : ui.TabItemColorType.base
  }, {
    id: 'engine',
    label: 'Engine',
    to: {name: 'cars-carId-engine', params: {carId}, query: route.query},
    colorType: validator.hasErrors('engine') ? ui.TabItemColorType.danger : ui.TabItemColorType.base
  }, {
    id: 'owners',
    label: 'Owners',
    to: {name: 'cars-carId-owners', params: {carId}, query: route.query},
  }, {
    id: 'damages',
    label: 'Damages',
    to: {name: 'cars-carId-damages', params: {carId}, query: route.query},
  },
]));

// watch($car.error, () => useUiClient().handler.handleResponseError($car.error))

onMounted(() => {
  resetData()

  if (carId !== 'create') {
    $car.execute()
  }
})
</script>

<template>
  <AntCrudDetail>
    <template #main-header-section>
      <div class="flex justify-between items-center h-full">
        <AntTabs :tab-items="tabItems"/>

        <div class="px-2.5">
          <AntButton
            :color-type="useUi().ColorType.danger"
            outlined
            @click="$carTable.executeDelete"
          >
            Delete
          </AntButton>
        </div>
      </div>
    </template>

    <NuxtPage/>
  </AntCrudDetail>
</template>
