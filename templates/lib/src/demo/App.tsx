import { useState } from 'react';

import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
  useClickOutside,
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useToggle,
} from '../index';

function App() {
  const [isOpen, toggle] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [savedName, setSavedName] = useLocalStorage('demo-name', '');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setShowDropdown(false));

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>React Library Demo</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Button</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Input</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', maxWidth: 400 }}>
          <Input label="이름" placeholder="이름을 입력하세요" />
          <Input label="이메일" type="email" helperText="example@mail.com 형식" />
          <Input label="비밀번호" type="password" error="8자 이상 입력하세요" />
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Card</h2>
        <Card style={{ marginTop: '1rem', maxWidth: 400 }}>
          <CardHeader><strong>카드 제목</strong></CardHeader>
          <CardBody>카드 본문 내용입니다.</CardBody>
          <CardFooter>
            <Button size="sm">확인</Button>
          </CardFooter>
        </Card>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Badge</h2>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Spinner</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Alert</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {showAlert && (
            <Alert variant="info" title="안내" onClose={() => setShowAlert(false)}>
              닫기 버튼이 있는 Alert입니다.
            </Alert>
          )}
          {!showAlert && (
            <Button size="sm" onClick={() => setShowAlert(true)}>Alert 다시 보기</Button>
          )}
          <Alert variant="success">작업이 완료되었습니다.</Alert>
          <Alert variant="warning" title="주의">이 작업은 되돌릴 수 없습니다.</Alert>
          <Alert variant="error">오류가 발생했습니다.</Alert>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useToggle</h2>
        <p>상태: {isOpen ? '열림' : '닫힘'}</p>
        <Button onClick={toggle}>토글</Button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useDebounce</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요..."
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '300px' }}
        />
        <p>입력값: {searchTerm}</p>
        <p>디바운스된 값: {debouncedSearch}</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useLocalStorage</h2>
        <input
          type="text"
          value={savedName}
          onChange={(e) => setSavedName(e.target.value)}
          placeholder="localStorage에 저장됩니다"
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '300px' }}
        />
        <p>저장된 값: {savedName || '(없음)'}</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useMediaQuery</h2>
        <p>현재 뷰포트: {isMobile ? '모바일 (≤768px)' : '데스크톱 (>768px)'}</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useClickOutside</h2>
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
          <Button onClick={() => setShowDropdown(!showDropdown)}>
            드롭다운 {showDropdown ? '닫기' : '열기'}
          </Button>
          {showDropdown && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, marginTop: 4,
              background: 'white', border: '1px solid #ccc', borderRadius: 4,
              padding: '0.5rem 1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              외부를 클릭하면 닫힙니다
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
