import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { SlimHead } from "@/components/shared/PageSections";
import HashRedirect from "@/components/shared/HashRedirect";
import ProductCard from "@/components/shop/ProductCard";
import ShopCartButton from "@/components/shop/ShopCartButton";
import { shopCategories, shopProducts } from "@/constants/shopProducts";

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name", label: "Name" },
];

const MAX_PRICE = Math.max(...shopProducts.map((p) => p.price));
const CATEGORY_IDS = shopCategories.map((c) => c.id);

export default function ShopPage() {
  const { category: routeCategory } = useParams();
  const navigate = useNavigate();
  const hashIds = shopCategories.filter((c) => c.id !== "all").map((c) => c.id);

  const routeCat = routeCategory && CATEGORY_IDS.includes(routeCategory) && routeCategory !== "all"
    ? routeCategory
    : "all";

  const [category, setCategory] = useState(routeCat);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [priceMax, setPriceMax] = useState(MAX_PRICE);

  useEffect(() => {
    setCategory(routeCat);
  }, [routeCat]);

  const pickCategory = (catId) => {
    setCategory(catId);
    if (catId === "all") navigate("/shop");
    else navigate(`/shop/${catId}`);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = shopProducts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (p.price > priceMax) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    });

    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [category, search, sort, priceMax]);

  return (
    <>
      <HashRedirect basePath="/shop" ids={hashIds} />

      <SlimHead
        eyebrow="Shoppe"
        title="Books, audio, padukas, and sacred items."
      />

      <section className="shop-store shop-store-full">
        <div className="shop-store-layout">
          <aside className="shop-sidebar" aria-label="Shop filters">
            <div className="shop-sidebar-block">
              <h2>Categories</h2>
              <ul className="shop-cat-list">
                {shopCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={category === cat.id ? "on" : ""}
                      data-testid={`shop-filter-${cat.id}`}
                      onClick={() => pickCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shop-sidebar-block">
              <h2>Price range</h2>
              <label className="shop-price-label">
                <span>Up to {priceMax.toLocaleString("en-IN")} ₹</span>
                <input
                  type="range"
                  min={0}
                  max={MAX_PRICE}
                  step={50}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  data-testid="shop-price-range"
                />
              </label>
            </div>

            <div className="shop-sidebar-block">
              <h2>Sort by</h2>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="shop-sort-select"
                data-testid="shop-sort-sidebar"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          </aside>

          <div className="shop-main">
            <div className="shop-main-toolbar">
              <div className="shop-search-row">
                <div className="shop-search">
                  <Search size={18} aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search for products…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    data-testid="shop-search"
                  />
                </div>
                <ShopCartButton variant="toolbar" />
              </div>
              <div className="shop-toolbar-meta">
                <span data-testid="shop-results-count">
                  Showing {filtered.length} of {shopProducts.length} products
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="shop-sort-select compact"
                  data-testid="shop-sort-toolbar"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="shop-empty" data-testid="shop-empty">
                <p>No products match your filters. Try adjusting categories or price range.</p>
              </div>
            ) : (
              <div className="shop-product-grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
