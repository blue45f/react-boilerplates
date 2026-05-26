import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import useFetch from './useFetch'

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function mockOk<T>(payload: T) {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(payload),
  } as unknown as Response
}

function mockFail(status = 500, statusText = 'Server Error') {
  return {
    ok: false,
    status,
    statusText,
    json: () => Promise.resolve({}),
  } as unknown as Response
}

describe('useFetch', () => {
  it('starts in idle when not enabled', () => {
    const { result } = renderHook(() => useFetch('/x', { enabled: false }))
    expect(result.current.status).toBe('idle')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('transitions to success and exposes data', async () => {
    fetchMock.mockResolvedValue(mockOk({ hello: 'world' }))
    const { result } = renderHook(() => useFetch<{ hello: string }>('/api'))

    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.data).toEqual({ hello: 'world' })
    expect(result.current.error).toBeNull()
  })

  it('transitions to error on non-2xx', async () => {
    fetchMock.mockResolvedValue(mockFail(404, 'Not Found'))
    const { result } = renderHook(() => useFetch('/api'))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toContain('HTTP 404')
  })

  it('transitions to error on network error', async () => {
    fetchMock.mockRejectedValue(new Error('network down'))
    const { result } = renderHook(() => useFetch('/api'))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('network down')
  })

  it('uses fallback error message for non-Error rejection', async () => {
    fetchMock.mockRejectedValue('nope')
    const { result } = renderHook(() => useFetch('/api'))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('요청 중 오류가 발생했습니다.')
  })

  it('aborts the in-flight request on unmount and does not transition to error', async () => {
    let abortedSignal: AbortSignal | undefined
    fetchMock.mockImplementation((_url: string, init?: RequestInit) => {
      abortedSignal = init?.signal ?? undefined
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'))
        })
      })
    })

    const { result, unmount } = renderHook(() => useFetch('/api'))

    await waitFor(() => expect(result.current.status).toBe('loading'))
    expect(abortedSignal).toBeDefined()
    expect(abortedSignal!.aborted).toBe(false)

    unmount()

    expect(abortedSignal!.aborted).toBe(true)
    // Give the rejected promise a tick to settle; status must NOT become 'error'
    await new Promise((r) => setTimeout(r, 0))
    expect(result.current.status).not.toBe('error')
    expect(result.current.error).toBeNull()
  })

  it('refetch triggers a new fetch', async () => {
    fetchMock.mockResolvedValue(mockOk({ n: 1 }))
    const { result } = renderHook(() => useFetch('/api'))

    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(fetchMock).toHaveBeenCalledTimes(1)

    fetchMock.mockResolvedValue(mockOk({ n: 2 }))
    await act(async () => {
      await result.current.refetch()
    })

    await waitFor(() => expect(result.current.data).toEqual({ n: 2 }))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
