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
  - product_<handle>-400.avif
  - product_<handle>-800.avif
  - product_<handle>-1600.avif
  - product_<handle>-400.webp
  - product_<handle>-800.webp
  - product_<handle>-1600.webp

- testimonials/
  - testimonial_<slug>-48.avif
  - testimonial_<slug>-96.avif
  - testimonial_<slug>-192.avif

- lab_reports/
  - lab_<handle>.pdf

- avatars/
  - avatar_<name>-48.avif
  - avatar_<name>-96.avif

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
