import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('*/api/mock/profile', ({ request }) => {
    const url = new URL(request.url)

    return HttpResponse.json({
      source: 'msw',
      q: url.searchParams.get('q'),
    })
  }),

  http.post('*/api/mock/profile', async ({ request }) => {
    const body = (await request.json()) as { name?: string }

    return HttpResponse.json(
      {
        id: 'profile_1',
        name: body.name,
      },
      { status: 201 }
    )
  }),
]
