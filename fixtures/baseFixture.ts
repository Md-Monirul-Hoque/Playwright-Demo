// fixtures/baseFixture.ts
import { test as base, expect } from '@playwright/test';
import { ReqResClient } from '../api/clients/reqresClient';
import { JSONPlaceholderClient } from '../api/clients/jsonPlaceholderClient';

type ApiFixtures = {
  reqresClient: ReqResClient;
  jsonClient: JSONPlaceholderClient;
};

export const test = base.extend<ApiFixtures>({
  reqresClient: async ({ request }, use) => {
    await use(new ReqResClient(request));
  },

  jsonClient: async ({ request }, use) => {
    await use(new JSONPlaceholderClient(request));
  },
});

export { expect };