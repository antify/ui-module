<script setup lang="ts">
const {$updateCar, $cars} = useNuxtApp();
const {
  data,
  skeleton,
  save,
  saveAndNew,
  validator,
  formDisabled
} = $cars.item

const {
  error: updateError,
} = $updateCar

// watch(updateError, () => useUiClient().handler.handleResponseError(updateError))
</script>

<template>
  <AntCrudDetailContent
    :buttons-skeleton="skeleton"
    :buttons-disabled="formDisabled"
    :get-listing-route="() => ({name: 'cars', query: $route.query})"
    @save="save"
    @saveAndNew="saveAndNew"
  >
    <pre>{{data}}</pre>
    <div class="p-2.5">
      <form @submit.prevent="save">
        <AntFormGroup>
          <AntFormGroup :direction="useUi().Direction.row">
            <AntTextInput
              v-model="data.manufacturer"
              :label="validator.fieldMap.manufacturer.readableName"
              :validator="validator.fieldMap.manufacturer.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />

            <AntTextInput
              v-model="data.model"
              :label="validator.fieldMap.model.readableName"
              :validator="validator.fieldMap.model.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />
          </AntFormGroup>

          <AntFormGroup :direction="useUi().Direction.row">
            <AntTextInput
              v-model="data.type"
              :label="validator.fieldMap.type.readableName"
              :validator="validator.fieldMap.type.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />

            <AntTextInput
              v-model="data.color"
              :label="validator.fieldMap.color.readableName"
              :validator="validator.fieldMap.color.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />
          </AntFormGroup>
        </AntFormGroup>
      </form>
    </div>
  </AntCrudDetailContent>
</template>
