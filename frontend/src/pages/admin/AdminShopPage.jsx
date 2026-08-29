import { useMemo, useState } from "react";
import { shopCategories } from "@/constants/shopProducts";
import { confirmAdminAction } from "@/admin/adminUtils";
import AdminDrawer from "@/admin/components/AdminDrawer";
import AdminEmptyState from "@/admin/components/AdminEmptyState";
import { AdminField, AdminImageField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

const emptyProduct = {
  id: "",
  category: "books",
  name: "",
  description: "",
  price: 0,
  mrp: 0,
  offerLabel: "",
  sku: "",
  image: "",
  inStock: true,
  stockQty: 0,
  featured: false,
};

function discountOf(product) {
  if (!product.mrp || product.mrp <= product.price) return 0;
  return Math.round((1 - product.price / product.mrp) * 100);
}

export default function AdminShopPage() {
  const { data, patch } = useAdminCms();
  const [tab, setTab] = useState("catalog");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const products = useMemo(() => data.products || [], [data.products]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.category, p.sku, p.offerLabel].join(" ").toLowerCase().includes(q)
    );
  }, [products, query]);

  const saveProduct = (product) => {
    const next = { ...product, inStock: Number(product.stockQty) > 0 };
    const exists = products.some((p) => p.id === next.id);
    const list = exists
      ? products.map((p) => (p.id === next.id ? next : p))
      : [...products, next];
    patch({ products: list });
    setEditing(null);
  };

  const removeProduct = (id) => {
    if (!confirmAdminAction("Remove this shop item from the catalogue?")) return;
    patch({ products: products.filter((p) => p.id !== id) });
  };

  const updateOrderStatus = (id, status) => {
    patch({
      orders: data.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    });
  };

  const openNewProduct = () => {
    setEditing({
      ...emptyProduct,
      id: `item-${Date.now()}`,
      sku: `SSRRT-${String(products.length + 1).padStart(3, "0")}`,
    });
  };

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Shoppe</h1>
          <p>Manage catalogue items, prices, offers, and stock. The public shop reads this data from Firebase.</p>
        </div>
        {tab === "catalog" ? (
          <button type="button" className="admin-btn" onClick={openNewProduct}>Add item</button>
        ) : null}
      </header>

      <div className="admin-tabs" role="tablist" aria-label="Shop sections">
        {["catalog", "orders"].map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "on" : ""}
            onClick={() => setTab(id)}
          >
            {id === "catalog" ? "Catalogue" : "Orders"}
          </button>
        ))}
      </div>

      {tab === "catalog" && (
        <>
          <div className="admin-toolbar">
            <input
              className="admin-input"
              placeholder="Search name, SKU, category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {products.length === 0 ? (
            <AdminEmptyState
              title="No shop items yet"
              description="Add books, prints, or other offerings for the public Shoppe page."
              action={<button type="button" className="admin-btn sm" onClick={openNewProduct}>Add first item</button>}
            />
          ) : filtered.length === 0 ? (
            <AdminEmptyState title="No items match your search" description="Try a different name, SKU, or category." />
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Category</th>
                    <th scope="col">MRP</th>
                    <th scope="col">Price</th>
                    <th scope="col">Offer</th>
                    <th scope="col">Stock</th>
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="admin-prod-cell">
                          {p.image ? <img src={p.image} alt="" /> : <span className="admin-thumb-empty" />}
                          <div>
                            <strong>{p.name}</strong>
                            <span>{p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="cap">{p.category}</td>
                      <td>₹{p.mrp || p.price}</td>
                      <td>₹{p.price}</td>
                      <td>
                        {discountOf(p) > 0 ? `${discountOf(p)}% off` : "—"}
                        {p.offerLabel ? <div className="admin-offer">{p.offerLabel}</div> : null}
                      </td>
                      <td>{p.stockQty} {p.inStock ? "" : "· out"}</td>
                      <td className="admin-row-actions">
                        <button type="button" className="admin-ghost sm" onClick={() => setEditing(p)}>Edit</button>
                        <button type="button" className="admin-ghost sm danger" onClick={() => removeProduct(p.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === "orders" && (
        data.orders.length === 0 ? (
          <AdminEmptyState
            title="No orders yet"
            description="When online checkout is connected, customer orders will appear here for packing and shipping."
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Items</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>
                      {order.customer}
                      <div className="admin-muted">{order.email}</div>
                    </td>
                    <td>{order.items}</td>
                    <td>₹{order.total}</td>
                    <td>
                      <select
                        className="admin-input compact"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        {["Pending", "Paid", "Packed", "Shipped", "Delivered", "Cancelled"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {editing ? (
        <ProductEditor
          product={editing}
          onClose={() => setEditing(null)}
          onSave={saveProduct}
        />
      ) : null}
    </div>
  );
}

function ProductEditor({ product, onClose, onSave }) {
  const [form, setForm] = useState(product);
  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AdminDrawer
      title={product.name ? "Edit item" : "New item"}
      onClose={onClose}
      footer={(
        <>
          <button type="button" className="admin-ghost" onClick={onClose}>Cancel</button>
          <button
            type="submit"
            form="admin-product-form"
            className="admin-btn"
          >
            Save item
          </button>
        </>
      )}
    >
      <form
        id="admin-product-form"
        className="admin-stack"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...form,
            price: Number(form.price) || 0,
            mrp: Number(form.mrp) || Number(form.price) || 0,
            stockQty: Number(form.stockQty) || 0,
          });
        }}
      >
        <AdminField label="Name">
          <input className="admin-input" required value={form.name} onChange={set("name")} />
        </AdminField>
        <AdminField label="SKU">
          <input className="admin-input" value={form.sku} onChange={set("sku")} />
        </AdminField>
        <AdminField label="Category / tag">
          <select className="admin-input" value={form.category} onChange={set("category")}>
            {shopCategories.filter((c) => c.id !== "all").map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </AdminField>
        <AdminField label="Description">
          <textarea className="admin-input" rows={3} value={form.description} onChange={set("description")} />
        </AdminField>
        <div className="admin-two">
          <AdminField label="MRP (₹)">
            <input className="admin-input" type="number" min="0" value={form.mrp} onChange={set("mrp")} />
          </AdminField>
          <AdminField label="Selling price (₹)">
            <input className="admin-input" type="number" min="0" value={form.price} onChange={set("price")} />
          </AdminField>
        </div>
        <AdminField label="Offer label" hint="Shown as a badge, e.g. Festival offer">
          <input className="admin-input" value={form.offerLabel} onChange={set("offerLabel")} />
        </AdminField>
        <AdminField label="Stock quantity">
          <input className="admin-input" type="number" min="0" value={form.stockQty} onChange={set("stockQty")} />
        </AdminField>
        <label className="admin-check">
          <input type="checkbox" checked={form.featured} onChange={set("featured")} />
          Featured on Shoppe landing
        </label>
        <AdminImageField label="Product image" value={form.image} onChange={(v) => setForm((p) => ({ ...p, image: v }))} />
      </form>
    </AdminDrawer>
  );
}
