<script lang='ts' setup>
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {ref} from "vue";
import {useNuxtApp} from '#imports';
import {InputState} from "../../src/runtime/enums";

const {$uiModule} = useNuxtApp();

const validator = ref(useValidator((val) => val === 'asdf' || 'Value must be "asdf"'));
const filled = ref(false);
const modalOpen = ref(false);

const addToast = (type: InputState) => {
  $uiModule.toaster.toast({
    id: Math.random().toString(36).substring(7),
    title: `${type} message here`,
    type
  });
};
</script>

<template>
  <AntFormGroup class="p-4">
    <div>{{ useUi().State }}</div>

    <AntField label="Button">
      <AntButton
        :filled="filled"
        color-type="danger"
        @click="filled = !filled"
      >
        Click me to change my style
      </AntButton>
    </AntField>

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

    <AntFormGroup>
      <AntFormGroupLabel>Toaster</AntFormGroupLabel>
      <AntFormGroup direction="row">
        <AntButton
          v-for="state in Object.values(InputState)"
          @click="addToast(state)">
          Toast {{ state }}
        </AntButton>
      </AntFormGroup>
    </AntFormGroup>
  </AntFormGroup>
</template>
