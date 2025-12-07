import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns: TableProps<User>['columns'] = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
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
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status === 'active' ? '활성' : '비활성'}
      </Tag>
    ),
  },
  {
    title: '액션',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="link" size="small">
          수정
        </Button>
        <Button type="link" size="small" danger>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h1>사용자 관리</h1>
        <Button type="primary">사용자 추가</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Users;
