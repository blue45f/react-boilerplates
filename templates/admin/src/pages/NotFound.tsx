import { Button, Result } from 'antd';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
    <Helmet>
      <title>404 - Admin</title>
    </Helmet>
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
