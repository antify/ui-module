<script lang="ts" setup>
// TODO:: This component works only with vue-router. Make it work in storybook.
// TODO:: add skeleton
import AntSearch from './form/AntSearch.vue';
import AntDropdown from './AntDropdown.vue';
import AntIcon from './AntIcon.vue';
import {computed, ref, watch} from 'vue';
import AntButton from './form/AntButton.vue';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {IconColorType} from './__types/AntIcon.types';
import {ColorType, Position} from '../enums';
import {useRouter, useRoute} from 'vue-router';

const props = withDefaults(defineProps<{
  fullWidth?: boolean,
  showFilter?: boolean,
  searchQuery?: string
}>(), {
  fullWidth: true,
  showFilter: true,
  searchQuery: 'search'
});
const emit = defineEmits(['search', 'create']);
const router = useRouter();
const route = useRoute();

const showDropdown = ref(false);
const _fullWidth = ref(props.fullWidth)
const search = computed({
  get: () => route.query[props.searchQuery] as string || '',
  set: (value) => {
    const query = {
      ...route.query,
      [props.searchQuery]: value
    }

    if (!value) {
      delete query[props.searchQuery];
    }

    (async () => {
      await router.push({
        ...route,
        query
      })

      emit('search', value)
    })()
  }
})

watch(() => props.fullWidth, (val) => {
  setTimeout(() => {
    _fullWidth.value = val
  }, 350)
})
</script>

<template>
  <div class="flex h-full items-center p-2.5 gap-2.5 bg-neutral-lightest">
    <div
      class="flex gap-2.5 flex-grow"
      :class="{'flex-grow': !_fullWidth}"
    >
      <div :class="{'w-80': _fullWidth, 'w-full': !_fullWidth}">
        <AntSearch v-model="search"/>
      </div>

      <AntDropdown
        v-if="showFilter"
        v-model:show-dropdown="showDropdown"
        :position="Position.left"
      >
        <AntButton
          outlined
          @click="() => showDropdown = !showDropdown"
        >
          <AntIcon
            :icon="faFilter"
            :color-type="IconColorType.neutral"
          />
        </AntButton>

        <template #content>
          <slot name="dropdownContent"/>
        </template>
      </AntDropdown>
    </div>

    <div v-if="_fullWidth">
      <slot name="buttons">
        <AntButton
          :color-type="ColorType.primary"
          outlined
          @click="() => emit('create')"
        >
          Create
        </AntButton>
      </slot>
    </div>
  </div>
</template>
