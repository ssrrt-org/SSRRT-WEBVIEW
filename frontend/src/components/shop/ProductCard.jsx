import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useShopCart } from "@/context/ShopCartContext";

export function formatInr(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const { items, addItem, setQuantity } = useShopCart();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <article className="shop-product" data-testid={`shop-product-${product.id}`}>
      <div className="shop-product-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        {!product.inStock && <span className="shop-product-badge out">Out of stock</span>}
        {inCart && <span className="shop-product-badge in-cart">{inCart.quantity} in cart</span>}
      </div>
      <div className="shop-product-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong className="shop-product-price">{formatInr(product.price)}</strong>
        {product.inStock && !inCart && (
          <button
            type="button"
            className="shop-add-btn"
            data-testid={`shop-add-${product.id}`}
            onClick={() => addItem(product)}
          >
            <ShoppingBag size={15} aria-hidden="true" />
            Add to Cart
          </button>
        )}
        {product.inStock && inCart && (
          <div className="shop-qty-card" data-testid={`shop-qty-${product.id}`}>
            <button
              type="button"
              className="shop-qty-card-btn"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(product.id, inCart.quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <span className="shop-qty-card-count">{inCart.quantity}</span>
            <button
              type="button"
              className="shop-qty-card-btn"
              aria-label="Increase quantity"
              onClick={() => addItem(product)}
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
