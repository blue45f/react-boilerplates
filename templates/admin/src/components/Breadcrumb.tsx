import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const routeNameMap: Record<string, string> = {
  '/': '대시보드',
  '/users': '사용자 관리',
  '/settings': '설정',
};

function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const items = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathSegments.map((_, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = routeNameMap[path] ?? pathSegments[index];
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
