import { Button, Card, Form, Input, Switch, message } from 'antd';

interface SettingsFormValues {
  siteName: string;
  adminEmail: string;
  notifications: boolean;
}

function Settings() {
  const [form] = Form.useForm<SettingsFormValues>();

  const onFinish = (values: SettingsFormValues) => {
    console.log('Settings:', values);
    message.success('설정이 저장되었습니다.');
  };

  return (
    <div>
      <h1>설정</h1>
      <Card title="기본 설정" style={{ marginTop: 24, maxWidth: 600 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            siteName: 'Admin Dashboard',
            adminEmail: 'admin@example.com',
            notifications: true,
          }}
        >
          <Form.Item
            label="사이트 이름"
            name="siteName"
            rules={[{ required: true, message: '사이트 이름을 입력하세요' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="관리자 이메일"
            name="adminEmail"
            rules={[
              { required: true, message: '이메일을 입력하세요' },
              { type: 'email', message: '올바른 이메일 형식이 아닙니다' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="알림 받기"
            name="notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Settings;
