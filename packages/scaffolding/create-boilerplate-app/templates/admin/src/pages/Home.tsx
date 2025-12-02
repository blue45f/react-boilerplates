import { Typography, Card, Row, Col, Space, Image } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const Home = () => {
  const handleCopyCommand = () => {
    void navigator.clipboard.writeText('npx @boilerplate/codegen')
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3}>코드제너레이터로 페이지를 쉽게 생성해보세요.</Title>

      <Paragraph>프로젝트의 루트 경로에서 다음을 실행합니다.</Paragraph>

      <Card
        style={{ maxWidth: 600 }}
        title={
          <Text type="secondary" style={{ fontSize: 14 }}>
            {`>_ Terminal`}
          </Text>
        }
        extra={<CopyOutlined style={{ cursor: 'pointer' }} onClick={handleCopyCommand} />}
      >
        <Text code style={{ fontSize: 14 }}>
          npx <Text style={{ color: '#52c41a' }}>@boilerplate/codegen</Text>
        </Text>
      </Card>

      <Paragraph>
        실행 전, 프로젝트의 루트 경로에 cliconfig.json파일을 만들면, page를 생성할 pageDir와 component를
        생성할 componentDir를 미리 정의할 수 있습니다. 정의하지 않을 경우, 'src/pages'와 'src/components'에
        생성됩니다.
      </Paragraph>

      <Image src="src/assets/images/cliconfig.png" width={500} />

      <Paragraph>설치 시, 다음과 같은 메시지가 표시됩니다.</Paragraph>

      <Card style={{ maxWidth: 1300 }}>
        <Space direction="vertical" size="small">
          <Text type="secondary" style={{ fontSize: 14 }}>
            {`>_ Terminal`}
          </Text>
          <div style={{ marginTop: 16 }}>
            <Space direction="vertical">
              <Space>
                <Text>1 생성할 페이지 유형을 선택해주세요.</Text>
                <Text code>
                  1.입력형 / 2.보기/수정형 / 3.조회형 / 4.일괄등록형 / 5.List to List형 / 6.게시판형 /
                  7.로그인형 / 8.에러페이지형 / 9.약관동의형
                </Text>
              </Space>
              <Space>
                <Text>2 feature명을 입력해주세요.</Text>
                <Text code>Seller</Text>
              </Space>
              <Space>
                <Text>3 컴포넌트명을 입력해주세요.</Text>
                <Text code>BasicInfo</Text>
              </Space>
            </Space>
          </div>
        </Space>
      </Card>

      <Paragraph>생성 시 선택 가능한 페이지 유형은 아래를 참고해주세요.</Paragraph>

      <Row gutter={[24, 24]}>
        {PAGE_TYPES.map((pageType) => (
          <Col span={8} key={pageType.title}>
            <Card>
              <Title level={5}>{pageType.title}</Title>
              <Paragraph type="secondary">{pageType.description}</Paragraph>
              <Image src={pageType.image} width={300} />
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  )
}

const PAGE_TYPES = [
  {
    title: '입력형',
    description: '상품, 셀러, 메뉴와 같은 콘텐츠를 등록하는 페이지 구성에 사용해요',
    image: 'src/assets/images/input.png',
  },
  {
    title: '보기/수정형',
    description: '데이터를 요약해서 보거나, 수정 권한을 제한하고 싶을 때 사용해요',
    image: 'src/assets/images/viewEdit.png',
  },
  {
    title: '조회형',
    description: '데이터를 검색하고, 조회하는 페이지 구성에 사용해요',
    image: 'src/assets/images/search.png',
  },
  {
    title: '일괄등록형',
    description: '많은 양의 데이터를 일괄로 등록할 때 사용해요',
    image: 'src/assets/images/bulk.png',
  },
  {
    title: '카테고리형 (준비중)',
    description: '카테고리를 생성하고 관리할 때 사용해요',
    image: 'src/assets/images/category.png',
  },
  {
    title: '목록형',
    description: '기존 목록에서 필요한 데이터를 선택하여 새목록을 만들 때 사용해요',
    image: 'src/assets/images/list.png',
  },
  {
    title: '대시보드형 (준비중)',
    description: '데이터를 요약해서 보고 싶을때 사용해요',
    image: 'src/assets/images/dashboard.png',
  },
  {
    title: '게시판형',
    description: '여러 개의 글을 한번에 보여줄 때 주로 사용해요',
    image: 'src/assets/images/notice.png',
  },
  {
    title: '로그인형',
    description: '서비스의 로그인 화면에 활용해요',
    image: 'src/assets/images/login.png',
  },
  {
    title: '에러페이지형',
    description: '에러페이지 공통으로 사용해요',
    image: 'src/assets/images/error.png',
  },
  {
    title: '약관동의형',
    description: '회원가입 또는 서비스 이용동의를 받는 과정에서 주로 사용해요',
    image: 'src/assets/images/termsAgree.png',
  },
]

export default Home
