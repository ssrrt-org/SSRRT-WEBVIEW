import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import ShopCartButton from "@/components/shop/ShopCartButton";
import { navItems } from "@/constants/nav";

const MOBILE_NAV_MQ = "(max-width: 900px)";

function NavDropMenu({ item, onClick }) {
  if (item.groups) {
    return item.groups.map((group) => (
      <div className="nav-drop-group" key={group.heading}>
        <div className="nav-drop-heading">{group.heading}</div>
        {group.links.map((link) => (
          <Link
            key={link.label + link.path}
            data-testid={`nav-sub-${link.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-link`}
            to={link.path}
            onClick={onClick}
            role="menuitem"
          >
            {link.label}
          </Link>
        ))}
      </div>
    ));
  }

  return item.sub.map((s) => (
    <Link
      key={s.label + s.path}
      data-testid={`nav-sub-${s.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-link`}
      to={s.path}
      onClick={onClick}
      role="menuitem"
    >
      {s.label}
    </Link>
  ));
}

function NavItem({ item, onClick, isMobile, expanded, onExpand }) {
  const hasGroups = Array.isArray(item.groups) && item.groups.length > 0;
  const hasSub = Array.isArray(item.sub) && item.sub.length > 0;
  const hasMenu = hasGroups || hasSub;
  const testid = `nav-${item.label.toLowerCase().replaceAll(" ", "-")}-link`;
  const isExpanded = expanded === item.label;

  const handleTriggerClick = (e) => {
    if (isMobile && hasMenu) {
      if (!isExpanded) {
        e.preventDefault();
        onExpand(item.label);
        return;
      }
    }
    onClick();
  };

  if (item.donate) {
    return (
      <NavLink
        data-testid="nav-donate-link"
        to={item.path}
        onClick={onClick}
        className="nav-donate"
      >
        {item.label}
      </NavLink>
    );
  }

  if (!hasMenu) {
    return (
      <NavLink data-testid={testid} to={item.path} onClick={onClick}>
        {item.label}
      </NavLink>
    );
  }

  return (
    <div
      className={`nav-drop${isMobile && isExpanded ? " open" : ""}`}
      data-testid={`nav-drop-${item.label.toLowerCase().replaceAll(" ", "-")}`}
    >
      <NavLink
        data-testid={testid}
        to={item.path}
        onClick={handleTriggerClick}
        className="nav-drop-trigger"
      >
        {item.label}{" "}
        <ChevronDown
          size={13}
          className={`nav-chevron${isMobile && isExpanded ? " rotated" : ""}`}
          aria-hidden="true"
        />
      </NavLink>
      <div className="nav-drop-menu" role="menu">
        <NavDropMenu item={item} onClick={onClick} />
      </div>
    </div>
  );
}

function NavLinks({ onClick, isMobile, expandedDrop, onExpand }) {
  return navItems.map((item) => (
    <NavItem
      key={item.label}
      item={item}
      onClick={onClick}
      isMobile={isMobile}
      expanded={expandedDrop}
      onExpand={onExpand}
    />
  ));
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expandedDrop, setExpandedDrop] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_MQ);
    const sync = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (!mobile) {
        setOpen(false);
        setExpandedDrop(null);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open || !isMobile) {
      document.body.classList.remove("nav-open");
      document.body.style.top = "";
      return;
    }

    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("nav-open");

    return () => {
      document.body.classList.remove("nav-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open, isMobile]);

  const closeMenu = () => {
    setOpen(false);
    setExpandedDrop(null);
  };

  const toggleMenu = () => {
    setOpen((prev) => {
      if (prev) setExpandedDrop(null);
      return !prev;
    });
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span className="topbar-location">
            <span className="topbar-location-full">River Cauvery · Karekura, Mysore, Karnataka</span>
            <span className="topbar-location-short">Karekura, Mysore · Karnataka</span>
          </span>
          <div className="topbar-actions">
            <ShopCartButton />
            <Link data-testid="topbar-donate-link" to="/donate">
              Make an offering <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <header className={`site-header${open && isMobile ? " menu-open" : ""}`}>
        <div className="wrap brand-row">
          <Link className="brand-devi-wrap" to="/" data-testid="brand-home-link" aria-label="Home">
            <img src="/ssrrt/devi-logo.jpg" alt="Sri Rajarajeshwari Devi" className="brand-devi" />
          </Link>
          <div className="brand-title">
            <p className="brand-name">SRIMAD SAI RAJARAJESHWARI TRUST</p>
            <small>Goshala · Ashram · Seva · Karekura</small>
          </div>
          <div className="brand-yantra-wrap" aria-hidden="true">
            <img src="/ssrrt/sri-yantra.jpg" alt="" className="brand-yantra" />
          </div>
          <button
            type="button"
            className="menu-trigger"
            data-testid="mobile-navigation-toggle"
            onClick={toggleMenu}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {!isMobile && (
          <>
            <div className="header-rule" aria-hidden="true" />
            <div className="wrap nav-row">
              <nav className="nav">
                <NavLinks onClick={closeMenu} isMobile={false} expandedDrop={null} onExpand={() => {}} />
              </nav>
            </div>
          </>
        )}
      </header>

      {isMobile && (
        <>
          <button
            type="button"
            className={`nav-backdrop${open ? " visible" : ""}`}
            aria-hidden={!open}
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
          />
          <div
            id="mobile-nav-panel"
            className={`mobile-nav-panel${open ? " open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            aria-label="Site navigation"
          >
            <nav className="nav mobile-nav">
              <NavLinks
                onClick={closeMenu}
                isMobile
                expandedDrop={expandedDrop}
                onExpand={setExpandedDrop}
              />
            </nav>
          </div>
        </>
      )}
    </>
  );
}
