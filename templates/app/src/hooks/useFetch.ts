import { useState, useEffect, useCallback, useRef } from 'react'

import type { AsyncStatus } from '@/types/index'

interface UseFetchOptions extends RequestInit {
  enabled?: boolean
}

interface UseFetchResult<T> {
  data: T | null
  status: AsyncStatus
  error: string | null
  refetch: () => void
}

function useFetch<T>(url: string, options: UseFetchOptions = {}): UseFetchResult<T> {
  const { enabled = true, ...fetchOptions } = options
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const fetchOptionsRef = useRef(fetchOptions)

  useEffect(() => {
    fetchOptionsRef.current = fetchOptions
  })

  const fetchData = useCallback(async () => {
    if (!enabled) return

    // Abort any in-flight request before starting a new one
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus('loading')
    setError(null)

    try {
      const response = await fetch(url, { ...fetchOptionsRef.current, signal: controller.signal })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const json = (await response.json()) as T
      setData(json)
      setStatus('success')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }
      const message = err instanceof Error ? err.message : '요청 중 오류가 발생했습니다.'
      setError(message)
      setStatus('error')
    }
  }, [url, enabled])

  useEffect(() => {
    const handle = queueMicrotask(() => {
      void fetchData()
    })
    return () => {
      // queueMicrotask is not cancelable; the abort handles in-flight requests
      void handle
      abortRef.current?.abort()
    }
  }, [fetchData])

  return { data, status, error, refetch: fetchData }
}

export default useFetch
