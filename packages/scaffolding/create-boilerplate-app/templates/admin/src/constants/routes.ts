export const ROUTES = {
  HOME: {
    ROOT: '/',
  },
  PRODUCT: {
    CREATE: '/product/create',
    LIST: '/product/list',
    BRANCH: '/product/branch',
    BULK_CREATE: '/product/bulk-create',
  },
  DISPLAY: {
    COLLECTION: '/display/collection',
  },
  SALES: {
    ORDER_MANAGEMENT: '/sales/order-management',
    ORDER_LIST: '/sales/order-list',
  },
} as const
