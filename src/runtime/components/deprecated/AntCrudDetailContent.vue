<script setup lang="ts">
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {type RouteLocationRaw} from 'vue-router';

defineEmits(['save', 'save-and-new']);

withDefaults(defineProps<{
  buttonsSkeleton?: boolean,
  buttonsDisabled?: boolean,
  getListingRoute: () => RouteLocationRaw
}>(), {
  buttonsSkeleton: false,
  buttonsDisabled: false,
});
</script>

<template>
  <div class="flex-grow bg-neutral-lightest">
    <div class="h-full">
      <slot/>
    </div>
  </div>

  <div class="h-14 bg-neutral-lightest">
    <div class="h-14 flex-shrink-0">
      <slot name="detail-footer">
        <div class="px-2.5 flex justify-between items-center h-full">
          <div class="flex gap-2.5">
            <slot name="buttons-left">
              <AntButton
                :to="getListingRoute()"
                :bordered="false"
                :outlined="true"
                :icon-left="faAngleLeft"
                :disabled="buttonsDisabled"
              >
                Back
              </AntButton>
            </slot>
          </div>

          <div class="flex gap-2.5">
            <slot name="buttons-right">
              <slot name="before-save-buttons"/>
              <slot name="save-buttons">
                <AntButton
                  color-type="primary"
                  outlined
                  :skeleton="buttonsSkeleton"
                  :disabled="buttonsDisabled"
                  @click="$emit('save-and-new')"
                >
                  Save and new
                </AntButton>

                <AntButton
                  color-type="primary"
                  @click="$emit('save')"
                  :skeleton="buttonsSkeleton"
                  :disabled="buttonsDisabled"
                >
                  Save
                </AntButton>
              </slot>
              <slot name="after-save-buttons"/>
            </slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
