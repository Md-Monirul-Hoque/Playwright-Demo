import { test, expect } from '../../../fixtures/baseFixture';

test.describe('ReqRes - Products API', () => {

  test('@api should fetch products list', async ({ reqresClient }) => {
    const response = await reqresClient.getProducts();

    const body = await response.json();

    console.log('STATUS:', response.status());
    console.log('BODY:', body);

    expect(response.status()).toBe(200);
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();

    // 🔥 stronger validation
    expect(body.meta).toBeDefined();
    expect(body.meta.total).toBeGreaterThan(0);
  });

  test('@api should create a product', async ({ reqresClient }) => {
    const payload = {
      name: 'Playwright Product',
      price: 150
    };

    const response = await reqresClient.createProduct(payload);

    const body = await response.json();

    console.log('STATUS:', response.status());
    console.log('BODY:', body);

    expect(response.status()).toBe(201);

    // ✅ proper validation (important)
    expect(body.data).toBeDefined();
    expect(body.data.data.name).toBe(payload.name);
    expect(body.data.data.price).toBe(payload.price);
  });

  test('@api negative - should fail without API key', async ({ request }) => {
    const url = `${process.env.API_BASE_URL}/collections/products/records?project_id=${process.env.REQRES_PROJECT_ID}`;

    const response = await request.get(url);

    const bodyText = await response.text();

    console.log('STATUS:', response.status());
    console.log('BODY:', bodyText);

    // ✅ precise validation
    expect(response.status()).toBe(401);
  });

});