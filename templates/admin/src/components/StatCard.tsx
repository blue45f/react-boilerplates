import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Skeleton, Statistic, Typography } from 'antd';

import type { ReactNode } from 'react';

interface Props {
  title: string;
  value?: number;
  icon: ReactNode;
  loading?: boolean;
  suffix?: string;
  precision?: number;
  delta?: number;
}

function StatCard({ title, value, icon, loading, suffix, precision, delta }: Props) {
  const isPositive = typeof delta === 'number' && delta >= 0;
  const deltaColor = isPositive ? '#3f8600' : '#cf1322';

  return (
    <Card>
      {loading ? (
        <Skeleton active paragraph={{ rows: 1 }} />
      ) : (
        <>
          <Statistic
            title={title}
            value={value ?? 0}
            prefix={icon}
            suffix={suffix}
            precision={precision}
          />
          {typeof delta === 'number' && (
            <Typography.Text style={{ color: deltaColor, fontSize: 12 }}>
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
              {Math.abs(delta).toFixed(2)}%
              <span style={{ color: '#999', marginLeft: 8 }}>지난주 대비</span>
            </Typography.Text>
          )}
        </>
      )}
    </Card>
  );
}

export default StatCard;
