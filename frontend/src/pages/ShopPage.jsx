import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";
import HashRedirect from "@/components/shared/HashRedirect";
import ProductCard from "@/components/shop/ProductCard";
import ShopCartButton from "@/components/shop/ShopCartButton";
import { useShopProducts } from "@/context/CmsContext";
import { shopCategories } from "@/constants/shopProducts";

const CATEGORY_IDS = shopCategories.map((c) => c.id);

export default function ShopPage() {
  const shopProducts = useShopProducts();
  const maxPrice = useMemo(
    () => Math.max(0, ...shopProducts.map((product) => product.price)),
    [shopProducts],
  );
  const { category: routeCategory } = useParams();
  const navigate = useNavigate();
  const hashIds = shopCategories.filter((c) => c.id !== "all").map((c) => c.id);

  const routeCat = routeCategory && CATEGORY_IDS.includes(routeCategory) && routeCategory !== "all"
    ? routeCategory
    : "all";

  const [category, setCategory] = useState(routeCat);
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState(maxPrice);

  useEffect(() => {
    setPriceMax(maxPrice);
  }, [maxPrice]);

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
    return shopProducts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (p.price > priceMax) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    });
  }, [category, search, priceMax, shopProducts]);

  return (
    <>
      <HashRedirect basePath="/shop" ids={hashIds} />

      <section className="shop-store shop-store-full">
        <div className="shop-store-layout">
          <aside className="shop-sidebar" aria-label="Shop filters">
            <div className="shop-page-head">
              <Eyebrow>Shoppe</Eyebrow>
              <h1>Books, audio, padukas, and sacred items.</h1>
            </div>

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
                  max={maxPrice}
                  step={50}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  data-testid="shop-price-range"
                />
              </label>
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
