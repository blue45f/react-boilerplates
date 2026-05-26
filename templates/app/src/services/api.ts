const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type RequestInterceptor = (config: RequestInit & { url: string }) => RequestInit & { url: string }
type ResponseInterceptor = (response: Response) => Response | Promise<Response>

const requestInterceptors: RequestInterceptor[] = []
const responseInterceptors: ResponseInterceptor[] = []

function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor)
  return () => {
    const index = requestInterceptors.indexOf(interceptor)
    if (index > -1) requestInterceptors.splice(index, 1)
  }
}

function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor)
  return () => {
    const index = responseInterceptors.indexOf(interceptor)
    if (index > -1) responseInterceptors.splice(index, 1)
  }
}

function serializeBody(body: unknown) {
  return body === undefined ? undefined : JSON.stringify(body)
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options

  let url = `${API_BASE_URL}${endpoint}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  let config: RequestInit & { url: string } = {
    ...fetchOptions,
    url,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  }

  for (const interceptor of requestInterceptors) {
    config = interceptor(config)
  }

  const { url: finalUrl, ...finalOptions } = config

  try {
    let response = await fetch(finalUrl, finalOptions)

    for (const interceptor of responseInterceptors) {
      response = await interceptor(response)
    }

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return { data: null as T, status: response.status }
    }

    const data = await response.json()

    return {
      data,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error')
  }
}

export const api = {
  get<T>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: serializeBody(body),
    })
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: serializeBody(body),
    })
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: serializeBody(body),
    })
  },

  delete<T>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: 'DELETE' })
  },
}

export { ApiError, addRequestInterceptor, addResponseInterceptor }
export default api
