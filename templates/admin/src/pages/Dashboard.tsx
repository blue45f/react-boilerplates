import { Card, Col, Row, Statistic } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons';

function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 사용자"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 주문"
              value={93}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 매출"
              value={1250000}
              prefix={<DollarOutlined />}
              suffix="원"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="성장률"
              value={11.28}
              precision={2}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
