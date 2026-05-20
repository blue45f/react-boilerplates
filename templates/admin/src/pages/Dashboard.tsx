import {
  DollarOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import StatCard from '@/components/StatCard';
import { useActivities } from '@/hooks/useActivities';
import { useCategoryBreakdown, useChartSeries } from '@/hooks/useCharts';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useEffectiveTheme } from '@/hooks/useEffectiveTheme';
import type { Activity } from '@/lib/mock';

const PIE_COLORS = ['#1677ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1'];

function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats({ refetchInterval: 15_000 });
  const { data: series } = useChartSeries(14);
  const { data: categories } = useCategoryBreakdown();
  const { data: activities } = useActivities();
  const effectiveTheme = useEffectiveTheme();
  const gridColor = effectiveTheme === 'dark' ? '#303030' : '#f0f0f0';
  const tooltipBg = effectiveTheme === 'dark' ? '#1f1f1f' : '#fff';

  const activityColumns: TableColumnsType<Activity> = [
    { title: '사용자', dataIndex: 'user', key: 'user' },
    {
      title: '액션',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <Tag color="blue">{action}</Tag>,
    },
    { title: '대상', dataIndex: 'target', key: 'target' },
    {
      title: '시각',
      dataIndex: 'at',
      key: 'at',
      render: (at: string) => dayjs(at).format('YYYY-MM-DD HH:mm'),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>대시보드 - Admin</title>
      </Helmet>
      <h1>대시보드</h1>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="총 사용자"
            value={stats?.totalUsers}
            icon={<UserOutlined />}
            loading={isLoading}
            delta={stats?.usersDelta}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="총 주문"
            value={stats?.totalOrders}
            icon={<ShoppingCartOutlined />}
            loading={isLoading}
            delta={stats?.ordersDelta}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="총 매출"
            value={stats?.totalRevenue}
            icon={<DollarOutlined />}
            suffix="원"
            loading={isLoading}
            delta={stats?.revenueDelta}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="성장률"
            value={stats?.growthRate}
            icon={<RiseOutlined />}
            suffix="%"
            precision={2}
            loading={isLoading}
            delta={stats?.growthDelta}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="매출 추이 (최근 14일)">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={series ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: tooltipBg }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1677ff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="카테고리 비중">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip contentStyle={{ background: tooltipBg }} />
                  <Pie
                    data={categories ?? []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {(categories ?? []).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="주문/사용자 추이">
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={series ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: tooltipBg }} />
                  <Legend />
                  <Bar dataKey="orders" fill="#52c41a" />
                  <Bar dataKey="users" fill="#faad14" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="최근 활동">
            <Table
              size="small"
              rowKey="id"
              columns={activityColumns}
              dataSource={activities ?? []}
              pagination={{ pageSize: 5 }}
              aria-label="최근 활동"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
