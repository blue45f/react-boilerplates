import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { mockApi, type AdminUser } from '@/infrastructure/mock';

const KEY = ['users'] as const;

export function useUsers() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => mockApi.listUsers(),
  });
}

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => (id ? mockApi.getUser(id) : Promise.resolve(undefined)),
    enabled: Boolean(id),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Omit<AdminUser, 'id' | 'createdAt' | 'lastLoginAt'>) =>
      mockApi.createUser(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<AdminUser> }) =>
      mockApi.updateUser(id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mockApi.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEY });
    },
  });
}
