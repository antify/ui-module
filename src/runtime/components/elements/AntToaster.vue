<script lang="ts" setup>
import {POSITION, Toaster, TOASTER_TYPE} from '../../types/Toaster.type';
import {computed} from 'vue';
import {faX, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['update:toasts']);
const props =
  defineProps<{
    position?: POSITION;
    canClose?: boolean;
    toasts: Array<Toaster>;
  }>();

const classes = computed(() => ({
  'left-0 top-0': props.position === POSITION.LEFT_TOP,
  'right-0 top-0': props.position === POSITION.RIGHT_TOP,
  'left-0 bottom-0': props.position === POSITION.LEFT_BOTTOM,
  'right-0 bottom-0':
    !props.position || props.position === POSITION.RIGHT_BOTTOM,
}));

const _toasts = computed<Array<Toaster>>({
  get() {
    return props.toasts;
  },
  set(val) {
    emit('update:toasts', val);
  },
});

function remove(toastId: string) {
  const index = _toasts.value.findIndex((toast) => toast.id === toastId);

  if (index !== -1) {
    _toasts.value.splice(index, 1);
  }
}
</script>

<template>
  <div class="absolute w-80 px-2" :class="classes">
    <div
      v-for="(toast, index) in _toasts"
      :key="`${toast.id}-${index}-toast`"
      class="
        relative
        w-full
        min-h-14
        flex
        justify-start
        items-center
        p-4
        mb-2
        rounded-md
        transition-all
      "
      :class="{
        'bg-primary text-white':
          !toast.type || toast.type === TOASTER_TYPE.NOTIFICATION,
        'bg-yellow-400 text-gray-800': toast.type === TOASTER_TYPE.WARNING,
        'bg-red-600 text-white': toast.type === TOASTER_TYPE.ERROR,
      }"
    >
      <slot name="icons">
        <div
          v-if="
            toast.type === TOASTER_TYPE.NOTIFICATION &&
            $slots['notificationIcon']
          "
          class="mr-4"
        >
          <slot name="notificationIcon"></slot>
        </div>

        <div v-if="toast.type === TOASTER_TYPE.WARNING" class="mr-4">
          <slot name="warningIcon">
            <fa-icon :icon="faTriangleExclamation"/>
          </slot>
        </div>

        <div v-if="toast.type === TOASTER_TYPE.ERROR" class="mr-4">
          <slot name="errorIcon">
            <fa-icon :icon="faTriangleExclamation"/>
          </slot>
        </div>
      </slot>

      <slot v-bind="{ toast }">
        {{ toast.message }}
      </slot>

      <div
        v-if="canClose"
        class="
          absolute
          right-4
          hover:text-gray-400
          transition-all
          duration-500
          cursor-pointer
          focus:ring-white
        "
        @click="remove(toast.id)"
      >
        <slot name="closeIcon">
          <fa-icon :icon="faX"/>
        </slot>
      </div>
    </div>
  </div>
</template>
