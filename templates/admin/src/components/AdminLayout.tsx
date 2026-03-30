import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { CSSProperties } from 'react';
import { Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/useAuthStore';

import Breadcrumb from './Breadcrumb';
import HeaderUserInfo from './HeaderUserInfo';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '대시보드',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: '사용자 관리',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: '설정',
  },
];

const logoStyle: CSSProperties = {
  height: 32,
  margin: 16,
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
};

const skipLinkStyle: CSSProperties = {
  position: 'absolute',
  left: '-9999px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 데모용: 인증되지 않은 경우 mock 사용자로 로그인
  useEffect(() => {
    if (!isAuthenticated) {
      login({ id: '1', name: '관리자', email: 'admin@example.com', role: 'admin' });
    }
  }, [isAuthenticated, login]);

  return (
    <>
      <a
        href="#main-content"
        style={skipLinkStyle}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, {
            position: 'fixed',
            left: '8px',
            top: '8px',
            width: 'auto',
            height: 'auto',
            zIndex: '9999',
            background: '#1677ff',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
          });
        }}
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, skipLinkStyle);
        }}
      >
        본문으로 건너뛰기
      </a>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          aria-label="사이드바 네비게이션"
        >
          <div style={logoStyle} role="img" aria-label="Admin 로고">
            {collapsed ? 'A' : 'Admin'}
          </div>
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            aria-label="관리자 메뉴"
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '0 16px',
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <HeaderUserInfo />
          </Header>
          <Content style={{ margin: 16 }}>
            <Breadcrumb />
            <div
              id="main-content"
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              role="main"
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
