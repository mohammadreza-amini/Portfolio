#!/usr/bin/env python3
# ============================================================
# make_snapshot.py — ساخت خروجی zip از وضعیت فعلی پروژه
# کاربرد: بعد از اتمام هر مرحله، یک اسنپ‌شات قابل دانلود می‌سازد
# تا کاربر بتواند دقیقاً همین وضعیت را دانلود و محلی اجرا کند
#
# استفاده:  python3 scripts/make_snapshot.py [نام-مرحله]
# مثال:     python3 scripts/make_snapshot.py stage1a-pnpm
# خروجی:    download/portfolio-<نام-مرحله>.zip
# ============================================================
import sys
import zipfile
from pathlib import Path

ROOT = Path("/home/z/my-project")
OUT_DIR = ROOT / "download"

# پوشه‌هایی که هرگز داخل اسنپ‌شات نمی‌روند (سندباکس / خروجی‌های موقت)
EXCLUDE_DIRS = {
    "node_modules", ".nuxt", ".output", ".data", ".git",
    "skills", "download", "agent-ctx", ".turbo", ".cache",
}
# فایل‌های منفرد ممنوعه (سکرت‌ها، لاگ‌ها و لاک‌فایل‌های پکیج‌منیجرهای دیگر —
# پروژه فقط pnpm است و رانر سندباکس گاهی bun.lock می‌سازد؛ نباید به کاربر برسد)
EXCLUDE_FILES = {
    ".env", "dev.log",
    "bun.lock", "bun.lockb", "yarn.lock",
    "package-lock.json", "npm-shrinkwrap.json", "deno.lock",
}

def main() -> None:
    stage = sys.argv[1] if len(sys.argv) > 1 else "snapshot"
    out_path = OUT_DIR / f"portfolio-{stage}.zip"
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    included: list[str] = []
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(ROOT.rglob("*")):
            rel = path.relative_to(ROOT)
            # فیلتر بر اساس اجزای مسیر
            if any(part in EXCLUDE_DIRS for part in rel.parts):
                continue
            if path.is_file():
                if path.name in EXCLUDE_FILES or path.suffix == ".log":
                    continue
                zf.write(path, arcname=str(rel))
                included.append(str(rel))

    size_kb = out_path.stat().st_size / 1024
    print(f"✓ snapshot: {out_path} ({size_kb:.0f} KB, {len(included)} files)")
    for f in included:
        print(f"   + {f}")

if __name__ == "__main__":
    main()
