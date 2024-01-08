<script setup lang="ts">
const {
  data,
  skeleton,
  save,
  saveAndNew,
  formDisabled,
  validator
} = useNuxtApp().$cars.item

// TODO:: test error case
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
    <div class="p-2.5">
      <form @submit.prevent="save">
        <AntFormGroup>
          <AntFormGroup :direction="useUi().Direction.row">
            <AntTextInput
              v-model="data.engine.type"
              :label="validator.fieldMap.engine.type.readableName"
              :validator="validator.fieldMap.engine.type.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />

            <AntUnitInput
              v-model="data.engine.volumeInLiter"
              unit="Liter"
              :label="validator.fieldMap.engine.volumeInLiter.readableName"
              :validator="validator.fieldMap.engine.volumeInLiter.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />
          </AntFormGroup>

          <AntFormGroup :direction="useUi().Direction.row">
            <AntUnitInput
              v-model="data.engine.powerPs"
              unit="ps"
              :label="validator.fieldMap.engine.powerPs.readableName"
              :validator="validator.fieldMap.engine.powerPs.validator"
              :skeleton="skeleton"
              :disabled="formDisabled"
            />

            <div class="w-full"></div>
          </AntFormGroup>
        </AntFormGroup>
      </form>
    </div>

    <template #before-save-buttons>
      <AntButton outlined>Drucken</AntButton>
    </template>
  </AntCrudDetailContent>
</template>
