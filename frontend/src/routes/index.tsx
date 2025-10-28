export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
} as const;
