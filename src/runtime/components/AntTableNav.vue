<script lang="ts" setup>
// @ts-nocheck
/**
 * TODO:: test me in storybook through vue router
 * TODO:: fix ts errors
 */
import {useRouter, useRoute} from 'vue-router'
import AntPagination from './AntPagination.vue';
import {computed, ref, watch} from 'vue';
import AntSelect from './form/AntSelect.vue';
import AntSkeleton from './AntSkeleton.vue';
import {useVModel} from '@vueuse/core';
import {type SelectOption} from './form/__types';

const emit = defineEmits(['update:page'])
const props = withDefaults(
  defineProps<{
    page: number,
    pages: number,
    count: number | null,
    pageQuery?: string,
    itemsPerPageQuery?: string,
    fullWidth?: boolean,
    validItemsPerPage?: number[],
    skeleton?: boolean
  }>(),
  {
    pageQuery: 'p',
    itemsPerPageQuery: 'ipp',
    fullWidth: true,
    validItemsPerPage: () => [20, 50, 100, 200]
  }
)

const route = useRoute()
const router = useRouter()
const _skeleton = useVModel(props, 'skeleton', emit);

const itemsPerPageOptions = computed(() =>
  props.validItemsPerPage.map(item => ({
    label: `${item}`,
    value: item
  }) as SelectOption)
)
const page = computed(() => {
  const _page = route.query[props.pageQuery] >= 1 ? Number.parseInt(route.query[props.pageQuery]) : 1

  if (_page <= 0 || _page > props.pages) {
    return 1
  }

  return _page
})
const itemsPerPage = computed({
  get() {
    return route.query[props.itemsPerPageQuery] ?
      Number.parseInt(route.query[props.itemsPerPageQuery]) :
      props.validItemsPerPage[0]
  },
  set(val) {
    const query = {...route.query}
    query[props.itemsPerPageQuery] = `${val}`
    delete query[props.pageQuery]

    router.push({
      ...route,
      query
    })
  }
})
const fromItems = computed(() => (itemsPerPage.value * (page.value - 1)))

const _fullWidth = ref(props.fullWidth)

watch(() => props.fullWidth, () => {
  if (!props.fullWidth) {
    return _fullWidth.value = false
  }

  setTimeout(() => {
    _fullWidth.value = true
  }, 300)
})
</script>

<template>
  <div
    class="flex w-full items-center px-2"
    :class="{'justify-end': !_fullWidth, 'justify-between': _fullWidth}"
  >
    <div
      v-if="_fullWidth"
      class="flex gap-2 items-center text-neutral-lightest-font text-sm">
      <span class="relative">
        <AntSkeleton v-model="_skeleton" rounded absolute/>
        Items per page
      </span>

      <AntSelect
        v-model="itemsPerPage"
        :options="itemsPerPageOptions"
        :skeleton="_skeleton"
        :expanded="false"
      />

      <div v-if="count !== null" class="flex gap-1 relative">
        <AntSkeleton v-model="_skeleton" rounded absolute/>

        <span class="font-medium">{{ fromItems }} - {{ itemsPerPage * page }}</span>
        <span>of</span>
        <span class="font-medium">{{ count }}</span>
      </div>
    </div>

    <AntPagination
      :pages="pages"
      :page-query="pageQuery"
      :skeleton="_skeleton"
    />
  </div>
</template>
