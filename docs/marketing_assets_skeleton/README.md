Marketing Assets Skeleton

Drop final assets into the matching folders and update `ASSET_MANIFEST_TEMPLATE.json`.

Folder structure (place files with exact filenames):

- hero/
  - hero-desktop.avif
  - hero-desktop.webp
  - hero-desktop.jpg
  - hero-mobile.avif
  - hero-mobile.webp
  - hero-mobile.jpg

- products/<handle>/
  - product\_<handle>-400.avif
  - product\_<handle>-800.avif
  - product\_<handle>-1600.avif
  - product\_<handle>-400.webp
  - product\_<handle>-800.webp
  - product\_<handle>-1600.webp

- testimonials/
  - testimonial\_<slug>-48.avif
  - testimonial\_<slug>-96.avif
  - testimonial\_<slug>-192.avif

- lab_reports/
  - lab\_<handle>.pdf

- avatars/
  - avatar\_<name>-48.avif
  - avatar\_<name>-96.avif

- og/
  - og-home.png
  - og-product-<handle>.png

- logos/
  - logo.svg
  - trust-lab.svg
  - badge-30day.svg

How to produce a zip for upload (mac/linux/pwsh):

PowerShell (Windows):

Compress-Archive -Path .\marketing_assets_skeleton\* -DestinationPath marketing_assets.zip

macOS / Linux:

zip -r marketing_assets.zip marketing_assets_skeleton/

After zipping: attach the zip and update `docs/ASSET_MANIFEST_TEMPLATE.json` with real filenames and fields.
