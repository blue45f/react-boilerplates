import type { MenuProps } from 'antd'
import { ShoppingOutlined, AppstoreOutlined, LineChartOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router'

import { ROUTES } from '../constants/routes'

type MenuItem = Required<MenuProps>['items'][number]

const useMenus = (): MenuItem[] => {
  return [
    {
      key: 'product',
      icon: <ShoppingOutlined />,
      label: '상품 관리',
      children: [
        {
          key: ROUTES.PRODUCT.CREATE,
          label: <NavLink to={ROUTES.PRODUCT.CREATE}>상품 등록</NavLink>,
        },
        {
          key: ROUTES.PRODUCT.LIST,
          label: <NavLink to={ROUTES.PRODUCT.LIST}>상품 조회/수정</NavLink>,
        },
        {
          key: ROUTES.PRODUCT.BRANCH,
          label: <NavLink to={ROUTES.PRODUCT.BRANCH}>지점별 상품 조회/수정</NavLink>,
        },
        {
          key: ROUTES.PRODUCT.BULK_CREATE,
          label: <NavLink to={ROUTES.PRODUCT.BULK_CREATE}>상품 일괄등록</NavLink>,
        },
      ],
    },
    {
      key: 'display',
      icon: <AppstoreOutlined />,
      label: '전시 관리',
      children: [
        {
          key: ROUTES.DISPLAY.COLLECTION,
          label: <NavLink to={ROUTES.DISPLAY.COLLECTION}>대표상품 컬렉션 관리</NavLink>,
        },
      ],
    },
    {
      key: 'sales',
      icon: <LineChartOutlined />,
      label: '판매 관리',
      children: [
        {
          key: ROUTES.SALES.ORDER_MANAGEMENT,
          label: <NavLink to={ROUTES.SALES.ORDER_MANAGEMENT}>주문 관리</NavLink>,
        },
        {
          key: ROUTES.SALES.ORDER_LIST,
          label: <NavLink to={ROUTES.SALES.ORDER_LIST}>주문 조회</NavLink>,
        },
      ],
    },
  ]
}

export default useMenus
