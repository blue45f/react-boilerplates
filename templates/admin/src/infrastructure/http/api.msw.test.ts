import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import api, { ApiError } from './api';
import { server } from './mocks/server';

describe('admin api MSW integration', () => {
  it('uses the real fetch pipeline while MSW provides the response contract', async () => {
    const result = await api.get<{ source: string; role: string }>('/mock/admin-users', {
      params: { role: 'editor' },
    });

    expect(result.status).toBe(200);
    expect(result.data).toEqual({ source: 'msw', role: 'editor' });
  });

  it('serializes request bodies through the MSW handler', async () => {
    const result = await api.post<{ id: string; email: string }>('/mock/admin-users', {
      email: 'admin@example.com',
    });

    expect(result.status).toBe(201);
    expect(result.data).toEqual({ id: 'admin_1', email: 'admin@example.com' });
  });

  it('keeps HTTP failures as ApiError with the mocked status code', async () => {
    server.use(
      http.get('*/api/mock/admin-users', () =>
        HttpResponse.json({ message: 'forced failure' }, { status: 502 })
      )
    );

    await expect(api.get('/mock/admin-users')).rejects.toMatchObject({
      name: 'ApiError',
      status: 502,
    } satisfies Partial<ApiError>);
  });
});
