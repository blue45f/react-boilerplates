import { Button, Modal, Space, Table, Tag, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const { confirm } = Modal;

function showDeleteConfirm(user: User) {
  confirm({
    title: `'${user.name}' 사용자를 삭제하시겠습니까?`,
    icon: <ExclamationCircleFilled />,
    content: '이 작업은 되돌릴 수 없습니다.',
    okText: '삭제',
    okType: 'danger',
    cancelText: '취소',
    onOk() {
      message.success(`${user.name} 사용자가 삭제되었습니다.`);
    },
  });
}

const columns: TableColumnsType<User> = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: '이메일',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '역할',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: '관리자', value: '관리자' },
      { text: '사용자', value: '사용자' },
    ],
    onFilter: (value, record) => record.role === value,
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: (status: User['status']) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status === 'active' ? '활성' : '비활성'}
      </Tag>
    ),
  },
  {
    title: '액션',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" size="small" aria-label={`${record.name} 수정`}>
          수정
        </Button>
        <Button
          type="link"
          size="small"
          danger
          aria-label={`${record.name} 삭제`}
          onClick={() => showDeleteConfirm(record)}
        >
          삭제
        </Button>
      </Space>
    ),
  },
];

const data: User[] = [
  {
    key: '1',
    name: '홍길동',
    email: 'hong@example.com',
    role: '관리자',
    status: 'active',
  },
  {
    key: '2',
    name: '김철수',
    email: 'kim@example.com',
    role: '사용자',
    status: 'active',
  },
  {
    key: '3',
    name: '이영희',
    email: 'lee@example.com',
    role: '사용자',
    status: 'inactive',
  },
];

function Users() {
  return (
    <div>
      <Helmet>
        <title>사용자 관리 - Admin</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1>사용자 관리</h1>
        <Button type="primary" aria-label="새 사용자 추가">
          사용자 추가
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        aria-label="사용자 목록"
        pagination={{ showSizeChanger: true, showTotal: (total) => `총 ${total}명` }}
      />
    </div>
  );
}

export default Users;
