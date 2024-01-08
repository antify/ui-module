import {type Car, validator} from "../../../../glue/plugins/car";
import {faker} from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const body = validator.validate(await readBody(event));

  if (validator.hasErrors()) {
    throw new Error(validator.getErrorsAsString());
  }

  const storage = useStorage('db');
  const cars = (await storage.getItem<Car[]>('cars')) || [];
  const id = faker.string.uuid();

  cars[id] = {
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...body
  };

  console.log(cars[id]);

  await storage.setItem('cars', cars);

  return cars[id];
})
