import {
  Card,
  Field,
  HStack,
  Heading,
  RadioGroup,
  Stack,
  Switch,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

import { useColorMode } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';
import { useAppStore } from '@/stores/useAppStore';
import type { Language, ThemePreference } from '@/stores/useAppStore';

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
  { value: 'system', label: '시스템' },
];

const languageOptions: { value: Language; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
];

function Settings() {
  const { preference: themePreference, setColorMode } = useColorMode();
  const language = useAppStore((s) => s.language);
  const notifications = useAppStore((s) => s.notifications);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const setNotifications = useAppStore((s) => s.setNotifications);

  return (
    <>
      <Helmet>
        <title>설정 - React App</title>
        <meta name="description" content="테마, 언어, 알림 환경설정을 localStorage에 저장합니다." />
      </Helmet>

      <Stack gap="6" maxW="2xl" mx="auto">
        <Stack gap="2">
          <Heading as="h1" size="2xl">
            설정
          </Heading>
          <Text color="fg.muted">모든 설정은 자동으로 브라우저에 저장됩니다 (localStorage).</Text>
        </Stack>

        <Card.Root variant="outline">
          <Card.Header>
            <Heading as="h2" size="md">
              테마
            </Heading>
          </Card.Header>
          <Card.Body>
            <Field.Root>
              <VisuallyHidden>
                <Field.Label>테마 선택</Field.Label>
              </VisuallyHidden>
              <RadioGroup.Root
                value={themePreference}
                aria-label="테마 선택"
                onValueChange={(e) => {
                  setColorMode(e.value as ThemePreference);
                }}
              >
                <HStack gap="6" flexWrap="wrap">
                  {themeOptions.map((opt) => (
                    <RadioGroup.Item key={opt.value} value={opt.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{opt.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            </Field.Root>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Heading as="h2" size="md">
              언어
            </Heading>
          </Card.Header>
          <Card.Body>
            <Field.Root>
              <VisuallyHidden>
                <Field.Label>언어 선택</Field.Label>
              </VisuallyHidden>
              <RadioGroup.Root
                value={language}
                aria-label="언어 선택"
                onValueChange={(e) => setLanguage(e.value as Language)}
              >
                <HStack gap="6" flexWrap="wrap">
                  {languageOptions.map((opt) => (
                    <RadioGroup.Item key={opt.value} value={opt.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{opt.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            </Field.Root>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Heading as="h2" size="md">
              알림
            </Heading>
          </Card.Header>
          <Card.Body>
            <HStack justify="space-between" gap="4">
              <Stack gap="0.5">
                <Text fontWeight="medium">이메일 알림 받기</Text>
                <Text fontSize="sm" color="fg.muted">
                  새로운 활동에 대한 이메일 알림을 받습니다.
                </Text>
              </Stack>
              <Switch.Root
                checked={notifications}
                onCheckedChange={(e) => {
                  setNotifications(e.checked);
                  toaster.info({
                    title: e.checked ? '알림 켜짐' : '알림 꺼짐',
                    duration: 1800,
                  });
                }}
                aria-label="이메일 알림"
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </HStack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </>
  );
}

export default Settings;
