import {type Car, validator} from "../../../../../../glue/plugins/car";
import {faker} from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const carIdToDuplicate = event.context.params.carId;

  const storage = useStorage('db');
  const cars = (await storage.getItem<Car[]>('cars')) || [];
  const index = cars.findIndex((car) => car.id === carIdToDuplicate);

  if (index === -1) {
    return {
      notFound: true
    }
  }

  const newCar = {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...cars[index]
  }

  cars.push(newCar);

  await storage.setItem('cars', cars);

  return {id: newCar.id};
});
