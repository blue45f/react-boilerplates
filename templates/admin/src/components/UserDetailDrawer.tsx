import { Avatar, Descriptions, Drawer, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import type { AdminUser } from '@/lib/mock';

interface Props {
  open: boolean;
  user: AdminUser | undefined;
  onClose: () => void;
}

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

function UserDetailDrawer({ open, user, onClose }: Props) {
  return (
    <Drawer open={open} title="사용자 상세" onClose={onClose} width={420} destroyOnHidden>
      {user && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Avatar size={56} icon={<UserOutlined />} />
            <div>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {user.name}
              </Typography.Title>
              <Typography.Text type="secondary">{user.email}</Typography.Text>
            </div>
          </div>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
            <Descriptions.Item label="역할">{roleLabel[user.role]}</Descriptions.Item>
            <Descriptions.Item label="상태">
              <Tag color={statusColor[user.status]}>{statusLabel[user.status]}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="가입일">
              {dayjs(user.createdAt).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label="최근 로그인">
              {dayjs(user.lastLoginAt).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Drawer>
  );
}

export default UserDetailDrawer;
