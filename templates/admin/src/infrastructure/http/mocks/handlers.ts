import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/mock/admin-users', ({ request }) => {
    const url = new URL(request.url);

    return HttpResponse.json({
      source: 'msw',
      role: url.searchParams.get('role') ?? 'admin',
    });
  }),

  http.post('*/api/mock/admin-users', async ({ request }) => {
    const body = (await request.json()) as { email?: string };

    return HttpResponse.json(
      {
        id: 'admin_1',
        email: body.email,
      },
      { status: 201 }
    );
  }),
];
