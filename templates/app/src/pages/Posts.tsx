import {
  Badge,
  Box,
  Button,
  Card,
  Drawer,
  EmptyState,
  HStack,
  IconButton,
  Input,
  InputGroup,
  NativeSelect,
  Portal,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { FileSearch, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useDebounce } from '@/hooks/useDebounce';
import { useInfinitePosts } from '@/hooks/usePosts';
import type { Post } from '@/hooks/usePosts';

type SortKey = 'newest' | 'title-asc' | 'title-desc';

function PostsSkeleton() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card.Root key={i} variant="outline">
          <Card.Body>
            <Stack gap="3">
              <Skeleton height="6" width="80%" />
              <Skeleton height="3" />
              <Skeleton height="3" width="60%" />
            </Stack>
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}

function Posts() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [selected, setSelected] = useState<Post | null>(null);
  const debouncedSearch = useDebounce(search, 250);

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePosts(6);

  const posts = useMemo(() => {
    const all = data?.pages.flat() ?? [];
    const filtered = debouncedSearch
      ? all.filter(
          (p) =>
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.body.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : all;
    const sorted = [...filtered];
    if (sort === 'title-asc') sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'title-desc') sorted.sort((a, b) => b.title.localeCompare(a.title));
    else sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }, [data, debouncedSearch, sort]);

  return (
    <>
      <Helmet>
        <title>게시글 - React App</title>
        <meta
          name="description"
          content="TanStack Query 무한 스크롤, 검색, 필터, 모달 디테일을 보여주는 데모"
        />
      </Helmet>

      <Stack gap="6">
        <Stack gap="2">
          <Heading as="h1" size="2xl">
            게시글
          </Heading>
          <Text color="fg.muted">
            TanStack Query 무한 스크롤 + 검색 + 정렬 + 디테일 Drawer 데모 (JSONPlaceholder, MSW
            모킹).
          </Text>
        </Stack>

        <Stack direction={{ base: 'column', md: 'row' }} gap="3">
          <Box flex="1">
            <InputGroup
              startElement={<Search size={16} aria-hidden="true" />}
              endElement={
                search ? (
                  <IconButton
                    size="xs"
                    variant="ghost"
                    aria-label="검색어 지우기"
                    onClick={() => setSearch('')}
                  >
                    <X size={14} aria-hidden="true" />
                  </IconButton>
                ) : undefined
              }
            >
              <Input
                placeholder="제목 또는 내용 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="게시글 검색"
              />
            </InputGroup>
          </Box>
          <NativeSelect.Root width={{ base: 'full', md: '48' }}>
            <NativeSelect.Field
              aria-label="정렬"
              value={sort}
              onChange={(e) => setSort(e.currentTarget.value as SortKey)}
            >
              <option value="newest">최신순</option>
              <option value="title-asc">제목 오름차순</option>
              <option value="title-desc">제목 내림차순</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Stack>

        {isLoading && <PostsSkeleton />}

        {isError && (
          <Box p="4" borderRadius="md" borderWidth="1px" borderColor="red.muted" bg="red.subtle">
            <Stack gap="3">
              <Text color="red.fg" fontWeight="medium">
                데이터를 불러오는 중 오류가 발생했습니다
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {(error as Error)?.message ?? '알 수 없는 오류'}
              </Text>
              <Box>
                <Button size="sm" onClick={() => refetch()}>
                  다시 시도
                </Button>
              </Box>
            </Stack>
          </Box>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <FileSearch size={32} aria-hidden="true" />
              </EmptyState.Indicator>
              <EmptyState.Title>검색 결과가 없습니다</EmptyState.Title>
              <EmptyState.Description>다른 키워드로 검색해 보세요.</EmptyState.Description>
            </EmptyState.Content>
          </EmptyState.Root>
        )}

        {posts.length > 0 && (
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
              {posts.map((post) => (
                <Card.Root
                  key={post.id}
                  variant="outline"
                  cursor="pointer"
                  onClick={() => setSelected(post)}
                  _hover={{ borderColor: 'brand.solid', transform: 'translateY(-2px)' }}
                  transition="all 0.15s"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(post);
                    }
                  }}
                  aria-label={`게시글 열기: ${post.title}`}
                >
                  <Card.Body>
                    <Stack gap="2">
                      <HStack justify="space-between">
                        <Badge variant="subtle" colorPalette="brand">
                          #{post.id}
                        </Badge>
                        <Text fontSize="xs" color="fg.subtle">
                          user {post.userId}
                        </Text>
                      </HStack>
                      <Heading as="h2" size="md" lineClamp={1}>
                        {post.title}
                      </Heading>
                      <Text color="fg.muted" fontSize="sm" lineClamp={2}>
                        {post.body}
                      </Text>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>

            <HStack justify="center">
              <Button
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
                variant="outline"
              >
                {hasNextPage ? '더 보기' : '마지막 페이지입니다'}
              </Button>
            </HStack>
          </>
        )}
      </Stack>

      <Drawer.Root
        open={selected !== null}
        onOpenChange={(e) => !e.open && setSelected(null)}
        size="md"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth="1px" borderColor="border">
                <Drawer.Title>게시글 #{selected?.id}</Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <IconButton aria-label="닫기" variant="ghost" size="sm">
                    <X size={18} aria-hidden="true" />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                {selected && (
                  <Stack gap="4">
                    <Heading as="h2" size="lg">
                      {selected.title}
                    </Heading>
                    <Badge variant="subtle">User {selected.userId}</Badge>
                    <Text color="fg.muted" whiteSpace="pre-line">
                      {selected.body}
                    </Text>
                  </Stack>
                )}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}

export default Posts;
