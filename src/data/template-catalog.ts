export type TemplateCatalogItem = {
  slug: string;
  title: string;
  package: "Basic" | "Premium" | "Exclusive";
  category: "Tradition" | "Special Photo" | "Vintage";
  sourcePath: string;
  previewUrl: string;
  previewImage: string;
  description: string;
  features: string[];
};

export const templateCatalog: TemplateCatalogItem[] = [
  {
    slug: "premium-tradition-cit-jawa-01",
    title: "cit-jawa-01",
    package: "Premium",
    category: "Tradition",
    sourcePath: "src/templates/premium/tradition/cit-jawa-01",
    previewUrl: "/templates/premium/tradition/cit-jawa-01/index.html",
    previewImage: "/wedding/catalog/premium-tradition-cit-jawa-01.webp",
    description: "Tema wayang klasik dengan dekorasi gunungan dan galeri acara.",
    features: ["Wayang", "Galeri", "Amplop digital"],
  },
  {
    slug: "premium-tradition-cit-jawa-02",
    title: "cit-jawa-02",
    package: "Premium",
    category: "Tradition",
    sourcePath: "src/templates/premium/tradition/cit-jawa-02",
    previewUrl: "/templates/premium/tradition/cit-jawa-02/index.html",
    previewImage: "/wedding/catalog/premium-tradition-cit-jawa-02.webp",
    description: "Tema Jawa premium dengan puppet, cloud ornament, dan layout formal.",
    features: ["Tradisi Jawa", "Ornamen", "Musik"],
  },
  {
    slug: "premium-special-photo-cit-special-01",
    title: "cit-special-01",
    package: "Premium",
    category: "Special Photo",
    sourcePath: "src/templates/premium/special-photo/cit-special-01",
    previewUrl: "/templates/premium/special-photo/cit-special-01/index.html",
    previewImage: "/wedding/catalog/premium-special-photo-cit-special-01.webp",
    description: "Template foto dominan untuk pasangan yang ingin visual penuh layar.",
    features: ["Photo-first", "Story", "Gallery"],
  },
  {
    slug: "premium-special-photo-cit-special-02",
    title: "cit-special-02",
    package: "Premium",
    category: "Special Photo",
    sourcePath: "src/templates/premium/special-photo/cit-special-02",
    previewUrl: "/templates/premium/special-photo/cit-special-02/index.html",
    previewImage: "/wedding/catalog/premium-special-photo-cit-special-02.webp",
    description: "Template cinematic dengan banyak variasi foto dan hero portrait.",
    features: ["Hero photo", "Portrait", "Gallery"],
  },
  {
    slug: "premium-special-photo-cit-special-03",
    title: "cit-special-03",
    package: "Premium",
    category: "Special Photo",
    sourcePath: "src/templates/premium/special-photo/cit-special-03",
    previewUrl: "/templates/premium/special-photo/cit-special-03/index.html",
    previewImage: "/wedding/catalog/premium-special-photo-cit-special-03.webp",
    description: "Template clean berbasis foto dengan section profil dan story.",
    features: ["Clean", "Profile", "Story"],
  },
  {
    slug: "premium-vintage-cit-vintage-01",
    title: "cit-vintage-01",
    package: "Premium",
    category: "Vintage",
    sourcePath: "src/templates/premium/vintage/cit-vintage-01",
    previewUrl: "/templates/premium/vintage/cit-vintage-01/index.html",
    previewImage: "/wedding/catalog/premium-vintage-cit-vintage-01.webp",
    description: "Tema vintage lembut dengan ornamen klasik dan warna hangat.",
    features: ["Vintage", "Warm", "Classic"],
  },
  {
    slug: "premium-vintage-cit-vintage-02",
    title: "cit-vintage-02",
    package: "Premium",
    category: "Vintage",
    sourcePath: "src/templates/premium/vintage/cit-vintage-02",
    previewUrl: "/templates/premium/vintage/cit-vintage-02/index.html",
    previewImage: "/wedding/catalog/premium-vintage-cit-vintage-02.webp",
    description: "Tema vintage merah dengan tekstur, bunga, dan detail elegan.",
    features: ["Red tone", "Texture", "Floral"],
  },
  {
    slug: "exclusive-tradition-cit-jawa-01",
    title: "cit-jawa-01",
    package: "Exclusive",
    category: "Tradition",
    sourcePath: "src/templates/exclusive/tradition/cit-jawa-01",
    previewUrl: "/templates/exclusive/tradition/cit-jawa-01/index.html",
    previewImage: "/wedding/catalog/exclusive-tradition-cit-jawa-01.webp",
    description: "Versi exclusive dengan galeri lebih lengkap dan detail tradisi Jawa.",
    features: ["Exclusive", "Jawa", "Full gallery"],
  },
];
