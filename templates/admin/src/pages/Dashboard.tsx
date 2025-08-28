import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const stats = [
  { title: '총 사용자', value: 1128, icon: <UserOutlined /> },
  { title: '총 주문', value: 93, icon: <ShoppingCartOutlined /> },
  {
    title: '총 매출',
    value: 1250000,
    icon: <DollarOutlined />,
    suffix: '원',
  },
  {
    title: '성장률',
    value: 11.28,
    precision: 2,
    icon: <RiseOutlined />,
    suffix: '%',
    valueStyle: { color: '#3f8600' },
  },
] as const;

function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      <Row gutter={16} style={{ marginTop: 24 }}>
        {stats.map((stat) => (
          <Col span={6} key={stat.title}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                suffix={'suffix' in stat ? stat.suffix : undefined}
                precision={'precision' in stat ? stat.precision : undefined}
                valueStyle={'valueStyle' in stat ? stat.valueStyle : undefined}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;
