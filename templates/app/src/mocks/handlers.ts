import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('_limit')) || 10;

    const posts = Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      title: `게시글 제목 ${i + 1}`,
      body: `이것은 게시글 ${i + 1}의 내용입니다. MSW로 모킹된 데이터입니다.`,
      userId: 1,
    }));

    return HttpResponse.json(posts);
  }),
];
