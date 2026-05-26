import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd';
import enUS from 'antd/locale/en_US';
import koKR from 'antd/locale/ko_KR';
import { useEffect } from 'react';

import type { ReactNode } from 'react';

import { useEffectiveTheme } from '@/hooks/useEffectiveTheme';
import { useUiStore } from '@/stores/useUiStore';

const brandTokens = {
  colorPrimary: '#1677ff',
  colorInfo: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  borderRadius: 6,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

interface Props {
  children: ReactNode;
}

function ThemedProviders({ children }: Props) {
  const effective = useEffectiveTheme();
  const language = useUiStore((s) => s.language);
  const isDark = effective === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = effective;
  }, [effective]);

  return (
    <ConfigProvider
      locale={language === 'en' ? enUS : koKR}
      theme={{
        token: brandTokens,
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}

export default ThemedProviders;
