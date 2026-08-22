import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useShopCart } from "@/context/ShopCartContext";
import { formatInr } from "./ProductCard";

export default function ShopCartPanel() {
  const {
    items,
    itemCount,
    subtotal,
    cartOpen,
    setCartOpen,
    setQuantity,
    removeItem,
    clearCart,
  } = useShopCart();

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!items.length) return;
    setSubmitted(true);
    clearCart();
  };

  const close = () => {
    setCartOpen(false);
    setSubmitted(false);
  };

  return (
    <>
      <button
        type="button"
        className="shop-cart-backdrop"
        aria-hidden={!cartOpen}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`shop-cart-panel${cartOpen ? " open" : ""}`}
        aria-label="Shopping cart"
        data-testid="shop-cart-panel"
      >
        <div className="shop-cart-head">
          <div>
            <h2>Your cart</h2>
            <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
          </div>
          <button type="button" className="shop-cart-close" aria-label="Close cart" onClick={close}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="shop-cart-success" data-testid="shop-order-success">
            <div className="success-icon"><Check /></div>
            <h3>Order request sent</h3>
            <p>Thank you, {form.name}. The Trust office will contact you to confirm availability, shipping and payment.</p>
            <button type="button" className="btn-solid" onClick={close}>Continue browsing</button>
          </div>
        ) : (
          <>
            <div className="shop-cart-items">
              {items.length === 0 ? (
                <div className="shop-cart-empty">
                  <ShoppingBag size={32} />
                  <p>Your cart is empty. Add sacred items from the collection.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="shop-cart-item" data-testid={`cart-item-${item.id}`}>
                    <img src={item.image} alt="" />
                    <div className="shop-cart-item-info">
                      <strong>{item.name}</strong>
                      <span>{formatInr(item.price)} each</span>
                      <div className="shop-qty compact">
                        <button type="button" aria-label="Decrease" onClick={() => setQuantity(item.id, item.quantity - 1)}>
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" aria-label="Increase" onClick={() => setQuantity(item.id, item.quantity + 1)}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="shop-cart-item-total">
                      <span>{formatInr(item.price * item.quantity)}</span>
                      <button type="button" className="shop-cart-remove" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="shop-cart-checkout">
                <div className="shop-cart-summary">
                  <span>Subtotal</span>
                  <strong data-testid="shop-cart-subtotal">{formatInr(subtotal)}</strong>
                </div>
                <p className="shop-cart-note">Shipping and payment details will be confirmed by the Trust office.</p>
                <form className="shop-order-form" data-testid="shop-order-form" onSubmit={submit}>
                  <label>
                    <span>Full name</span>
                    <input required value={form.name} onChange={update("name")} placeholder="Your name" data-testid="shop-order-name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" data-testid="shop-order-email" />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input required type="tel" value={form.phone} onChange={update("phone")} placeholder="+91" data-testid="shop-order-phone" />
                  </label>
                  <label className="full">
                    <span>Delivery address</span>
                    <textarea required rows={2} value={form.address} onChange={update("address")} placeholder="Full address for shipping" data-testid="shop-order-address" />
                  </label>
                  <label className="full">
                    <span>Notes (optional)</span>
                    <textarea rows={2} value={form.notes} onChange={update("notes")} placeholder="Gift message or special requests" data-testid="shop-order-notes" />
                  </label>
                  <button type="submit" className="btn-solid shop-order-submit" data-testid="shop-order-submit">
                    Request order · {formatInr(subtotal)}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </aside>
    </>
  );
}
