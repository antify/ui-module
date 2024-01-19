import {type Car} from "../../../../glue/plugins/car";

export default defineEventHandler(async (event) => {
  let cars = (await useStorage<Car[]>('db').getItem('cars')) || []
  const itemsPerPage = getQuery(event)?.ipp || 20
  const page = getQuery(event)?.p || 1
  const search = getQuery(event)?.search || null

  cars.sort((a, b) => a.manufacturer < b.manufacturer ? -1 : 1)

  if (search) {
    cars = cars.filter(car => Object.values(car).join(' ').toLowerCase().includes(search.toLowerCase()))
  }

  return {
    count: cars.length,
    cars: cars
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map(car => ({
        id: car.id,
        model: car.model,
        manufacturer: car.manufacturer,
        type: car.type,
        color: car.color,
      }))
  }
})
