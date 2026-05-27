import {
  BellOutlined,
  DashboardOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Drawer, Dropdown, Input, Layout, Menu, theme as antdTheme } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Breadcrumb from './Breadcrumb';
import HeaderUserInfo from './HeaderUserInfo';

import type { InputRef, MenuProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';

import { useUiStore } from '@/app/model';
import { appRoutes } from '@/shared/config';
import { useIsMobile } from '@/shared/lib/hooks/useMediaQuery';

const { Header, Sider, Content } = Layout;

const iconMap: Record<string, ReactNode> = {
  dashboard: <DashboardOutlined />,
  users: <UserOutlined />,
  analytics: <LineChartOutlined />,
  settings: <SettingOutlined />,
};

const menuItems = appRoutes
  .filter((r) => r.showInNav)
  .map((r) => ({
    key: r.path,
    icon: r.iconKey ? iconMap[r.iconKey] : undefined,
    label: r.label,
  }));

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

const notifications = [
  { key: 'n1', title: '신규 사용자 가입', detail: '5분 전' },
  { key: 'n2', title: '결제 완료', detail: '15분 전' },
  { key: 'n3', title: '시스템 백업 완료', detail: '1시간 전' },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { sidebarCollapsed, setSidebarCollapsed, toggleTheme, theme } = useUiStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef<InputRef | null>(null);
  const {
    token: { colorBgContainer, borderRadiusLG, colorBorderSecondary },
  } = antdTheme.useToken();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const notificationItems: MenuProps['items'] = useMemo(
    () => [
      ...notifications.map((n) => ({
        key: n.key,
        label: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 500 }}>{n.title}</span>
            <span style={{ fontSize: 12, color: '#999' }}>{n.detail}</span>
          </div>
        ),
      })),
      { type: 'divider' },
      { key: 'all', label: '모든 알림 보기' },
    ],
    []
  );

  const selectedKey = (() => {
    const exact = menuItems.find((m) => m.key === location.pathname);
    if (exact) return [exact.key];
    const segment = '/' + location.pathname.split('/').filter(Boolean)[0];
    const partial = menuItems.find((m) => m.key === segment);
    return partial ? [partial.key] : [];
  })();

  const themeIsDark = theme === 'dark';
  const handleMenuClick = (key: string) => {
    navigate(key);
    if (isMobile) setDrawerOpen(false);
  };

  const sidebarMenu = (
    <Menu
      theme="dark"
      selectedKeys={selectedKey}
      mode="inline"
      items={menuItems}
      onClick={({ key }) => handleMenuClick(String(key))}
      aria-label="관리자 메뉴"
    />
  );

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
        {!isMobile && (
          <Sider
            collapsible
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
            aria-label="사이드바 네비게이션"
          >
            <div style={logoStyle} role="img" aria-label="Admin 로고">
              {sidebarCollapsed ? 'A' : 'Admin'}
            </div>
            {sidebarMenu}
          </Sider>
        )}
        {isMobile && (
          <Drawer
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            width={240}
            styles={{ body: { padding: 0, background: '#001529' } }}
            closable={false}
          >
            <div style={logoStyle} role="img" aria-label="Admin 로고">
              Admin
            </div>
            {sidebarMenu}
          </Drawer>
        )}
        <Layout>
          <Header
            style={{
              padding: '0 16px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: `1px solid ${colorBorderSecondary}`,
            }}
          >
            {isMobile && (
              <Button
                type="text"
                aria-label="메뉴 열기"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
              />
            )}
            {!isMobile && (
              <Button
                type="text"
                aria-label={sidebarCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
                icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
            )}
            <Input
              ref={searchRef}
              placeholder="검색 (⌘K)"
              allowClear
              aria-label="전역 검색"
              style={{ maxWidth: 320 }}
            />
            <div style={{ flex: 1 }} />
            <Button
              type="text"
              aria-label={themeIsDark ? '라이트 모드' : '다크 모드'}
              icon={themeIsDark ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
            />
            <Dropdown
              menu={{ items: notificationItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Badge count={notifications.length} size="small" offset={[-4, 4]}>
                <Button type="text" icon={<BellOutlined />} aria-label="알림" />
              </Badge>
            </Dropdown>
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
