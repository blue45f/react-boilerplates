import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toaster } from '@/components/ui/toaster';
import { api } from '@/lib/api';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(30, '이름은 최대 30자까지 가능합니다'),
  email: z.string().email('올바른 이메일 주소를 입력해 주세요'),
  message: z
    .string()
    .min(10, '메시지는 최소 10자 이상이어야 합니다')
    .max(1000, '메시지는 최대 1000자까지 가능합니다'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

async function submitContact(values: ContactFormValues) {
  return api.post('contact', { json: values }).json<{ id: string; status: 'ok' }>();
}

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await submitContact(values);
      toaster.success({
        title: '문의가 접수되었습니다',
        description: '빠른 시일 내에 답변드리겠습니다.',
        duration: 4000,
        closable: true,
      });
      reset();
    } catch (error) {
      toaster.error({
        title: '전송 실패',
        description: error instanceof Error ? error.message : '잠시 후 다시 시도해 주세요.',
        duration: 5000,
        closable: true,
      });
    }
  });

  return (
    <>
      <Helmet>
        <title>문의 - React App</title>
        <meta
          name="description"
          content="react-hook-form + zod 검증과 MSW 모킹을 결합한 문의 폼 데모"
        />
      </Helmet>

      <Stack gap="6" maxW="2xl" mx="auto">
        <Stack gap="2">
          <Heading as="h1" size="2xl">
            문의하기
          </Heading>
          <Text color="fg.muted">
            react-hook-form + zod로 검증되는 폼입니다. 제출은 MSW로 모킹됩니다.
          </Text>
        </Stack>

        <Card.Root variant="outline">
          <Card.Body>
            <form onSubmit={onSubmit} noValidate aria-label="문의 폼">
              <Stack gap="5">
                <Field.Root invalid={!!errors.name} required>
                  <Field.Label htmlFor="contact-name">
                    이름
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id="contact-name"
                    placeholder="홍길동"
                    autoComplete="name"
                    {...register('name')}
                  />
                  {errors.name ? (
                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                  ) : (
                    <Field.HelperText>2자 이상 입력해 주세요.</Field.HelperText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.email} required>
                  <Field.Label htmlFor="contact-email">
                    이메일
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register('email')}
                  />
                  {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={!!errors.message} required>
                  <Field.Label htmlFor="contact-message">
                    메시지
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Textarea
                    id="contact-message"
                    placeholder="문의 내용을 작성해 주세요"
                    rows={6}
                    {...register('message')}
                  />
                  {errors.message ? (
                    <Field.ErrorText>{errors.message.message}</Field.ErrorText>
                  ) : (
                    <Field.HelperText>최소 10자, 최대 1000자까지 입력 가능합니다.</Field.HelperText>
                  )}
                </Field.Root>

                <HStack justify="flex-end" pt="2">
                  <Button
                    type="submit"
                    colorPalette="brand"
                    loading={isSubmitting}
                    loadingText="전송 중"
                  >
                    <Box as="span" display="inline-flex" alignItems="center" gap="2">
                      <Send size={16} aria-hidden="true" />
                      보내기
                    </Box>
                  </Button>
                </HStack>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </Stack>
    </>
  );
}

export default Contact;
