import { API_BASE } from "../config/config";

export const allProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error("Ошибка получения products");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: number) => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return response.json();
};

export const deleteProductById = async (id: number) => {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Ошиюка при удаление");
};
