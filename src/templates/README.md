# Templates HTML

Folder ini berisi template undangan HTML standalone. Setiap template harus bisa dibuka langsung dari `index.html` tanpa dependency build Next.js.

## Struktur Folder

Template dikelompokkan berdasarkan tier dan kategori:

```text
templates_html/
  basic/
  premium/
    tradition/
      cit-wayang-01/
      cit-wayang-02/
    special-photo/
      cit-special-01/
  exclusive/
```

Setiap folder template final hanya boleh berisi:

```text
template-name/
  index.html
  assets/
    audio/
    decorations/
    images/
```

Jangan tambahkan folder `css/`, `js/`, `fonts/`, `media/`, atau file log pada template final.

## Penamaan Template

Gunakan format:

```text
cit-{tema}-{nomor}
```

Contoh:

- `cit-wayang-01`
- `cit-wayang-02`
- `cit-special-01`

Nama folder harus lowercase, memakai dash, dan tidak memakai spasi.

## Penamaan Asset

Semua asset visual harus memakai nama semantic, bukan nama acak hasil scrape.

Format umum:

```text
{tema}-{nomor}-{fungsi}-{varian}.webp
```

Contoh untuk decorations:

- `wayang-02-hero-cloud.webp`
- `wayang-02-frame-top.webp`
- `special-01-hero-1.webp`
- `special-01-flower-cover-1.webp`
- `special-01-bank-bca-logo.webp`

Contoh untuk images:

- `wayang-02-profile-groom.webp`
- `wayang-02-profile-bride.webp`
- `special-01-gallery-01.webp`
- `special-01-couple-groom.webp`

Contoh untuk audio:

- `wayang-02-gamelan-backsound.mp3`
- `special-01-wedding-backsound.mp3`

Jika ada beberapa ukuran dari asset yang sama, boleh pakai suffix ukuran asli:

- `special-01-bank-bca-logo-300x95.webp`
- `special-01-bank-bca-logo-768x244.webp`
- `special-01-bank-bca-logo-1024x325.webp`

Gunakan istilah yang konsisten dan mudah dibaca dalam Bahasa Inggris untuk asset baru, misalnya `special-01-hero-1.webp`, bukan nama mentah hasil scrape seperti timestamp, ID upload, atau slug WordPress.

## Aturan Format Asset

Asset visual di folder ini wajib `.webp`:

- `assets/decorations/`
- `assets/images/`

Asset audio boleh tetap memakai format sumber yang umum:

- `.mp3`
- `.ogg`
- `.wav`

SVG visual tidak disimpan sebagai file terpisah pada template final. Jika SVG masih diperlukan, inline langsung sebagai `data:image/svg+xml;base64,...` di `index.html`.

Font tidak disimpan di folder terpisah. Jika font perlu offline, inline sebagai `data:` URI di dalam `@font-face`.

## Aturan HTML Standalone

`index.html` harus berisi semua CSS dan JS yang dibutuhkan template.

Wajib:

- Inline semua `<link rel="stylesheet">` menjadi `<style>`.
- Inline semua `<script src="...">` menjadi `<script>` jika script tersebut diperlukan.
- Ubah semua referensi asset ke path relatif `assets/...`.
- Pastikan template tetap bisa dibuka offline sejauh asset lokal tersedia.

Tidak boleh pada template final:

- `<link rel="stylesheet" href="https://...">`
- `<script src="https://...">`
- Referensi asset visual remote seperti `https://...jpg`, `https://...png`, `https://...webp`
- Folder tambahan seperti `assets/css`, `assets/js`, `assets/fonts`, `assets/media`

Exception hanya boleh jika ada alasan teknis jelas dan dicatat di PR/deskripsi pekerjaan.

## Aturan CSS dan JS

Custom class, ID, CSS variable, keyframe, dan identifier JS milik template harus memakai format kebab-case atau camelCase yang diawali `cit` agar tidak bentrok antar template.

Format CSS/HTML:

```text
cit-{tema}-{fungsi}
```

Format JS:

```text
cit{Tema}{Fungsi}
```

Contoh:

- `cit-wayang-cover-visual`
- `cit-wayang-profile-image`
- `cit-special-cover`
- `cit-special-flower-sway-left`
- `cit-special-event-image`
- `--cit-special-primary-color`
- `@keyframes cit-special-flower-sway`
- `const citSpecialAudio = ...`

Jangan rename class vendor/framework karena bisa merusak styling dan JS bawaan.

Contoh class vendor yang tidak perlu diubah:

- `elementor-*`
- `swiper-*`
- `aos-*`
- `fa`, `fas`, `far`, `fab`
- `e-con`, `e-flex`, `e-child`

Class pendek hasil scrape seperti `a`, `b`, `acara`, `profil`, `roll`, `fld`, `fla` harus diganti ke nama `cit-*` yang jelas jika class itu milik custom template.

