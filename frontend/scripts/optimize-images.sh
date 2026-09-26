#!/usr/bin/env bash
# Regenerate JPEG derivatives for the home page and programme cards (macOS sips).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"
OPT="$PUBLIC/optimized"

mkdir -p "$OPT/home_hero" "$OPT/home_hero/thumb" "$OPT/cards" "$OPT/ssrrt"

for f in "$PUBLIC/home_hero"/*.jpg; do
  base=$(basename "$f")
  sips -Z 1400 -s format jpeg -s formatOptions 82 "$f" --out "$OPT/home_hero/$base"
  sips -Z 640 -s format jpeg -s formatOptions 78 "$f" --out "$OPT/home_hero/thumb/$base"
done

sips -Z 560 -s format jpeg -s formatOptions 85 "$PUBLIC/ssrrt/DivineMotherHome.png" --out "$OPT/ssrrt/DivineMotherHome.jpg"
sips -Z 800 -s format jpeg -s formatOptions 82 "$PUBLIC/Goshala/Goshalaaa1.JPG" --out "$OPT/cards/goshala.jpg"
sips -Z 800 -s format jpeg -s formatOptions 82 "$PUBLIC/medical service/medical1.JPG" --out "$OPT/cards/medical.jpg"
sips -Z 800 -s format jpeg -s formatOptions 82 "$PUBLIC/Seva images/sevas24.JPG" --out "$OPT/cards/narayana.jpg"
sips -Z 800 -s format jpeg -s formatOptions 82 "$PUBLIC/Seva images/sevas26.jpg" --out "$OPT/cards/village.jpg"

echo "Optimized assets written to $OPT"
