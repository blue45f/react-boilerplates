import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import api, { ApiError } from './api'

import { server } from '@/test/mocks/server'

describe('api MSW integration', () => {
  it('uses the real fetch pipeline while MSW provides the response contract', async () => {
    const result = await api.get<{ source: string; q: string | null }>('/mock/profile', {
      params: { q: 'react' },
    })

    expect(result.status).toBe(200)
    expect(result.data).toEqual({ source: 'msw', q: 'react' })
  })

  it('serializes request bodies through the MSW handler', async () => {
    const result = await api.post<{ id: string; name: string }>('/mock/profile', {
      name: '희준',
    })

    expect(result.status).toBe(201)
    expect(result.data).toEqual({ id: 'profile_1', name: '희준' })
  })

  it('keeps HTTP failures as ApiError with the mocked status code', async () => {
    server.use(
      http.get('*/api/mock/profile', () =>
        HttpResponse.json({ message: 'forced failure' }, { status: 503 })
      )
    )

    await expect(api.get('/mock/profile')).rejects.toMatchObject({
      name: 'ApiError',
      status: 503,
    } satisfies Partial<ApiError>)
  })
})
