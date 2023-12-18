<script lang="ts" setup>
import {ref, useSlots, watch} from 'vue';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import AntButton from './form/AntButton.vue';

const emit = defineEmits(['update:open', 'close']);
const props = withDefaults(defineProps<{
  title: string,
  open: boolean,
  fullscreen?: boolean
}>(), {
  fullscreen: false
});
const openModal = ref(props.open);
const openBackground = ref(props.open);

watch(() => props.open, (val) => {
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      emit('update:open', false);
    }
  }

  if (val) {
    openBackground.value = true;
    setTimeout(() => openModal.value = true, props.fullscreen ? 0 : 100)
    document.addEventListener('keydown', onKeydown);
  } else {
    openModal.value = false;
    setTimeout(() => openBackground.value = false, props.fullscreen ? 0 : 100)
    document.removeEventListener('keydown', onKeydown);
  }
});

function closeModal() {
  emit('update:open', false);
  emit('close');
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="openBackground"
      class="absolute inset-0 flex items-center justify-center z-50 cursor-pointer overflow-hidden"
      :class="{'bg-black/50 backdrop-blur-sm': !fullscreen}"
      @click.self="closeModal"
    >
      <transition :name="!fullscreen ? 'bounce' : 'bounce-slow'">
        <div
          v-if="openModal"
          class="flex flex-col gap-px bg-neutral-light overflow-hidden cursor-auto"
          :class="{'w-full h-full': fullscreen, 'border border-neutral-light rounded-md shadow-md': !fullscreen}"
        >
          <div
            class="bg-neutral-lightest p-2.5 flex items-center justify-between text-neutral-lightest-font text-lg font-medium">
            <slot name="title">
              {{ title }}
            </slot>

            <AntButton
              :icon-left="faXmark"
              :bordered="false"
              outlined
              @click="closeModal"
            />
          </div>

          <div class="bg-neutral-lightest p-2.5 grow">
            <slot/>
          </div>

          <div
            v-if="useSlots()['footer'] || false"
            class="bg-neutral-lightest p-2.5 text-neutral-lightest-font"
          >
            <slot name="footer"/>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .4s;
}

.bounce-leave-active {
  animation: bounce-in .4s reverse;
}

.bounce-slow-enter-active {
  animation: bounce-in .6s;
}

.bounce-slow-leave-active {
  animation: bounce-in .4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
