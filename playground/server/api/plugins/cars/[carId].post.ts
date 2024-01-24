import {type Car, validator} from "../../../../glue/plugins/car";
import {faker} from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const body = validator.validate(await readBody(event), 'server-post');

  if (validator.hasErrors()) {
    throw new Error(validator.getErrorsAsString());
  }

  const storage = useStorage('db');
  const cars = (await storage.getItem<Car[]>('cars')) || [];
  const newCar = {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...body
  }

  cars.push(newCar)

  await storage.setItem('cars', cars);

  return newCar;
})
