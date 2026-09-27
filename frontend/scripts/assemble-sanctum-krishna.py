#!/usr/bin/env python3
"""Rebuild public/sanctum/krishna.html from krishna-main.html (full Stitch body, no SSRRT swap)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SANCTUM = ROOT / "public" / "sanctum"
MAIN_SRC = SANCTUM / "krishna.html"
BODY_SRC = SANCTUM / "krishna-main.html"
OUT = SANCTUM / "krishna.html"


def extract_body_inner(html: str) -> str:
    m = re.search(r"<body[^>]*>(.*)</body>", html, re.DOTALL | re.IGNORECASE)
    if not m:
        raise SystemExit("Could not find <body> in source HTML")
    return m.group(1).strip()


def extract_body_attrs(html: str) -> str:
    m = re.search(r"<body([^>]*)>", html, re.IGNORECASE)
    return (m.group(1) or "").strip()


def extract_head_inner(html: str) -> str:
    m = re.search(r"<head[^>]*>(.*)</head>", html, re.DOTALL | re.IGNORECASE)
    if not m:
        raise SystemExit("Could not find <head>")
    inner = m.group(1)
    # Never pull SSRRT chrome into Stitch pages (legacy assemble injected these).
    inner = re.sub(r"\s*<link[^>]+ssrrt-chrome\.css[^>]*>\s*", "\n", inner, flags=re.I)
    inner = re.sub(
        r"\s*<link[^>]+Cormorant\+Garamond[^>]+Work\+Sans[^>]*>\s*",
        "\n",
        inner,
        flags=re.I,
    )
    return inner


def main() -> None:
    source = BODY_SRC if BODY_SRC.exists() else MAIN_SRC
    raw = source.read_text(encoding="utf-8")
    body_inner = extract_body_inner(raw)
    body_attrs = extract_body_attrs(raw)
    head_inner = extract_head_inner(raw)

    head_inner = re.sub(r"<meta charset=\"utf-8\">\s*", "", head_inner, flags=re.I)
    head_inner = re.sub(
        r'<meta content="width=device-width, initial-scale=1.0" name="viewport">\s*',
        "",
        head_inner,
        flags=re.I,
    )

    body_open = f"<body {body_attrs}>" if body_attrs else "<body>"

    page = f"""<!DOCTYPE html>
<html class="scroll-smooth" lang="en-IN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
{head_inner}
</head>
{body_open}
{body_inner}
</body>
</html>
"""

    OUT.write_text(page, encoding="utf-8")
    print(f"Assembled {OUT} (from {source.name}, Stitch chrome preserved)")


if __name__ == "__main__":
    main()
