// tests/api/users/create-user.api.spec.ts
import { test, expect } from '../../../fixtures/baseFixture';

test('POST /users - create user', async ({ reqresClient }) => {

  const payload = {
    name: 'monir',
    job: 'qa engineer'
  };

  const response = await reqresClient.createUser(payload);

  expect(response.status()).toBe(201);

  const body = await response.json();

  const response = await reqresClient.getUsers(2);

console.log('STATUS:', response.status());
console.log('BODY:', await response.text());

console.log(process.env.API_BASE_URL);
console.log(process.env.REQRES_API_KEY);

  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
  expect(body.id).toBeDefined();
});