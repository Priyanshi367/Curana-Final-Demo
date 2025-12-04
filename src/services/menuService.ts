// Service to fetch menu items from Strapi API
const API_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export interface MenuItem {
  id: number;
  documentId: string;
  title: string;
  url: string;
  visible: boolean;
  order: number | null;
  parent: {
    id: number;
    documentId: string;
    title: string;
    url: string;
  } | null;
  menu: {
    id: number;
    documentId: string;
    Menu: string;
    Slug: string;
  } | null;
}

export interface MenuResponse {
  data: MenuItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const fetchMenuItems = async (): Promise<MenuResponse> => {
  try {
    const response = await fetch(`${API_URL}/menu-items?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch menu items: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};
