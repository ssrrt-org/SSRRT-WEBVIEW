import { useMemo, useState } from "react";
import { confirmAdminAction } from "@/admin/adminUtils";
import AdminEmptyState from "@/admin/components/AdminEmptyState";
import { AdminAutoSaveHint, AdminField, AdminImageField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";
import { PAGE_IMAGE_GROUPS } from "@/constants/pageImageCatalog";

export default function AdminPageImagesPage() {
  const { data, patch, patchDebounced } = useAdminCms();
  const [query, setQuery] = useState("");
  const [openGroup, setOpenGroup] = useState("home");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PAGE_IMAGE_GROUPS;
    return PAGE_IMAGE_GROUPS.map((group) => ({
      ...group,
      pages: group.pages.filter((entry) =>
        [entry.label, entry.path, group.label].join(" ").toLowerCase().includes(q)
      ),
    })).filter((group) => group.pages.length > 0);
  }, [query]);

  const visibleGroups = useMemo(() => {
    if (query.trim()) return filteredGroups;
    return PAGE_IMAGE_GROUPS.filter((group) => group.id === openGroup);
  }, [query, filteredGroups, openGroup]);

  const setSlot = (path, slotId, image) => {
    patchDebounced({
      pageImages: {
        [path]: {
          ...(data.pageImages?.[path] || {}),
          [slotId]: image,
        },
      },
    });
  };

  const updateSlide = (id, key, value) => {
    patchDebounced({
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
    if (!confirmAdminAction("Remove this carousel slide?")) return;
    patch({ homeCarousel: data.homeCarousel.filter((s) => s.id !== id) });
  };

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Page images</h1>
          <p>
            Every photo on the public site, organised page by page — banner, splits, galleries, and cards.
            Changes save automatically after you pause typing.
          </p>
          <AdminAutoSaveHint />
        </div>
      </header>

      <div className="admin-toolbar">
        <input
          className="admin-input"
          placeholder="Search by page name or URL…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="admin-group-tabs">
        {PAGE_IMAGE_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            className={openGroup === group.id ? "on" : ""}
            onClick={() => setOpenGroup(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      {visibleGroups.length === 0 ? (
        <AdminEmptyState title="No pages match your search" description="Try another page name or section." />
      ) : (
        visibleGroups.map((group) => (
          <section className="admin-panel admin-page-images-group" key={group.id} id={`group-${group.id}`}>
            <div className="admin-panel-head">
              <div>
                <h2>{group.label}</h2>
                <p className="admin-muted">{group.pages.length} page{group.pages.length === 1 ? "" : "s"}</p>
              </div>
            </div>

            {group.carousel ? (
              <div className="admin-subpanel">
                <div className="admin-panel-head">
                  <h3>Home · Carousel slides</h3>
                  <button type="button" className="admin-btn sm" onClick={addSlide}>Add slide</button>
                </div>
                <div className="admin-card-grid">
                  {data.homeCarousel.map((slide, i) => (
                    <article key={slide.id} className="admin-mini-card">
                      <AdminImageField
                        label={`Slide ${i + 1}`}
                        value={slide.img}
                        onChange={(v) => updateSlide(slide.id, "img", v)}
                      />
                      <AdminField label="Label">
                        <input className="admin-input" value={slide.label} onChange={(e) => updateSlide(slide.id, "label", e.target.value)} />
                      </AdminField>
                      <AdminField label="Caption">
                        <input className="admin-input" value={slide.caption} onChange={(e) => updateSlide(slide.id, "caption", e.target.value)} />
                      </AdminField>
                      <button type="button" className="admin-ghost sm danger" onClick={() => removeSlide(slide.id)}>Remove slide</button>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {group.pages.map((entry) => (
              <div className="admin-subpanel" key={entry.path}>
                <div className="admin-page-images-head">
                  <div>
                    <h3>{entry.label}</h3>
                    <span className="admin-path">{entry.path}</span>
                  </div>
                </div>
                <div className="admin-image-slot-grid">
                  {entry.slots.map((slot) => (
                    <AdminImageField
                      key={`${entry.path}-${slot.id}`}
                      label={slot.label}
                      value={data.pageImages?.[entry.path]?.[slot.id] || ""}
                      onChange={(v) => setSlot(entry.path, slot.id, v)}
                      hint={slot.id === "hero" ? "Wide banner at the top of this page" : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
}
