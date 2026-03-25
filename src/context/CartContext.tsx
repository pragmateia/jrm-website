"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  createCart,
  addToCart,
  updateCartLines,
  removeCartLines,
  getCart,
  type ShopifyCart,
} from "@/lib/shopify-cart";

const CART_ID_KEY = "jrm_cart_id";

interface CartContextValue {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing cart on mount
  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY);
    if (!storedId) return;

    getCart(storedId)
      .then((c) => {
        if (c) {
          setCart(c);
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY);
      });
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setIsLoading(true);
      try {
        let updated: ShopifyCart;
        if (cart?.id) {
          updated = await addToCart(cart.id, variantId, quantity);
        } else {
          updated = await createCart(variantId, quantity);
        }
        setCart(updated);
        localStorage.setItem(CART_ID_KEY, updated.id);
        setIsOpen(true);
      } catch (err) {
        console.error("Failed to add item to cart:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updated = await updateCartLines(cart.id, lineId, quantity);
        setCart(updated);
      } catch (err) {
        console.error("Failed to update cart item:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setIsLoading(true);
      try {
        const updated = await removeCartLines(cart.id, [lineId]);
        setCart(updated);
      } catch (err) {
        console.error("Failed to remove cart item:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        totalQuantity: cart?.totalQuantity || 0,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
