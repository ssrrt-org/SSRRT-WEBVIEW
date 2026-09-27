#!/usr/bin/env python3
"""Wire Stitch krishna.html to SSRRT paths and local images."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "public" / "sanctum" / "krishna.html"
# Edit krishna-main.html (full page incl. Stitch nav), then:
#   python3 scripts/assemble-sanctum-krishna.py && python3 scripts/patch-sanctum-krishna-html.py
text = path.read_text(encoding="utf-8")

HERO = "/god/lord%20jagdeesha/krishna1.JPG"
ABOUT = "/Concentratedspace/Concentratedspace13.jpg"

replacements = [
    ('href="#donate"', 'href="/donate"'),
    ('href="#goshala"', 'href="/goshala"'),
    ('href="#cart"', 'href="/shop"'),
    ('href="#offer-prayers"', 'href="/contact"'),
    ('href="#plan-visit"', 'href="#plan-visit"'),
    ('href="#sankalpa"', 'href="/contact"'),
    (
        '<a class="font-headline-sm text-headline-sm font-semibold tracking-wider text-primary block leading-tight" href="#">',
        '<a class="font-headline-sm text-headline-sm font-semibold tracking-wider text-primary block leading-tight" href="/">',
    ),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Home</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/">Home</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Mother</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/mother">Mother</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Mother for Needy</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/mother-for-needy">Mother for Needy</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Goshala</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/goshala">Goshala</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Rural Upliftment</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/rural-upliftment">Rural Upliftment</a>'),
    ('<a class="text-secondary font-semibold border-b-2 border-secondary pb-0.5" href="#">Consecrated Space</a>',
     '<a class="text-secondary font-semibold border-b-2 border-secondary pb-0.5" href="/ashram">Consecrated Space</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Sevas</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/sevas">Sevas</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">SSRRT</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/about">SSRRT</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Shoppe</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/shop">Shoppe</a>'),
    ('<a class="hover:text-secondary transition-colors duration-200" href="#">Volunteer</a>',
     '<a class="hover:text-secondary transition-colors duration-200" href="/volunteering">Volunteer</a>'),
    ('<a class="hover:text-[#DFC488] transition-colors" href="#">Home</a>',
     '<a class="hover:text-[#DFC488] transition-colors" href="/">Home</a>'),
    ('<a class="hover:text-[#DFC488] transition-colors" href="#">Ashram &amp; Temples</a>',
     '<a class="hover:text-[#DFC488] transition-colors" href="/ashram">Ashram &amp; Temples</a>'),
    ('href="#">Lord Ganesha</a>', 'href="/ashram/ganesha">Lord Ganesha</a>'),
    ('group temple-shadow" href="#">\n<div class="text-secondary text-xs font-label-md tracking-wider uppercase mb-1">Maha Kailasha</div>',
     'group temple-shadow" href="/ashram/shiva">\n<div class="text-secondary text-xs font-label-md tracking-wider uppercase mb-1">Maha Kailasha</div>'),
]

# Shrine links (first ganesha card)
text = text.replace(
    '<a class="bg-surface-container-lowest p-4 rounded border border-[#E7DFCE] hover:border-secondary transition-all group temple-shadow" href="#">\n<div class="text-secondary text-xs font-label-md tracking-wider uppercase mb-1">Prathama Vighnaharta</div>',
    '<a class="bg-surface-container-lowest p-4 rounded border border-[#E7DFCE] hover:border-secondary transition-all group temple-shadow" href="/ashram/ganesha">\n<div class="text-secondary text-xs font-label-md tracking-wider uppercase mb-1">Prathama Vighnaharta</div>',
)

shrine_hrefs = [
    ("Maha Kailasha", "/ashram/shiva"),
    ("Sadguru Nilaya", "/ashram/shirdi"),
    ("Skanda Sannidhi", "/ashram/subramanya"),
    ("Trimurti Swaroopa", "/ashram/dattatreya"),
    ("Sri Chakra Nilayam", "/ashram/manidweepa"),
    ("Ananda Tandava", "/ashram/nataraja"),
]
for label, href in shrine_hrefs:
    needle = f'group temple-shadow" href="#">\n<div class="text-secondary text-xs font-label-md tracking-wider uppercase mb-1">{label}</div>'
    repl = f'group temple-shadow" href="{href}">\n<div class="text-secondary text-xs font-label-md tracking-wider uppercase mb-1">{label}</div>'
    text = text.replace(needle, repl)

for old, new in replacements:
    text = text.replace(old, new)

# Google placeholder images -> local
import re

text = re.sub(
    r'src="https://lh3\.googleusercontent\.com/aida-public/[^"]+"',
    f'src="{HERO}"',
    text,
    count=1,
)
text = re.sub(
    r'src="https://lh3\.googleusercontent\.com/aida-public/[^"]+"',
    f'src="{ABOUT}"',
    text,
    count=1,
)

note = "<!-- Standalone Sacred Sanctum page (Stitch export). Edit here; React app links /ashram/krishna → this file. -->\n"
if "Standalone Sacred Sanctum" not in text:
    text = text.replace("<body", note + "<body", 1)

path.write_text(text, encoding="utf-8")
print(f"Patched {path}")
