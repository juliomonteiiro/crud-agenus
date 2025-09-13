export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-teste-front-production.up.railway.app'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SESSION: '/auth/session',
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    GET: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    UPDATE_THUMBNAIL: (id: string) => `/products/thumbnail/${id}`,
  }
} as const
