import { test, expect } from '../../../fixtures/baseFixture';

test.describe('JSONPlaceholder - Posts API', () => {

  test('@api @json should fetch all posts', async ({ jsonClient }) => {

    const response = await jsonClient.getPosts();

    console.log('STATUS:', response.status());

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  test('@api @json should fetch single post', async ({ jsonClient }) => {

    const response = await jsonClient.getPostById(1);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
  });

  test('@api @json should create a post', async ({ jsonClient }) => {

    const payload = {
      title: 'Playwright Test',
      body: 'API automation learning',
      userId: 1
    };

    const response = await jsonClient.createPost(payload);

    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.title).toBe(payload.title);
  });

});