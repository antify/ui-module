<script setup lang="ts">
// TODO:: remove ts ignore
// @ts-nocheck
import {computed, ref, watch} from 'vue';
import AntButton from '../buttons/AntButton.vue';
import AntIcon from '../AntIcon.vue';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {ColorType, InputColorType} from '../../enums';
import {IconSize} from '../__types';

const emit = defineEmits(['update:open', 'close', 'confirm']);
const props = withDefaults(defineProps<{
  title?: string,
  open: boolean,
  confirmText?: string,
  cancelText?: string,
  showCancel?: boolean,
  colorType?: InputColorType
}>(), {
  colorType: InputColorType.base,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  showCancel: true,
});

const openDialog = ref(props.open);
const openBackground = ref(props.open);
const icons = {
  [InputColorType.base]: null,
  [InputColorType.info]: faInfoCircle,
  [InputColorType.danger]: faExclamationCircle,
  [InputColorType.warning]: faExclamationTriangle,
  [InputColorType.success]: faCheckCircle,
};

const iconColor = computed(() => {
  const variants = {
    [InputColorType.base]: 'text-neutral-100-font',
    [InputColorType.danger]: 'text-danger-500',
    [InputColorType.info]: 'text-info-500',
    [InputColorType.success]: 'text-success-500',
    [InputColorType.warning]: 'text-warning-500',
  };

  return variants[props.colorType];
});

watch(() => props.open, (val) => {
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      emit('update:open', false);
    }
  }

  if (val) {
    openBackground.value = true;
    setTimeout(() => openDialog.value = true, 100);
    document.addEventListener('keydown', onKeydown);
  } else {
    openDialog.value = false;
    setTimeout(() => openBackground.value = false, 100);
    document.removeEventListener('keydown', onKeydown);
  }
});

function closeDialog() {
  emit('update:open', false);
  emit('close');
}
function confirmDialog() {
  emit('update:open', false);
  emit('confirm');
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="openBackground"
      class="absolute inset-0 flex items-center justify-center z-50 cursor-pointer overflow-hidden bg-black/50 backdrop-blur-sm"
      data-e2e="dialog"
      @click.self="closeDialog"
    >
      <Transition :name="'bounce'">
        <div
          v-if="openDialog"
          class="flex flex-col gap-px bg-neutral-300 overflow-hidden cursor-auto w-96 border border-neutral-300 rounded-md shadow-md"
        >
          <div
            v-if="title || $slots['title']"
            class="bg-neutral-100 p-2 flex items-center justify-between text-neutral-100-font text-sm font-semibold"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>

          <div class="bg-white p-2 grow flex items-center gap-2 text-sm text-for-white-bg-font">
            <slot name="icon">
              <AntIcon
                v-if="icons[colorType]"
                :size="IconSize.xl3"
                :icon="icons[colorType] as unknown as IconDefinition"
                :color="iconColor"
                class="px-2.5 w-8 h-8"
              />
            </slot>

            <slot />
          </div>

          <div
            class="bg-neutral-100 p-2 gap-2 text-for-white-bg-font flex w-full justify-end"
          >
            <slot name="footer">
              <AntButton
                v-if="showCancel"
                :color-type="ColorType.base"
                @click="closeDialog()"
              >
                {{ cancelText }}
              </AntButton>

              <AntButton
                :color-type="colorType === ColorType.base ? ColorType.primary : colorType as unknown as ColorType"
                filled
                @click="confirmDialog()"
              >
                {{ confirmText }}
              </AntButton>
            </slot>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
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
