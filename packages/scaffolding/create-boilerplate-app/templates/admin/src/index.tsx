import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ConfigProvider } from 'antd'

import Layout from './components/Layout'
import { ROUTES } from './constants/routes'
import Home from './pages/Home'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* 메인 페이지 */}
            <Route element={<Home />} index path={ROUTES.HOME.ROOT} />
            {/* 상품 관리 */}
            <Route element={<Home />} path={ROUTES.PRODUCT.BRANCH} />
            <Route element={<Home />} path={ROUTES.PRODUCT.BULK_CREATE} />
            <Route element={<Home />} path={ROUTES.PRODUCT.CREATE} />
            <Route element={<Home />} path={ROUTES.PRODUCT.LIST} />
            {/* 전시 관리 */}
            <Route element={<Home />} path={ROUTES.DISPLAY.COLLECTION} />
            {/* 판매 관리 */}
            <Route element={<Home />} path={ROUTES.SALES.ORDER_LIST} />
            <Route element={<Home />} path={ROUTES.SALES.ORDER_MANAGEMENT} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
