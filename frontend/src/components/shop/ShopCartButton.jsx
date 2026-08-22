import { ShoppingCart } from "lucide-react";
import { useShopCart } from "@/context/ShopCartContext";

export default function ShopCartButton({ variant = "topbar" }) {
  const { itemCount, setCartOpen } = useShopCart();
  const isToolbar = variant === "toolbar";

  return (
    <button
      type="button"
      className={isToolbar ? "shop-toolbar-cart" : "topbar-cart"}
      data-testid={isToolbar ? "shop-cart-toggle" : "header-cart-button"}
      onClick={() => setCartOpen(true)}
      aria-label={`Open cart, ${itemCount} items`}
    >
      <ShoppingCart size={isToolbar ? 18 : 14} aria-hidden="true" />
      <span>Cart</span>
      {itemCount > 0 && <em>{itemCount}</em>}
    </button>
  );
}
