import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Skeleton, Statistic } from 'antd';
import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';

import { useDashboardStats } from '@/hooks/useDashboardStats';

interface StatConfig {
  title: string;
  key: keyof ReturnType<typeof useDashboardStats>['data'] & string;
  icon: ReactNode;
  suffix?: string;
  precision?: number;
  valueStyle?: React.CSSProperties;
}

const statConfigs: StatConfig[] = [
  { title: '총 사용자', key: 'totalUsers', icon: <UserOutlined /> },
  { title: '총 주문', key: 'totalOrders', icon: <ShoppingCartOutlined /> },
  { title: '총 매출', key: 'totalRevenue', icon: <DollarOutlined />, suffix: '원' },
  {
    title: '성장률',
    key: 'growthRate',
    icon: <RiseOutlined />,
    suffix: '%',
    precision: 2,
    valueStyle: { color: '#3f8600' },
  },
];

function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div>
      <Helmet>
        <title>대시보드 - Admin</title>
      </Helmet>
      <h1>대시보드</h1>
      <Row gutter={16} style={{ marginTop: 24 }}>
        {statConfigs.map((config) => (
          <Col span={6} key={config.title}>
            <Card>
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : (
                <Statistic
                  title={config.title}
                  value={stats?.[config.key] ?? 0}
                  prefix={config.icon}
                  suffix={config.suffix}
                  precision={config.precision}
                  valueStyle={config.valueStyle}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;
