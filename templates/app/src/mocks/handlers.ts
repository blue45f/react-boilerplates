import { http, HttpResponse, delay } from 'msw';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const apiBase = import.meta.env?.VITE_API_URL ?? '/api';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('_limit')) || 10;
    const page = Number(url.searchParams.get('_page')) || 1;
    const offset = (page - 1) * limit;
    const total = 60;
    const start = offset;
    const end = Math.min(offset + limit, total);

    const posts = Array.from({ length: Math.max(0, end - start) }, (_, i) => {
      const id = start + i + 1;
      return {
        id,
        title: `게시글 제목 ${id}`,
        body: `이것은 게시글 ${id}의 내용입니다. MSW로 모킹된 데이터로, 페이지네이션과 검색이 동작합니다.`,
        userId: ((id - 1) % 10) + 1,
      };
    });

    return HttpResponse.json(posts);
  }),

  http.post(`${apiBase}/contact`, async ({ request }) => {
    const payload = (await request.json()) as ContactPayload;
    await delay(400);

    if (!payload?.email || !payload.email.includes('@')) {
      return HttpResponse.json({ message: '유효한 이메일이 필요합니다.' }, { status: 400 });
    }

    return HttpResponse.json({
      id: `msg_${Date.now()}`,
      status: 'ok' as const,
    });
  }),
];
