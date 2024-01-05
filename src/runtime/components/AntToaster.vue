<script lang="ts" setup>
/**
 * To let the toaster show toasts, use the plugin "$uiModule.toaster" property.
 */
import {computed} from 'vue';
import AntToast from './AntToast.vue';
import {CornerPosition} from '../enums/Position.enum';

const props = withDefaults(defineProps<{
  position?: CornerPosition;
}>(), {
  position: CornerPosition.bottomLeft
});

const classes = computed(() => ({
  'left-0 top-0': props.position === CornerPosition.topLeft,
  'right-0 top-0': props.position === CornerPosition.topRight,
  'left-0 bottom-0': props.position === CornerPosition.bottomLeft,
  'right-0 bottom-0': props.position === CornerPosition.bottomRight,
}));
</script>

<template>
  <div
    class="absolute flex flex-col items-baseline space-y-2.5 p-2.5"
    :class="classes"
  >
    <TransitionGroup name="list">
      <AntToast
        v-for="toast of $uiModule.toaster.getToasts()"
        :title="toast.title"
        :color-type="toast.type"
        :icon="toast.hasIcon"
        @close="$uiModule.toaster.removeToast(toast)"
        v-bind:key="`ant-toast-${toast.id}`"
      >
        <template v-if="toast.content" #default>{{ toast.content }}</template>
      </AntToast>
    </TransitionGroup>
  </div>
</template>

<style>
.list-move {
  transition: all 0.5s ease;
}

.list-enter-active{
  animation: bounce-in-left .6s;
}

.list-leave-active {
  animation: bounce-in-left .4s reverse;
}

@keyframes bounce-in-left {
  0% {
    transform: translateX(-10rem);
    opacity: 0;
  }
  50% {
    transform: translateX(.5rem);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
