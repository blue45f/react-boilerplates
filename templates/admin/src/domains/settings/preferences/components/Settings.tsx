import { Button, Card, Form, Input, Radio, Select, Switch, Tabs } from 'antd';

import { useUiStore, type LanguageCode, type ThemeMode } from '@/app/model';
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle';
import { useToast } from '@/shared/lib/toast';

interface GeneralFormValues {
  siteName: string;
  adminEmail: string;
  language: LanguageCode;
}

interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  twoFactor: boolean;
}

interface NotificationFormValues {
  notificationsEnabled: boolean;
  marketingEmails: boolean;
}

interface AppearanceFormValues {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
}

function GeneralTab() {
  const toast = useToast();
  const { language, setLanguage } = useUiStore();
  const [form] = Form.useForm<GeneralFormValues>();

  const onFinish = (values: GeneralFormValues) => {
    setLanguage(values.language);
    toast.success('일반 설정이 저장되었습니다');
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ siteName: 'Admin Dashboard', adminEmail: 'admin@example.com', language }}
      >
        <Form.Item
          name="siteName"
          label="사이트 이름"
          rules={[{ required: true, message: '사이트 이름을 입력하세요' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="adminEmail"
          label="관리자 이메일"
          rules={[
            { required: true, message: '이메일을 입력하세요' },
            { type: 'email', message: '올바른 이메일 형식이 아닙니다' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="language" label="언어">
          <Select
            options={[
              { value: 'ko', label: '한국어' },
              { value: 'en', label: 'English' },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function SecurityTab() {
  const toast = useToast();
  const [form] = Form.useForm<SecurityFormValues>();

  const onFinish = () => {
    toast.success('보안 설정이 저장되었습니다');
    form.resetFields(['currentPassword', 'newPassword']);
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ twoFactor: false }}>
        <Form.Item
          name="currentPassword"
          label="현재 비밀번호"
          rules={[{ required: true, message: '현재 비밀번호를 입력하세요' }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="새 비밀번호"
          rules={[
            { required: true, message: '새 비밀번호를 입력하세요' },
            { min: 8, message: '8자 이상 입력하세요' },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item name="twoFactor" label="2단계 인증" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function NotificationsTab() {
  const toast = useToast();
  const { notificationsEnabled, setNotificationsEnabled } = useUiStore();
  const [form] = Form.useForm<NotificationFormValues>();

  const onFinish = (values: NotificationFormValues) => {
    setNotificationsEnabled(values.notificationsEnabled);
    toast.success('알림 설정이 저장되었습니다');
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ notificationsEnabled, marketingEmails: false }}
      >
        <Form.Item name="notificationsEnabled" label="알림 받기" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="marketingEmails" label="마케팅 이메일 수신" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function AppearanceTab() {
  const toast = useToast();
  const { theme, setTheme, sidebarCollapsed, setSidebarCollapsed } = useUiStore();
  const [form] = Form.useForm<AppearanceFormValues>();

  const onFinish = (values: AppearanceFormValues) => {
    setTheme(values.theme);
    setSidebarCollapsed(values.sidebarCollapsed);
    toast.success('테마 설정이 저장되었습니다');
  };

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ theme, sidebarCollapsed }}
      >
        <Form.Item name="theme" label="테마">
          <Radio.Group>
            <Radio.Button value="light">라이트</Radio.Button>
            <Radio.Button value="dark">다크</Radio.Button>
            <Radio.Button value="system">시스템</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="sidebarCollapsed" label="기본 사이드바 접기" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function Settings() {
  useDocumentTitle('설정 - Admin');

  return (
    <div>
      <h1>설정</h1>
      <div style={{ marginTop: 24, maxWidth: 720 }}>
        <Tabs
          defaultActiveKey="general"
          items={[
            { key: 'general', label: '일반', children: <GeneralTab /> },
            { key: 'security', label: '보안', children: <SecurityTab /> },
            { key: 'notifications', label: '알림', children: <NotificationsTab /> },
            { key: 'appearance', label: '테마', children: <AppearanceTab /> },
          ]}
        />
      </div>
    </div>
  );
}

export default Settings;
