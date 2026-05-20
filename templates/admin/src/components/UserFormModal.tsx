import { Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';

import type { AdminUser } from '@/lib/mock';

export interface UserFormValues {
  name: string;
  email: string;
  role: AdminUser['role'];
  status: AdminUser['status'];
}

interface Props {
  open: boolean;
  title: string;
  initialValues?: Partial<UserFormValues>;
  confirmLoading?: boolean;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => Promise<void> | void;
}

function UserFormModal({ open, title, initialValues, confirmLoading, onCancel, onSubmit }: Props) {
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        role: 'user',
        status: 'active',
        ...initialValues,
      });
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={title}
      okText="저장"
      cancelText="취소"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="name"
          label="이름"
          rules={[{ required: true, message: '이름을 입력하세요' }]}
        >
          <Input placeholder="홍길동" autoFocus />
        </Form.Item>
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            { required: true, message: '이메일을 입력하세요' },
            { type: 'email', message: '올바른 이메일 형식이 아닙니다' },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item name="role" label="역할" rules={[{ required: true }]}>
          <Select
            options={[
              { value: 'admin', label: '관리자' },
              { value: 'editor', label: '편집자' },
              { value: 'user', label: '사용자' },
              { value: 'viewer', label: '뷰어' },
            ]}
          />
        </Form.Item>
        <Form.Item name="status" label="상태" rules={[{ required: true }]}>
          <Select
            options={[
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'pending', label: '대기' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
