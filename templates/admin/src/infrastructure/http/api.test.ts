import { beforeEach, describe, expect, it, vi } from 'vitest';

import api, { ApiError, addRequestInterceptor, addResponseInterceptor } from './api';

function getRequestMeta(spy: { mock: { calls: unknown[][] } }, index = 0) {
  const [input, init] = spy.mock.calls[index] as [unknown, RequestInit | undefined];
  const request = input instanceof Request ? input : undefined;

  return {
    url:
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : (request?.url ?? ''),
    method: (init?.method ?? request?.method) as string | undefined,
    headers: init?.headers ?? request?.headers,
    init,
  };
}

describe('admin api', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('GET 요청을 보낸다', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 1, name: 'test' }), { status: 200 })
      );

    const result = await api.get('/users/1');

    expect(result.data).toEqual({ id: 1, name: 'test' });
    expect(result.status).toBe(200);
    expect(getRequestMeta(fetchSpy).method).toBe('GET');
  });

  it('POST 요청을 보낸다', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 2 }), { status: 201 }));

    const result = await api.post('/users', { name: 'new' });

    expect(result.data).toEqual({ id: 2 });
    expect(getRequestMeta(fetchSpy).method).toBe('POST');
  });

  it('HTTP 에러를 ApiError로 변환한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(null, { status: 404 }));

    await expect(api.get('/not-found')).rejects.toThrow(ApiError);
  });

  it('네트워크 에러를 처리한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(api.get('/fail')).rejects.toThrow(ApiError);
  });

  it('쿼리 파라미터를 추가한다', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 }));

    await api.get('/users', { params: { page: '1', limit: '10' } });
    expect(getRequestMeta(fetchSpy).url).toContain('page=1&limit=10');
  });

  it('요청 인터셉터를 실행한다', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }));

    const remove = addRequestInterceptor((config) => ({
      ...config,
      headers: { ...(config.headers as Record<string, string>), 'X-Custom': 'test' },
    }));

    await api.get('/test');

    const headers = getRequestMeta(fetchSpy).headers as HeadersInit | undefined;
    const headerRecord =
      headers instanceof Headers ? Object.fromEntries(headers.entries()) : headers;
    expect(headerRecord).toEqual(
      expect.objectContaining({
        'x-custom': 'test',
      })
    );

    remove();
  });

  it('응답 인터셉터를 실행한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    const interceptor = vi.fn((response: Response) => response);
    const remove = addResponseInterceptor(interceptor);

    await api.get('/test');

    expect(interceptor).toHaveBeenCalled();
    remove();
  });

  it('204 No Content 응답은 data: null을 반환한다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(null, { status: 204 }));

    const result = await api.delete('/users/1');
    expect(result.status).toBe(204);
    expect(result.data).toBeNull();
  });

  it('ApiError 인스턴스의 이름은 "ApiError" 이다', () => {
    const error = new ApiError(404, 'not found');
    expect(error.name).toBe('ApiError');
    expect(error.status).toBe(404);
  });
});
