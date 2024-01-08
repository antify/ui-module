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
    `/api/components/car/car-table/cars`, // TODO:: <-- rename
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
  const skeleton = uiClient.utils.createSkeleton(pending)

  const {
    error: detailError,
    pending: pendingDetail,
    execute: executeDetail,
  } = useFetch(
    () => `/api/pages/cars/[carId]/index/${route.params.carId}`,
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
          car.value = getDefaultData()
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

          // router.push({
          //   name: 'cars-carId',
          //   params: {
          //     carId: car.value.id
          //   },
          //   query: route.query
          // })
        }
      }
    }
  )
  const isCreateContext = computed<boolean>(() => route.params.carId === 'create')
  const formDisabled = computed(() => uiClient.utils.isFormDisabled(updateStatus))
  const validatorRef = reactive(validator)
  const save = async () => {
    validator.validate(car.value)

    if (validator.hasErrors()) {
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

  const crud = {
    table: {

    },
    item: {
      data: car,
      formDisabled,
      skeleton: computed(() => !isCreateContext.value ? pendingDetail.value : false),
      resetData: () => {
        validatorRef.reset()

        car.value = getDefaultData()
      },
      validator: validatorRef,
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
      }
    }
  }

  return {
    provide: {
      cars: crud,

      create: {

      },
      carTable: {
        data,
        error,
        execute,
        refresh: async (resetPageQuery = true, pageQuery = 'p') => {
          // If not the page query changed, reset the page to one.
          if (resetPageQuery) {
            const query = {...route.query}

            delete query[pageQuery]

            await router.push({
              ...route,
              query
            })
          }

          refresh();
        },
        pending,
        status,
        count,
        skeleton
      },
      car: {
        data: car,
        error: detailError,
        execute: executeDetail,
        pending: pendingDetail
      },
      updateCar: {
        error: updateError,
        status: updateStatus,
        formDisabled,
        validator: reactive(validator),
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
        }
      }
    }
  }
});


