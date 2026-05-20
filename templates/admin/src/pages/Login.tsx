import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { mockApi } from '@/lib/mock';
import { useToast } from '@/lib/toast';
import { useAuthStore } from '@/stores/useAuthStore';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LocationState {
  from?: { pathname?: string };
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { isAuthenticated, login } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@example.com', password: 'admin1234' },
  });

  if (isAuthenticated) {
    const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/';
    return <Navigate to={redirectTo} replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      const user = await mockApi.login(values);
      login(user);
      toast.success('로그인되었습니다');
      const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : '로그인에 실패했습니다';
      setServerError(msg);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'linear-gradient(135deg, #1677ff22 0%, #722ed122 100%)',
      }}
    >
      <Helmet>
        <title>로그인 - Admin</title>
      </Helmet>
      <Card style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Typography.Title level={3} style={{ marginBottom: 4 }}>
            Admin
          </Typography.Title>
          <Typography.Text type="secondary">관리자 계정으로 로그인하세요</Typography.Text>
        </div>
        {serverError && (
          <Alert
            type="error"
            message={serverError}
            style={{ marginBottom: 16 }}
            showIcon
            closable
          />
        )}
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="이메일"
            validateStatus={errors.email ? 'error' : undefined}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  aria-label="이메일"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            validateStatus={errors.password ? 'error' : undefined}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  aria-label="비밀번호"
                />
              )}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} block aria-label="로그인">
            로그인
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
