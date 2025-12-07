import { Button, useToggle, useDebounce } from '../index';
import { useState } from 'react';

function App() {
  const [isOpen, toggle] = useToggle(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>React Library Demo</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Button 컴포넌트</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useToggle 훅</h2>
        <p>상태: {isOpen ? '열림' : '닫힘'}</p>
        <Button onClick={toggle}>토글</Button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useDebounce 훅</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요..."
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '300px',
          }}
        />
        <p>입력값: {searchTerm}</p>
        <p>디바운스된 값: {debouncedSearch}</p>
      </section>
    </div>
  );
}

export default App;
