import { useState, useEffect } from "react";
import { fetchMenuItems, MenuItem } from "@/services/menuService";

export interface MenuItemWithChildren extends MenuItem {
  children?: MenuItemWithChildren[];
}

export const useMenuItems = (enabled: boolean) => {
  const [menuItems, setMenuItems] = useState<MenuItemWithChildren[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setMenuItems([]);
      return;
    }

    const loadMenuItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMenuItems();
        
        // Transform flat menu items into hierarchical structure
        const itemsMap = new Map<number, MenuItemWithChildren>();
        const rootItems: MenuItemWithChildren[] = [];

        // First pass: create map of all items
        response.data.forEach((item) => {
          if (item.visible) {
            itemsMap.set(item.id, { ...item, children: [] });
          }
        });

        // Second pass: build hierarchy
        itemsMap.forEach((item) => {
          if (item.parent) {
            const parent = itemsMap.get(item.parent.id);
            if (parent) {
              parent.children = parent.children || [];
              parent.children.push(item);
            }
          } else {
            rootItems.push(item);
          }
        });

        // Sort items by order
        const sortByOrder = (items: MenuItemWithChildren[]) => {
          items.sort((a, b) => {
            if (a.order === null) return 1;
            if (b.order === null) return -1;
            return a.order - b.order;
          });
          items.forEach((item) => {
            if (item.children && item.children.length > 0) {
              sortByOrder(item.children);
            }
          });
        };

        sortByOrder(rootItems);
        setMenuItems(rootItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load menu items");
        console.error("Error loading menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [enabled]);

  return { menuItems, loading, error };
};
