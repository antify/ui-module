<script lang="ts" setup>
// @ts-nocheck
/**
 * TODO:: test me in storybook through vue router
 * TODO:: Fix ts errors
 */
import {useRouter, useRoute} from 'vue-router'
import {computed} from 'vue';
import AntButton from './form/AntButton.vue';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Grouped} from '../enums/Grouped.enum';
import AntSkeleton from './AntSkeleton.vue';
import {useVModel} from '@vueuse/core';
import {ColorType} from '../enums';

const emit = defineEmits(['update:page'])
const props = withDefaults(
  defineProps<{
    pages: number,
    pageQuery?: string,
    skeleton?: boolean
  }>(),
  {
    pageQuery: 'p',
    skeleton: false
  }
)

const router = useRouter()
const route = useRoute()
const _skeleton = useVModel(props, 'skeleton', emit);

const page = computed({
  get() {
    const _page = route.query[props.pageQuery] >= 1 ? Number.parseInt(route.query[props.pageQuery]) : 1

    if (_page <= 0 || _page > props.pages) {
      return 1
    }

    return _page
  },
  set(val) {
    const query = {...route.query}
    query[props.pageQuery] = val

    router.push({
      ...route,
      query
    })
  }
})

/**
 * Build following constellations:
 * [1] 2 3 ...
 * 1 2 [3] 4... 10
 * 1 ... 4 [5] 6 ... 10
 * 1 ... 7 [8] 9 10
 * 1 ... 8 9 [10]
 */
const pagination = computed(() => {
  const pagination = []

  if (page.value > 2 && props.pages > 3) {
    pagination.push(1)

    if (page.value > 3) {
      pagination.push('...')
    }
  }

  if (page.value === 1) {
    pagination.push(1)

    if (props.pages >= 2) {
      pagination.push(2)
    }

    if (props.pages >= 3) {
      pagination.push(3)
    }
  } else if (page.value === props.pages) {
    if (props.pages - 2 >= 1) {
      pagination.push(props.pages - 2)
    }
    if (props.pages - 1 >= 1) {
      pagination.push(props.pages - 1)
    }
    pagination.push(props.pages)
  } else {
    pagination.push(page.value - 1)
    pagination.push(page.value)
    pagination.push(page.value + 1)
  }

  if (page.value < props.pages - 1 && props.pages > 3) {
    if (page.value < props.pages - 2) {
      pagination.push('...')
    }
    pagination.push(props.pages)
  }

  return pagination
})
</script>

<template>
  <div class="inline-flex relative">
    <AntSkeleton v-model="_skeleton" rounded absolute/>

    <div
      class="inline-flex gap-px"
      :class="{'invisible': _skeleton}"
    >
      <AntButton
        :disabled="page === 1"
        :icon-left="faChevronLeft"
        :grouped="Grouped.left"
        outlined
        @click="() => page = page - 1"
      />

      <AntButton
        v-for="(pageObj, index) in pagination"
        :color-type="pageObj === page ? ColorType.primary : ColorType.base"
        :class="{'text-primary': pageObj === page}"
        :disabled="pageObj === '...'"
        :grouped="Grouped.center"
        :outlined="pageObj !== page"
        @click="() => page = pageObj"
        v-bind:key="`pagination-button-${index}`"
      >
        {{ pageObj }}
      </AntButton>

      <AntButton
        :icon-left="faChevronRight"
        :grouped="Grouped.right"
        :disabled="page === pages"
        outlined
        @click="() => page = page + 1"
      />
    </div>
  </div>
</template>
