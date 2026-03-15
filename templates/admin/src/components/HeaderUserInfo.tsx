import { Avatar, Dropdown, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

import { useAuthStore } from '@/stores/useAuthStore';

function HeaderUserInfo() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return null;
  }

  const items: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '설정',
      onClick: () => navigate('/settings'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
      <Space style={{ cursor: 'pointer', padding: '0 16px' }}>
        <Avatar size="small" icon={<UserOutlined />} />
        <Typography.Text>{user.name}</Typography.Text>
      </Space>
    </Dropdown>
  );
}

export default HeaderUserInfo;
