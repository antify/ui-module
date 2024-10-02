/**
 * Set of helper functions for client side
 */
import type {FetchResponse, FetchError} from 'ofetch';
import {
  type LocationQuery,
  type RouteLocationRaw,
  type LocationQueryRaw,
  type RouteParams
} from '#vue-router';
import {
  useNuxtApp,
  navigateTo,
  createError,
  type Ref,
  useRouter,
  useRoute,
  computed,
  reactive
} from '#imports';
import {InputState} from '@antify/ui'

async function handleNotFoundResponse(response: FetchResponse, fallbackUrl: RouteLocationRaw) {
  if (response._data?.notFound) {
    useNuxtApp().$uiModule.toaster.toastError('Entity not found. Maybe an other user deleted it.');

    await navigateTo(fallbackUrl);
  }
}

function handleResponseError(error: Ref<FetchError | null>) {
  if (error.value) {
    throw createError({...error.value?.data, statusCode: 500, fatal: true});
  }
}

function isFormDisabled(status: Ref | Ref[]): boolean {
  if (Array.isArray(status)) {
    return status.some((status) => isFormDisabled(status));
  }

  return status.value === 'pending';
}

/**
 * Detect if the given queryToWatch changed.
 */
function queryChanged(from: LocationQuery, to: LocationQuery, queryToWatch: string | string[]): boolean {
  const _queryToWatch = Array.isArray(queryToWatch) ? queryToWatch : [queryToWatch];
  const changes = Object.keys(to).reduce((acc, key) => {
    if (to[key] !== from[key]) {
      acc[key] = to[key];
    }

    return acc;
  }, {});

  return _queryToWatch.some((key) => changes[key] !== undefined);
}

export type CrudRoutingOptions = {
  detailRouteName: string
  listingRouteName: string
  getDetailRouteParams?: () => RouteParams,
  getListingRouteParams?: () => RouteParams,
  entityIdentifier?: string
  createEntityIdentifier?: string
}

const useCrudRouting = (
  detailRouteName: string,
  listingRouteName: string,
  getDetailRouteParams: () => RouteParams = () => ({}),
  getListingRouteParams: () => RouteParams = () => ({}),
  entityIdentifier: string = 'entityId',
  createEntityIdentifier: string = 'create'
) => {
  const route = useRoute();
  const router = useRouter();
  const isDetailPage = computed<boolean>(() => {
    // Use includes, because for example for detail pace users-userId, users-userId-engine is a detail page too.
    // TODO:: foo-{detailRouteName}-bar would be valid too. Only {detailRouteName}-* should be valid.
    return (route.name as string | undefined)?.includes(detailRouteName || '') || false;
  });

  return {
    isListingPage: computed<boolean>(() => route.name === listingRouteName),
    isDetailPage,
    isUpdatePage: computed<boolean>(() =>
      isDetailPage.value &&
      route.params[entityIdentifier] !== createEntityIdentifier),
    isCreatePage: computed<boolean>(() =>
      isDetailPage.value &&
      route.params[entityIdentifier] === createEntityIdentifier),
    getDetailRoute(entityId: string | string[], query: LocationQueryRaw = route.query) {
      return {
        name: detailRouteName,
        params: {
          ...getDetailRouteParams(),
          [entityIdentifier]: entityId
        },
        query
      };
    },
    getDetailSubRoute(
      entityId: string | string[],
      subRouteNameExtension: string,
      query: LocationQueryRaw = route.query
    ) {
      return {
        name: `${detailRouteName}-${subRouteNameExtension}`,
        params: {
          ...getDetailRouteParams(),
          [entityIdentifier]: entityId
        },
        query
      };
    },
    getListingRoute(query: LocationQueryRaw = route.query) {
      return {
        name: listingRouteName,
        params: getListingRouteParams(),
        query
      };
    },
    getEntityId() {
      const entityId = route.params[entityIdentifier];

      if (entityId === undefined) {
        throw new Error(`Entity identifier "${entityIdentifier}" is not set in route.params. Make sure you set it in route ` +
          'and this function is called on a detail page.');
      }

      return entityId;
    },
    // TODO:: use the given query and merge it into route.query
    goToListingPage(query: LocationQueryRaw = route.query) {
      return router.push(this.getListingRoute(query));
    },
    goToDetailPage(
      entityId: string | string[] = 'create',
      query = route.query
    ) {
      return router.push(this.getDetailRoute(entityId, query));
    },
    goToDetailSubPage(subRouteNameExtension: string, query: LocationQueryRaw = route.query) {
      return router.push(this.getDetailSubRoute(subRouteNameExtension, query));
    }
  };
};

export type FormFieldType = {
  errors: string[];
  state: InputState;
  validate: () => Promise<void>;
}

/**
 * Yup validation throws an error if the value expect not the given schema.
 * This function creates a wrapper around it, to easily use it with antify ui components.
 */
export function useFormField(validationFn: () => Promise<void>) {
  const _reactive = reactive({
    errors: [],
    state: InputState.base,
    async validate() {
      try {
        await validationFn();

        _reactive.errors = [];
        _reactive.state = InputState.base;
      } catch (e) {
        if (e?.name !== 'ValidationError') {
          throw e;
        }

        _reactive.errors = e?.errors || [];
        _reactive.state = InputState.danger;
      }
    }
  });

  return _reactive;
}

type GroupedForm = Record<string, FormFieldType[]>;

export function useGroupedForm<T extends GroupedForm>(form: T) {
  return {

  }
}

export const useUiClient = () => {
  return {
    handler: {
      handleNotFoundResponse,
      handleResponseError
    },
    utils: {
      isFormDisabled,
      queryChanged,
      useCrudRouting,
      useFormField
    }
  };
};
