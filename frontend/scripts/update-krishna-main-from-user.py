#!/usr/bin/env python3
"""Write krishna-main.html from embedded user Stitch content (main-only export)."""
from pathlib import Path

# User-provided HTML: head + <main> only (no Stitch chrome, no footer).
USER_HTML = r"""<!DOCTYPE html><html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Vishnu Maya — Temple of Lord Krishna | Srimad Sai Rajarajeshwari Trust (SSRRT)</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..700;1,400..700&amp;family=Noto+Serif:ital,wght@0,400..700;1,400..700&amp;family=Work+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "on-surface": "#1f1b15",
            "primary-fixed": "#dce1ff",
            "error": "#ba1a1a",
            "surface-container-lowest": "#ffffff",
            "surface-variant": "#ebe1d7",
            "tertiary": "#211400",
            "on-primary-fixed-variant": "#3e4662",
            "primary-fixed-dim": "#bec5e8",
            "tertiary-container": "#3c2700",
            "secondary-fixed-dim": "#ffb5a0",
            "on-secondary": "#ffffff",
            "background": "#fff8f4",
            "secondary-fixed": "#ffdbd1",
            "on-tertiary-container": "#ba8a31",
            "on-primary-container": "#8991b2",
            "on-background": "#1f1b15",
            "on-primary": "#ffffff",
            "inverse-surface": "#353029",
            "on-tertiary-fixed-variant": "#5f4100",
            "primary": "#0d152f",
            "tertiary-fixed-dim": "#f4bd5f",
            "on-secondary-fixed-variant": "#82280d",
            "surface-bright": "#fff8f4",
            "on-tertiary-fixed": "#281900",
            "on-surface-variant": "#45464d",
            "inverse-on-surface": "#faefe5",
            "surface-tint": "#555d7b",
            "outline-variant": "#c6c6ce",
            "surface-container-high": "#f1e6dd",
            "inverse-primary": "#bec5e8",
            "on-error": "#ffffff",
            "error-container": "#ffdad6",
            "on-tertiary": "#ffffff",
            "secondary-container": "#fd8361",
            "on-error-container": "#93000a",
            "surface-dim": "#e2d8cf",
            "on-secondary-container": "#721c03",
            "tertiary-fixed": "#ffdeac",
            "on-secondary-fixed": "#3b0900",
            "surface-container": "#f7ece2",
            "secondary": "#a13f22",
            "outline": "#76767e",
            "primary-container": "#222a45",
            "surface-container-low": "#fcf2e8",
            "surface-container-highest": "#ebe1d7",
            "on-primary-fixed": "#121a34",
            "surface": "#fff8f4"
          },
          "borderRadius": {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
          },
          "spacing": {
            "gutter-mobile": "1rem",
            "space-sm": "0.75rem",
            "margin": "4rem",
            "gutter": "1.5rem",
            "space-xl": "4rem",
            "margin-mobile": "1.25rem",
            "space-xs": "0.375rem",
            "space-md": "1.25rem",
            "space-lg": "2.25rem"
          },
          "fontFamily": {
            "headline-lg": ["EB Garamond"],
            "display-lg-mobile": ["EB Garamond"],
            "headline-md": ["EB Garamond"],
            "headline-lg-mobile": ["EB Garamond"],
            "headline-sm": ["EB Garamond"],
            "label-lg": ["Work Sans"],
            "display-lg": ["EB Garamond"],
            "label-md": ["Work Sans"],
            "sanskrit-verse": ["Noto Serif"],
            "body-md": ["Work Sans"],
            "body-lg": ["Work Sans"],
            "body-sm": ["Work Sans"]
          },
          "fontSize": {
            "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.01em", "fontWeight": "500" }],
            "display-lg-mobile": ["36px", { "lineHeight": "44px", "fontWeight": "400" }],
            "headline-md": ["28px", { "lineHeight": "36px", "fontWeight": "500" }],
            "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "500" }],
            "headline-sm": ["22px", { "lineHeight": "30px", "fontWeight": "600" }],
            "label-lg": ["13px", { "lineHeight": "18px", "letterSpacing": "0.12em", "fontWeight": "600" }],
            "display-lg": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.01em", "fontWeight": "400" }],
            "label-md": ["11px", { "lineHeight": "16px", "letterSpacing": "0.14em", "fontWeight": "600" }],
            "sanskrit-verse": ["20px", { "lineHeight": "34px", "letterSpacing": "0.02em", "fontWeight": "400" }],
            "body-md": ["16px", { "lineHeight": "26px", "fontWeight": "400" }],
            "body-lg": ["18px", { "lineHeight": "30px", "fontWeight": "400" }],
            "body-sm": ["14px", { "lineHeight": "22px", "fontWeight": "400" }]
          }
        },
      },
    }
  </script>
<style>
    .gold-filigree-border {
      box-shadow: inset 0 0 0 1px #DFC488, inset 0 0 0 4px rgba(223, 196, 136, 0.2);
    }
    .temple-shadow {
      box-shadow: 0 8px 30px rgba(34, 42, 69, 0.05), 0 1px 3px rgba(201, 151, 61, 0.08);
    }
  </style>
</head>
<body class="bg-[#FBF6EC] text-on-surface font-body-md text-body-md antialiased selection:bg-[#DFC488] selection:text-primary">
PLACEHOLDER_MAIN
</body></html>"""

# Main block read from external file if present (full user paste too large for one string).
MAIN_FILE = Path(__file__).resolve().parents[1] / "public" / "sanctum" / "_user-main-fragment.html"

if __name__ == "__main__":
    out = Path(__file__).resolve().parents[1] / "public" / "sanctum" / "krishna-main.html"
    if MAIN_FILE.exists():
        main = MAIN_FILE.read_text(encoding="utf-8").strip()
        if not main.startswith("<main"):
            raise SystemExit("_user-main-fragment.html must start with <main")
        html = USER_HTML.replace("PLACEHOLDER_MAIN", main)
        out.write_text(html, encoding="utf-8")
        print(f"Wrote {out}")
    else:
        print(f"Missing {MAIN_FILE} — create it with user's <main>...</main> only")
