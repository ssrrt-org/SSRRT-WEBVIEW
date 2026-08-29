import { useEffect } from "react";

export default function AdminDrawer({ title, onClose, children, footer }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="admin-drawer-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="admin-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admin-drawer-head">
          <h2>{title}</h2>
          <button type="button" className="admin-ghost sm" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>
        <div className="admin-drawer-body">{children}</div>
        {footer ? <div className="admin-drawer-actions">{footer}</div> : null}
      </div>
    </div>
  );
}
