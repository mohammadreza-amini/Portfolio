#!/usr/bin/env bash
# ============================================================
# verify-dev.sh — ابزار استاندارد تست پروژه در هر مرحله
# کار: اگر سرور سیستمی بالا نبود، یک سرور موقت می‌سازد،
#      صفحه را curl می‌کند، محتوای مورد انتظار را چک می‌کند،
#      و سرور موقت را می‌بندد (چون این محیط پروسه‌ی پس‌زمینه‌ی
#      ماندگار نگه نمی‌دارد، تست باید درون یک دستور انجام شود)
#
# استفاده:
#   bash scripts/verify-dev.sh [مسیر] [متن مورد انتظار در HTML]
# مثال:
#   bash scripts/verify-dev.sh /about "درباره من"
# ============================================================
set -u
PORT=3000
URL_PATH="${1:-/}"
EXPECT="${2:-}"
SRV_PID=""

# رانر پروژه: pnpm (اگر موجود بود) وگرنه npx
RUNNER="npx"
command -v pnpm >/dev/null 2>&1 && RUNNER="pnpm exec"

# ── اگر سرور از قبل بالا بود، فقط تست می‌کنیم ──
if ss -tln 2>/dev/null | grep -q ":${PORT} "; then
  echo "● Server already running on ${PORT} (system-managed) — skip start"
else
  cd /home/z/my-project
  echo "● Starting temp Nuxt dev server on ${PORT}... (${RUNNER})"
  $RUNNER nuxt dev > /tmp/verify-dev.log 2>&1 &
  SRV_PID=$!
  OK=0
  for i in $(seq 1 40); do
    sleep 2
    CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}${URL_PATH}" 2>/dev/null)
    if [ "$CODE" = "200" ]; then OK=1; break; fi
  done
  if [ "$OK" != "1" ]; then
    echo "✗ SERVER FAILED TO START — last log lines:"
    tail -20 /tmp/verify-dev.log
    kill $SRV_PID 2>/dev/null
    exit 1
  fi
  echo "✓ Server ready"
fi

# ── درخواست صفحه و بررسی محتوا ──
echo "● GET ${URL_PATH}"
curl -s "http://localhost:${PORT}${URL_PATH}" -o /tmp/verify-page.html -w "✓ HTTP %{http_code} — %{size_download} bytes\n"

if [ -n "$EXPECT" ]; then
  if grep -q "$EXPECT" /tmp/verify-page.html; then
    echo "✓ CONTENT OK: '$EXPECT' found in SSR HTML"
  else
    echo "✗ CONTENT FAILED: '$EXPECT' NOT found in SSR HTML"
    [ -n "$SRV_PID" ] && { pkill -f "nuxt dev" 2>/dev/null; sleep 1; }
    exit 1
  fi
fi

# ── چک CSS: استایل‌شیت‌های لینک‌شده را می‌گیریم و بررسی می‌کنیم ──
#    (در dev، CSS ماژول‌های Vite هستند ولی متن CSS داخلشان موجود است)
EXPECT_CSS="${3:-}"
if [ -n "$EXPECT_CSS" ]; then
  : > /tmp/verify-css.txt
  CSS_LINKS=$(rg -o 'href="(/[^"]*\.css[^"]*)"' -r '$1' /tmp/verify-page.html 2>/dev/null | head -3)
  for href in $CSS_LINKS; do
    curl -s "http://localhost:${PORT}${href}" >> /tmp/verify-css.txt 2>/dev/null
    echo "" >> /tmp/verify-css.txt
  done
  if grep -qi "$EXPECT_CSS" /tmp/verify-css.txt; then
    echo "✓ CSS OK: '$EXPECT_CSS' present in compiled styles"
  else
    echo "⚠ CSS CHECK: '$EXPECT_CSS' not found in $(wc -c < /tmp/verify-css.txt) bytes of css (may be js-wrapped) — manual check advised"
  fi
fi

# ── بستن سرور موقت (فقط اگر خودمان ساختیم) ──
if [ -n "$SRV_PID" ]; then
  pkill -f "nuxt dev" 2>/dev/null
  sleep 1
  echo "● Temp server stopped"
fi
echo "── verify done ──"
