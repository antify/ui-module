<script lang="ts" setup>
import { ref } from 'vue';
import {
  faX,
  faBullhorn,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import AntButton from '../../form/AntButton.vue';

const props =
  defineProps<{
    mainColor?: string;
    secondaryColor?: string;
    textColor?: string;
    icon?: IconDefinition;
  }>();

const _mainColor = ref<string>(props.mainColor || 'primary');
const _secondaryColor = ref<string>(props.secondaryColor || 'primary-dark');
const _textColor = ref<string>(props.textColor || 'white');
const _icon = ref<IconDefinition>(props.icon || faBullhorn);
</script>

<template>
  <div class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg shadow-lg sm:p-3" :class="`bg-${_mainColor}`">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg" :class="`bg-${_secondaryColor}`">
              <slot name="bannerStart">
                <fa-icon
                  :class="`text-${_textColor}`"
                  class="h-6 w-6"
                  :icon="_icon"
                />
              </slot>
            </span>

            <p class="ml-3 font-medium truncate" :class="`text-${_textColor}`">
              <slot></slot>
            </p>
          </div>

          <div
            class="order-3 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
          >
            <slot name="bannerEnd"></slot>
          </div>

          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <slot name="closeBanner">
              <AntButton
                type="button"
                class="
                  -mr-1
                  flex
                  p-2
                  rounded-md
                  focus:outline-none
                  focus:ring-2
                  border-none
                  bg-transparent
                  transition-all
                  duration-500
                "
                :class="`bg-${_mainColor} hover:bg-${_secondaryColor} focus:ring-${_textColor}`"
              >
                <span class="sr-only">Dismiss</span>

                <fa-icon :class="`text-${_textColor}`" :icon="faX" />
              </AntButton>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
