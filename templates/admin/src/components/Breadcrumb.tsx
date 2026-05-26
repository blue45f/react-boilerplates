import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { routeLabelMap } from '@/lib/routes';

function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const items = [
    {
      title: (
        <Link to="/" aria-label="홈으로">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathSegments.map((_, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = routeLabelMap[path] ?? pathSegments[index];
      const isLast = index === pathSegments.length - 1;

      return {
        title: isLast ? name : <Link to={path}>{name}</Link>,
      };
    }),
  ];

  if (location.pathname === '/') {
    return null;
  }

  return <AntBreadcrumb items={items} style={{ marginBottom: 16 }} />;
}

export default Breadcrumb;
