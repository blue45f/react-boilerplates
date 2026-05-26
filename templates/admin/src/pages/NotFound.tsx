import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

function NotFound() {
  useDocumentTitle('404 - Admin');

  const navigate = useNavigate();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="요청하신 페이지를 찾을 수 없습니다."
        extra={[
          <Button key="home" type="primary" onClick={() => navigate('/')}>
            대시보드로 이동
          </Button>,
          <Button key="back" onClick={() => navigate(-1)}>
            이전 페이지
          </Button>,
        ]}
      />
    </>
  );
}

export default NotFound;
