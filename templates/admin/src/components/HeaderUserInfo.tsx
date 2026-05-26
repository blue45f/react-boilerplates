import { LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import type { MenuProps } from 'antd';

import { useToast } from '@/lib/toast';
import { useAuthStore } from '@/stores/useAuthStore';

function HeaderUserInfo() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success('로그아웃되었습니다');
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: '프로필',
      onClick: () => navigate('/settings'),
    },
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
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
      <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
        <Avatar size="small" icon={<UserOutlined />} />
        <Typography.Text>{user.name}</Typography.Text>
      </Space>
    </Dropdown>
  );
}

export default HeaderUserInfo;
