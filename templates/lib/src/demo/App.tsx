import { useState } from 'react';

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Modal,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  Tag,
  ToastProvider,
  Tooltip,
  useClickOutside,
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useTheme,
  useToast,
  useToggle,
} from '../index';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ marginBottom: 12, fontSize: 18 }}>{title}</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children}
      </div>
    </section>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: '저장 완료',
          description: '데이터가 안전하게 저장되었습니다.',
          variant: 'success',
        })
      }
    >
      토스트 띄우기
    </Button>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, toggle] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [savedName, setSavedName] = useLocalStorage('demo-name', '');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setShowDropdown(false));
  const [modalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState(['React', 'TypeScript', 'Vite']);

  return (
    <ToastProvider>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--rl-color-bg)',
          color: 'var(--rl-color-fg)',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid var(--rl-color-border)',
          }}
        >
          <strong>React Lib Demo</strong>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === 'dark' ? '라이트' : '다크'} 모드
          </Button>
        </header>

        <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px' }}>
          <Section title="Button">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </Section>

          <Section title="Input">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
              <Input label="이름" placeholder="이름" />
              <Input label="URL" leftAddon="https://" rightAddon=".com" placeholder="example" />
              <Input label="비밀번호" type="password" error="8자 이상 입력하세요" />
            </div>
          </Section>

          <Section title="Card">
            <Card style={{ width: 280 }}>
              <CardHeader>
                <strong>일반 카드</strong>
              </CardHeader>
              <CardBody>본문</CardBody>
              <CardFooter>
                <Button size="sm">확인</Button>
              </CardFooter>
            </Card>
            <Card interactive style={{ width: 280 }}>
              <CardBody>인터랙티브 카드</CardBody>
            </Card>
          </Section>

          <Section title="Badge / Tag">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            {tags.map((t) => (
              <Tag key={t} onRemove={() => setTags((prev) => prev.filter((p) => p !== t))}>
                {t}
              </Tag>
            ))}
          </Section>

          <Section title="Spinner / Progress / Skeleton">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Progress value={60} max={100} style={{ width: 240 }} />
            <Progress indeterminate style={{ width: 240 }} />
            <Skeleton width={120} height={16} />
            <Skeleton width={40} circle />
          </Section>

          <Section title="Alert">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              {showAlert && (
                <Alert variant="info" title="안내" onClose={() => setShowAlert(false)}>
                  닫기 가능한 Alert입니다.
                </Alert>
              )}
              <Alert variant="success">성공!</Alert>
              <Alert variant="warning" title="주의">
                돌이킬 수 없습니다.
              </Alert>
              <Alert variant="error">오류 발생</Alert>
            </div>
          </Section>

          <Section title="Modal & Tooltip & Toast">
            <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
            <Tooltip content="설명 텍스트">
              <Button variant="outline">툴팁</Button>
            </Tooltip>
            <ToastDemo />
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="확인"
              footer={
                <>
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={() => setModalOpen(false)}>확인</Button>
                </>
              }
            >
              ESC 키, 백드롭 클릭, 닫기 버튼 모두 닫힘을 트리거합니다.
            </Modal>
          </Section>

          <Section title="Tabs">
            <Tabs defaultValue="info" style={{ width: '100%' }}>
              <Tabs.List>
                <Tabs.Trigger value="info">정보</Tabs.Trigger>
                <Tabs.Trigger value="settings">설정</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="info">정보 패널</Tabs.Content>
              <Tabs.Content value="settings">설정 패널</Tabs.Content>
            </Tabs>
          </Section>

          <Section title="Switch / Checkbox / Radio">
            <Switch defaultChecked />
            <Checkbox label="동의합니다" />
            <RadioGroup name="size" defaultValue="m">
              <Radio value="s" label="S" />
              <Radio value="m" label="M" />
              <Radio value="l" label="L" />
            </RadioGroup>
          </Section>

          <Section title="Select / Avatar / Divider">
            <Select
              label="과일"
              defaultValue="apple"
              options={[
                { value: 'apple', label: '사과' },
                { value: 'banana', label: '바나나' },
              ]}
            />
            <Avatar name="홍 길동" />
            <Avatar size="lg" name="Jane Doe" />
            <Divider label="또는" />
          </Section>

          <Section title="Hooks">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                useToggle: {isOpen ? '열림' : '닫힘'}
                <Button size="sm" onClick={toggle} style={{ marginLeft: 8 }}>
                  토글
                </Button>
              </div>
              <Input
                label="useDebounce"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어"
              />
              <div>디바운스됨: {debouncedSearch}</div>
              <Input
                label="useLocalStorage"
                value={savedName}
                onChange={(e) => setSavedName(e.target.value)}
              />
              <div>useMediaQuery (≤768): {String(isMobile)}</div>
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <Button size="sm" onClick={() => setShowDropdown((p) => !p)}>
                  드롭다운
                </Button>
                {showDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: 4,
                      padding: '8px 12px',
                      background: 'var(--rl-color-bg)',
                      border: '1px solid var(--rl-color-border)',
                      borderRadius: 6,
                    }}
                  >
                    외부 클릭하면 닫힘
                  </div>
                )}
              </div>
            </div>
          </Section>
        </main>
      </div>
    </ToastProvider>
  );
}

export default App;
