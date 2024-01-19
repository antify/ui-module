import {useFetch} from "nuxt/app";
import {computed, reactive, ref} from "vue";
import {type Car, validator} from "../glue/plugins/car";

export default defineNuxtPlugin((nuxtApp) => {
  const count = ref(0)
  const query = computed(() => useRoute().query)
  const router = useRouter();
  const route = useRoute();
  const uiClient = useUiClient()

  const getDefaultData = (): Car => ({
    id: null,
    model: null,
    manufacturer: null,
    type: null,
    color: null,
    engine: {
      type: null,
      volumeInLiter: null,
      powerPs: null,
    }
  })
  const car = ref(getDefaultData())

  const {
    data,
    error,
    execute,
    refresh,
    pending,
    status
  } = useFetch(
    `/api/plugins/cars/cars`,
    {
      immediate: false,
      watch: false,
      query,
      onResponse({response}) {
        if (response.status === 200) {
          count.value = response._data.count
        }
      }
    }
  )
  const refreshCars = async (resetPageQuery = true, pageQuery = 'p') => {
    if (resetPageQuery) {
      const query = {...route.query}

      delete query[pageQuery]

      await router.push({
        ...route,
        query
      })
    }

    await refresh();
  }
  const {
    error: detailError,
    pending: pendingDetail,
    execute: executeDetail,
  } = useFetch(
    () => `/api/plugins/cars/${route.params.carId}`,
    {
      immediate: false,
      watch: false,
      async onResponse({response}) {
        await uiClient.handler.handleNotFoundResponse(response, '/cars')

        if (response.status === 200) {
          car.value = response._data
        }
      }
    }
  )
  const {
    error: updateError,
    status: updateStatus,
    execute: executeUpdate,
  } = useFetch(
    () => `/api/plugins/cars/${route.params.carId}`,
    {
      method: "put",
      body: car,
      immediate: false,
      watch: false,
      async onResponse({response}) {
        await uiClient.handler.handleNotFoundResponse(response, '/cars')

        if (response.status === 200) {
          car.value = response._data
        }
      }
    }
  )
  const {
    error: createError,
    status: createStatus,
    execute: executeCreate,
  } = useFetch(
    () => `/api/plugins/cars/${route.params.carId}`,
    {
      method: "post",
      body: car,
      immediate: false,
      watch: false,
      async onResponse({response}) {
        await uiClient.handler.handleNotFoundResponse(response, '/cars')

        if (response.status === 200) {
          car.value = response._data

          router.replace({
            name: route.name,
            params: {
              carId: car.value.id
            },
            query: route.query
          });
        }
      }
    }
  )
  const entryIdToDelete = ref<string | null>(null)
  const {
    error: deleteError,
    execute: _executeDelete,
    status: deleteStatus,
  } = useFetch(
    () => `/api/plugins/cars/${entryIdToDelete.value}`,
    {
      method: 'delete',
      immediate: false,
      watch: false,
      onResponse({response}) {
        if (response.status === 200) {
          routing.goToListingPage();
          refreshCars(false);
          nuxtApp.$uiModule.toaster.toastDeleted();
        }
      }
    }
  )
  const executeDelete = (id: string) => {
    entryIdToDelete.value = id

    return _executeDelete()
  }
  const isCreateContext = computed<boolean>(() => route.params.carId === 'create')
  const formDisabled = computed(() => uiClient.utils.isFormDisabled([updateStatus, createStatus, deleteStatus]))
  const _validator = reactive(validator)
  const save = async () => {
    _validator.validate(car.value, isCreateContext.value ? 'client-post' : 'client-put')

    if (_validator.hasErrors()) {
      return nuxtApp.$uiModule.toaster.toastInfo('The form contains errors.\nPlease fix them before submitting.')
    }

    // If the user press enter fast time twice, prevent a second submit
    if (formDisabled.value) {
      return
    }

    if (isCreateContext.value) {
      await executeCreate()
    } else {
      await executeUpdate()
    }

    // TODO:: on error
    nuxtApp.$uiModule.toaster.toastUpdated()
  }
  const carId = computed(() => route.params.carId)
  const routing = {
    goToListingPage: () => router.push(routing.getListingRoute()),
    goToDetailPage: () => router.push(routing.getDetailRoute()),
    getListingRoute: () => ({name: 'cars', query: query.value}),
    getDetailRoute: (carId = 'create') => ({
      name: 'cars-carId',
      params: {carId},
      query: route.query
    })
  }

  return {
    provide: {
      cars: {
        routing,
        listing: {
          data,
          execute,
          error,
          pending,
          skeleton: uiClient.utils.createSkeleton(pending),
          refresh: refreshCars,
          status,
          count
        },
        item: {
          data: car,
          error: detailError,
          execute: executeDetail,
          pending: pendingDetail,
          formDisabled,
          save,
          saveAndNew: async () => {
            await save();

            await router.push({
              name: 'cars-carId',
              params: {
                carId: 'create'
              },
              query: route.query
            })
          },
          skeleton: computed(() => !isCreateContext.value ? pendingDetail.value : false),
          resetData: () => {
            _validator.reset()

            car.value = getDefaultData()
          },
          validator: _validator,
          isCreateContext,
          executeDelete,
          deleteStatus,
          deleteError,
          createError,
          updateError
        }
      },
    }
  }
});


