<script lang="ts" setup>
// @ts-nocheck
import { onBeforeUnmount, reactive, watch } from 'vue';

const props =
  defineProps<{
    throttle: number;
    duration: number;
    running: boolean;
  }>();

const data = reactive({
  percent: 0,
  show: false,
  canSucceed: true,
});

let timer: number;
let _throttle: number;
let cut: number;

function clear() {
  timer && clearInterval(timer);
  _throttle && clearTimeout(_throttle);
  timer = 0;
}

function start() {
  clear();

  data.percent = 0;
  data.canSucceed = true;

  if (props.throttle) {
    _throttle = setTimeout(startTimer, props.throttle);
  }
}

function set(to: number) {
  data.show = true;
  data.canSucceed = true;
  data.percent = Math.min(100, Math.max(0, Math.floor(to)));
}

function increase(by: number) {
  data.percent = Math.min(100, Math.floor(data.percent + by));
}

function decrease(by: number) {
  data.percent = Math.min(100, Math.floor(data.percent - by));
}

function pause() {
  clearInterval(timer);
}

function resume() {
  startTimer();
}

function finish() {
  data.percent = 100;
  hide();
}

function hide() {
  clear();

  setTimeout(() => {
    data.show = false;

    setTimeout(() => {
      data.percent = 0;
    }, 400);
  }, 500);
}

function startTimer() {
  data.show = true;

  cut = 10000 / Math.floor(props.duration);
  timer = setInterval(() => {
    increase(cut);
  }, 100);
}

onBeforeUnmount(() => clear());

watch(
  () => props.running,
  () => {
    if (props.running) {
      start();
    } else {
      finish();
    }
  }
);
</script>

<template>
  <div
    class="
      fixed
      top-0
      left-0
      right
      w-0
      transition-all
      duration-500
      z-50
      h-0.5
      bg-primary
    "
    :class="{ 'opacity-100': data.show, 'opacity-0': !data.show }"
    :style="`width: ${data.percent}%`"
  />
</template>
