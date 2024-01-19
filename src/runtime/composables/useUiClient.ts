/**
 * Set of helper functions for client side
 */
import type {FetchResponse, FetchError} from 'ofetch';
import {type RouteLocationRaw} from 'vue-router';
import {useNuxtApp, navigateTo, createError} from '#imports';
import {ref, type Ref, watch} from 'vue';
import {watchOnce} from '@vueuse/core';

export async function handleNotFoundResponse(response: FetchResponse, fallbackUrl: RouteLocationRaw) {
  if (response._data?.notFound) {
    useNuxtApp().$uiModule.toaster.toastError('Entry not found. Maybe an other user deleted it.')

    await navigateTo(fallbackUrl)
  }
}

export function handleResponseError(error: Ref<FetchError | null>) {
  if (error.value) {
    throw createError({...error.value?.data, statusCode: 500, fatal: true})
  }
}

function isFormDisabled(status: Ref | Ref[]): boolean {
  if (Array.isArray(status)) {
    return status.some((status) => isFormDisabled(status))
  }

  return status.value === 'pending'
}

/**
 * Creates a skeleton ref with flicker protection by prevent switching to fast from true to false.
 *
 * Important, it only watches the pending ref once, because a skeleton should be shown only one time
 * on initial loading.
 *
 * @param pending
 */
function createSkeleton(pending: Ref<boolean>): Ref<boolean> {
  const skeleton = ref(true)
  const initialTimestamp = Date.now()
  const minShowTime = 500

  watchOnce(pending, () => {
    const timeShowed = (Date.now() - (initialTimestamp || Date.now()));
    const restTimeToShow = minShowTime - timeShowed > 0 ? minShowTime - timeShowed : 0;

    if (restTimeToShow === 0) {
      skeleton.value = false;
    } else {
      setTimeout(() => {
        skeleton.value = false;
      }, restTimeToShow);
    }
  })

  return skeleton
}

// function createFlickerProtectRef<T extends Ref>(refToProtect: T): T {
//   watch(refToProtect, () => {
//     const timeShowed = (Date.now() - (initialTimestamp || Date.now()));
//     const restTimeToShow = minShowTime - timeShowed > 0 ? minShowTime - timeShowed : 0;
//
//     if (restTimeToShow === 0) {
//       skeleton.value = false;
//     } else {
//       setTimeout(() => {
//         skeleton.value = false;
//       }, restTimeToShow);
//     }
//   })
// }

export const useUiClient = () => {
  return {
    handler: {
      handleNotFoundResponse,
      handleResponseError
    },
    utils: {
      isFormDisabled,
      createSkeleton,
      // createFlickerProtectRef
    }
  }
}
