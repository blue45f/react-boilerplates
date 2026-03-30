import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10000,
  retry: { limit: 1 },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response) {
          const body = await response.json().catch(() => null);
          error.message = (body as { message?: string })?.message ?? response.statusText;
        }
        return error;
      },
    ],
  },
});
