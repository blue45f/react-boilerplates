import {
  ExclamationCircleFilled,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Space, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';

import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from '../model/useUsers';

import UserDetailDrawer from './UserDetailDrawer';
import UserFormModal, { type UserFormValues } from './UserFormModal';

import type { AdminUser } from '@/infrastructure/mock';
import type { TableColumnsType } from 'antd';

import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle';
import { useToast } from '@/shared/lib/toast';

const { confirm } = Modal;

const roleLabel: Record<AdminUser['role'], string> = {
  admin: '관리자',
  editor: '편집자',
  user: '사용자',
  viewer: '뷰어',
};

const statusColor: Record<AdminUser['status'], string> = {
  active: 'green',
  inactive: 'red',
  pending: 'gold',
};

const statusLabel: Record<AdminUser['status'], string> = {
  active: '활성',
  inactive: '비활성',
  pending: '대기',
};

function Users() {
  useDocumentTitle('사용자 관리 - Admin');

  const { data: users, isFetching, refetch } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [drawerUser, setDrawerUser] = useState<AdminUser | undefined>();
  const [editingUser, setEditingUser] = useState<AdminUser | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = users ?? [];
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter((u) => [u.name, u.email, u.id].some((v) => v.toLowerCase().includes(q)));
  }, [users, search]);

  const handleAdd = () => {
    setEditingUser(undefined);
    setModalOpen(true);
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSubmit = async (values: UserFormValues) => {
    if (editingUser) {
      await updateMutation.mutateAsync({ id: editingUser.id, patch: values });
      toast.success(`${values.name} 정보가 수정되었습니다`);
    } else {
      await createMutation.mutateAsync(values);
      toast.success(`${values.name} 사용자가 추가되었습니다`);
    }
    setModalOpen(false);
  };

  const handleDelete = (user: AdminUser) => {
    confirm({
      title: `'${user.name}' 사용자를 삭제하시겠습니까?`,
      icon: <ExclamationCircleFilled />,
      content: '이 작업은 되돌릴 수 없습니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      async onOk() {
        await deleteMutation.mutateAsync(user.id);
        toast.success(`${user.name} 사용자가 삭제되었습니다`);
      },
    });
  };

  const columns: TableColumnsType<AdminUser> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name: string, record) => (
        <Button type="link" onClick={() => setDrawerUser(record)} style={{ padding: 0 }}>
          {name}
        </Button>
      ),
    },
    { title: '이메일', dataIndex: 'email', key: 'email' },
    {
      title: '역할',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: '관리자', value: 'admin' },
        { text: '편집자', value: 'editor' },
        { text: '사용자', value: 'user' },
        { text: '뷰어', value: 'viewer' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role: AdminUser['role']) => roleLabel[role],
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '활성', value: 'active' },
        { text: '비활성', value: 'inactive' },
        { text: '대기', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: AdminUser['status']) => (
        <Tag color={statusColor[status]}>{statusLabel[status]}</Tag>
      ),
    },
    {
      title: '가입일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (v: string) => v.slice(0, 10),
    },
    {
      title: '액션',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            size="small"
            aria-label={`${record.name} 수정`}
            onClick={() => handleEdit(record)}
          >
            수정
          </Button>
          <Button
            type="link"
            size="small"
            danger
            aria-label={`${record.name} 삭제`}
            onClick={() => handleDelete(record)}
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <h1>사용자 관리</h1>
        <Space>
          <Input
            allowClear
            placeholder="이름/이메일/ID 검색"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="사용자 검색"
            style={{ width: 240 }}
          />
          <Button icon={<ReloadOutlined />} onClick={() => refetch()} aria-label="새로고침" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            aria-label="새 사용자 추가"
            onClick={handleAdd}
          >
            사용자 추가
          </Button>
        </Space>
      </div>
      <Table
        rowKey="id"
        loading={isFetching}
        columns={columns}
        dataSource={filtered}
        aria-label="사용자 목록"
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          showTotal: (total) => `총 ${total}명`,
        }}
      />

      <UserFormModal
        open={modalOpen}
        title={editingUser ? '사용자 수정' : '사용자 추가'}
        initialValues={editingUser}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <UserDetailDrawer
        open={Boolean(drawerUser)}
        user={drawerUser}
        onClose={() => setDrawerUser(undefined)}
      />
    </div>
  );
}

export default Users;
