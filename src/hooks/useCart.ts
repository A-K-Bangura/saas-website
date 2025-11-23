import { useState, useEffect } from "react";
import { api, type Cart } from "@/src/lib/api";
import { isAuthenticated } from "@/src/lib/auth";

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const cartData = await api.getCart();
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load cart"));
      // Set empty cart on error
      setCart({ items: [], summary: { subtotal: 0, quantity: 0, delivery_charge: 0, total: 0 } });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (productId: number, quantity: number = 1, variantId?: number) => {
    // Check authentication
    if (!isAuthenticated()) {
      const error = new Error("Please login to add items to cart");
      setError(error);
      throw error;
    }

    try {
      setIsLoading(true);
      const updatedCart = await api.addToCart(productId, quantity, variantId);
      setCart(updatedCart);
      setError(null);
      return updatedCart;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to add to cart");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    // Check authentication
    if (!isAuthenticated()) {
      const error = new Error("Please login to update cart items");
      setError(error);
      throw error;
    }

    try {
      setIsLoading(true);
      const updatedCart = await api.updateCartItem(itemId, quantity);
      setCart(updatedCart);
      setError(null);
      return updatedCart;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update cart item");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    // Check authentication
    if (!isAuthenticated()) {
      const error = new Error("Please login to remove cart items");
      setError(error);
      throw error;
    }

    try {
      setIsLoading(true);
      const updatedCart = await api.removeCartItem(itemId);
      setCart(updatedCart);
      setError(null);
      return updatedCart;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to remove cart item");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart?.summary.quantity || 0;

  return {
    cart,
    isLoading,
    error,
    itemCount,
    addToCart,
    updateItem,
    removeItem,
    refreshCart: loadCart,
  };
}

