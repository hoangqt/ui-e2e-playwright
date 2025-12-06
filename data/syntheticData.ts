import { faker } from "@faker-js/faker";

export function generateUser(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
    ...overrides,
  };
}

export function generateAddress(overrides = {}) {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    postalCode: faker.location.zipCode(),
    ...overrides,
  };
}