Inline `<style>` dan `<script>` yang dibuat atau dimodifikasi untuk project ini juga harus diberi identifier `cit-*` jika membutuhkan `id`, misalnya `id="cit-special-01-inline-css"` atau `id="cit-special-01-inline-js"`. Jangan memakai nama WordPress seperti `wp-*`, `elementor-post-*`, atau nama plugin sebagai identifier custom baru.

## Credit Footer

Footer visible pada template hasil adaptasi harus memakai copyright/brand YukNikahIn.

```html
<p>by YukNikahIn</p>
```

Jika template sumber memakai credit lama, image emoji/heart remote, atau teks `Made with ❤ by ...`, ganti menjadi teks YukNikahIn seperti contoh di atas.

## Cleanup Hasil Scrape

Hapus file artefak scrape yang bukan asset visual/audio template.

Contoh yang harus dihapus:

- `scrape-failures.log`
- file metadata WordPress atau JSON tanpa extension seperti `20653`
- file URL/slug halaman seperti `spesial-01`
- file hasil salah parse variable JS seperti `l`
- file oEmbed, XMLRPC, RSS, atau API response yang tidak dipakai visual template

Sebelum menghapus, pastikan referensinya di `index.html` sudah dibersihkan atau diganti ke nilai aman seperti `#` jika hanya metadata.

## Cleanup WordPress dan SEO Plugin

Template final tidak boleh membawa blok SEO/plugin/CMS yang tidak dibutuhkan untuk tampilan undangan.

Hapus atau nonaktifkan dari `index.html`:

- Comment Yoast seperti `This site is optimized with the Yoast SEO plugin` dan `Yoast SEO plugin`.
- `<script type="application/ld+json" class="yoast-schema-graph">...</script>` dari Yoast jika hanya berisi URL WordPress sumber.
- Meta/link WordPress discovery seperti `wp-json`, `xmlrpc`, `wlwmanifest`, `rsd`, `oembed`, shortlink, dan generator WordPress.
- Inline CSS/JS khusus WordPress yang tidak berpengaruh ke tampilan template, misalnya emoji WordPress atau auto-size helper.
- Comment/source map WordPress seperti `sourceURL=wp-...`.

Jangan hapus CSS/JS vendor yang masih dibutuhkan layout atau interaksi, tetapi rename identifier custom yang kita buat ke prefix `cit-*`.

## Aturan Scraping Aman

Scraping hanya dilakukan untuk sumber yang memang diizinkan atau sudah mendapat persetujuan. Jangan menambahkan teknik bypass proteksi, login ilegal, captcha evasion, fingerprint evasion, atau mekanisme lain untuk menghindari deteksi sistem keamanan.

Wajib saat mengambil template atau asset:

- Hormati `robots.txt`, ToS, dan batas akses dari website sumber.
- Gunakan request secukupnya, beri jeda antar request, dan hindari paralel berlebihan.
- Cache hasil download agar asset yang sama tidak diambil berulang-ulang.
- Pakai `User-Agent` yang jelas dan wajar, bukan meniru identitas pihak lain untuk menipu sistem.
- Jika muncul warning, blokir, captcha, rate limit, atau error policy/security, hentikan atau skip bagian tersebut.
- Jangan scrape data pribadi yang tidak dibutuhkan untuk template.
- Ambil hanya file yang diperlukan untuk membuat template standalone: HTML, CSS, JS, font, image, dan audio yang memang dipakai.
- Catat asset yang gagal diambil selama proses, tetapi hapus file log seperti `scrape-failures.log` dari template final.

Jika website sumber memblokir proses scraping, jangan mencoba mengakali proteksinya. Gunakan export resmi, file yang diberikan user, atau minta izin/akses yang sesuai.

## Checklist Validasi

Sebelum template dianggap selesai, cek hal berikut:

- Folder template hanya berisi `index.html` dan `assets/`.
- Folder `assets/` hanya berisi `audio/`, `decorations/`, dan `images/`.
- Semua file di `assets/decorations/` dan `assets/images/` berformat `.webp`.
- Semua referensi `assets/decorations/...` dan `assets/images/...` di HTML mengarah ke file yang ada.
- Tidak ada `<link rel="stylesheet">` eksternal.
- Tidak ada `<script src="...">` eksternal.
- Tidak ada file log atau artefak scrape di folder template final.
- Custom class sudah diprefix `cit-*`.
- Custom CSS/JS identifier project sudah memakai prefix `cit-*`.
- Class vendor tidak ikut diubah.
- Blok/comment Yoast, WordPress discovery, dan metadata CMS sumber sudah dibersihkan.
- Footer credit sudah memakai YukNikahIn.

## Template Yang Sudah Ada

- `premium/tradition/cit-wayang-01/index.html`
- `premium/tradition/cit-wayang-02/index.html`
- `premium/special-photo/cit-special-01/index.html`
