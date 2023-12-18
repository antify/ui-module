<script lang='ts' setup>
import {faXmark} from '@fortawesome/free-solid-svg-icons';

const validator = ref(useValidator((val) => val === 'asdf' || 'Value must be "asdf"'));
const outlined = ref(false);
const inputValue = ref("");
const modalOpen = ref(false)
</script>

<template>
  <div class="p-4 flex flex-col space-y-4">
    <div>{{ useUi().ColorType }}</div>

    <AntField label="Button">
      <AntButton
        :outlined="outlined"
        color-type="danger"
        @click="outlined = !outlined"
      >
        Click me to change my style
      </AntButton>
    </AntField>

    <AntTextInput
      v-model:value="inputValue"
      label="Input field"
      :validator="validator"
    />

    <AntField label="Icon example">
      <AntIcon :icon="faXmark"/>
    </AntField>

    <AntField label="Modal">
      <AntButton @click="modalOpen = true">Open modal</AntButton>
    </AntField>

    <AntModal v-model:open="modalOpen" title="Test modal">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
    </AntModal>
  </div>
</template>
