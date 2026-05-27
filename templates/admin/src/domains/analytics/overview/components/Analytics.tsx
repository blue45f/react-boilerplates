import { Card, Col, Radio, Row } from 'antd';
import { useState } from 'react';
import {
  Area,
  AreaChart,
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

import { useCategoryBreakdown, useChartSeries } from '../model/useCharts';

import { useEffectiveTheme } from '@/app/model';
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle';

const PIE_COLORS = ['#1677ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1'];

function Analytics() {
  useDocumentTitle('분석 - Admin');

  const [range, setRange] = useState(30);
  const { data: series } = useChartSeries(range);
  const { data: categories } = useCategoryBreakdown();
  const effectiveTheme = useEffectiveTheme();
  const gridColor = effectiveTheme === 'dark' ? '#303030' : '#f0f0f0';
  const tooltipBg = effectiveTheme === 'dark' ? '#1f1f1f' : '#fff';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <h1>분석</h1>
        <Radio.Group
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="기간 선택"
        >
          <Radio.Button value={7}>7일</Radio.Button>
          <Radio.Button value={14}>14일</Radio.Button>
          <Radio.Button value={30}>30일</Radio.Button>
          <Radio.Button value={90}>90일</Radio.Button>
        </Radio.Group>
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="매출 추이">
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <AreaChart data={series ?? []}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1677ff" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#1677ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: tooltipBg }} />
                  <Area type="monotone" dataKey="revenue" stroke="#1677ff" fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="카테고리 비중">
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip contentStyle={{ background: tooltipBg }} />
                  <Pie
                    data={categories ?? []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
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
          <Card title="신규 사용자">
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
                    dataKey="users"
                    stroke="#52c41a"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="주문 건수">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={series ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: tooltipBg }} />
                  <Bar dataKey="orders" fill="#faad14" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
