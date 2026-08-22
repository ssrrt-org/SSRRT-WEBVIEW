import { HERO_PAGES } from "@/admin/adminSeed";
import { AdminField, AdminImageField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

export default function AdminHeroesPage() {
  const { data, patch } = useAdminCms();
  const groups = [...new Set(HERO_PAGES.map((p) => p.group))];

  const updateSlide = (id, key, value) => {
    patch({
      homeCarousel: data.homeCarousel.map((slide) =>
        slide.id === id ? { ...slide, [key]: value } : slide
      ),
    });
  };

  const addSlide = () => {
    patch({
      homeCarousel: [
        ...data.homeCarousel,
        { id: `slide-${Date.now()}`, img: "", label: "New slide", caption: "" },
      ],
    });
  };

  const removeSlide = (id) => {
    patch({ homeCarousel: data.homeCarousel.filter((s) => s.id !== id) });
  };

  const updateHero = (path, partial) => {
    patch({
      heroes: {
        ...data.heroes,
        [path]: { ...data.heroes[path], ...partial },
      },
    });
  };

  return (
    <div>
      <header className="admin-page-head">
        <h1>Page heroes</h1>
        <p>Home carousel plus the slim hero photograph on every inner page.</p>
      </header>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Home carousel</h2>
          <button type="button" className="admin-btn sm" onClick={addSlide}>Add slide</button>
        </div>
        <div className="admin-card-grid">
          {data.homeCarousel.map((slide, i) => (
            <article key={slide.id} className="admin-mini-card">
              <AdminImageField
                label={`Slide ${i + 1} image`}
                value={slide.img}
                onChange={(v) => updateSlide(slide.id, "img", v)}
              />
              <AdminField label="Label">
                <input className="admin-input" value={slide.label} onChange={(e) => updateSlide(slide.id, "label", e.target.value)} />
              </AdminField>
              <AdminField label="Caption">
                <input className="admin-input" value={slide.caption} onChange={(e) => updateSlide(slide.id, "caption", e.target.value)} />
              </AdminField>
              <button type="button" className="admin-ghost danger" onClick={() => removeSlide(slide.id)}>Remove</button>
            </article>
          ))}
        </div>
      </section>

      {groups.map((group) => (
        <section className="admin-panel" key={group}>
          <h2>{group}</h2>
          <div className="admin-card-grid">
            {HERO_PAGES.filter((p) => p.group === group).map((page) => {
              const hero = data.heroes[page.id] || { image: "", caption: "" };
              return (
                <article key={page.id} className="admin-mini-card">
                  <strong>{page.label}</strong>
                  <span className="admin-path">{page.id}</span>
                  <AdminImageField
                    label="Hero image"
                    value={hero.image}
                    onChange={(v) => updateHero(page.id, { image: v })}
                  />
                  <AdminField label="Caption / alt">
                    <input
                      className="admin-input"
                      value={hero.caption}
                      onChange={(e) => updateHero(page.id, { caption: e.target.value })}
                    />
                  </AdminField>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
