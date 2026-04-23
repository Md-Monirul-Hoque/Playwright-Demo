// tests/api/users/get-users.api.spec.ts
import { test, expect } from '../../../fixtures/baseFixture';

test.describe('GET /users', () => {

  test('should return list of users', async ({ reqresClient }) => {

    // Debug: environment variables
    console.log('BASE URL:', process.env.API_BASE_URL);
    console.log('API KEY:', process.env.REQRES_API_KEY);

    // API call
    const response = await reqresClient.getUsers(2);

    // Debug response
    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    // Assertions
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.page).toBe(2);
  });

});