import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={koKR}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
