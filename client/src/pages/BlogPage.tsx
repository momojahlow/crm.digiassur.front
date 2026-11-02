import React, { useState, useMemo } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  Clock,
  Calendar,
  User,
  ChevronRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  Book,
  BookMarked,
  Library,
  Filter,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export interface BlogPostItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  author?: string;
  read_time?: string;
  published_at?: string;
  is_featured?: boolean;
}

interface BlogPageProps {
  posts?: {
    data?: BlogPostItem[];
    current_page?: number;
    last_page?: number;
    total?: number;
  } | BlogPostItem[];
  categories?: string[];
  featuredPosts?: BlogPostItem[];
  currentCategory?: string;
  currentSearch?: string;
}

const DEFAULT_POSTS: BlogPostItem[] = [
  {
    id: 1,
    title: "Les bienfaits de la mousse de mer.",
    slug: "les-bienfaits-de-la-mousse-de-mer",
    category: "Santé",
    excerpt: "La mousse de mer est une excellente source de vitamines et de minéraux. Elle contient notamment des vitamines A, B, C et E, ainsi que des minéraux essentiels tels que le calcium, le magnésium et l'iode.",
    image: "/images/blog-mousse-mer.png",
    author: "Dr. Leila Berrada",
    read_time: "4 min",
    published_at: "08/10/2026",
    is_featured: true,
  },
  {
    id: 2,
    title: "Sensehacking : Qu'est ce que c'est et comment ça marche?",
    slug: "sensehacking-quest-ce-que-cest-et-comment-ca-marche",
    category: "Santé",
    excerpt: "Le terme sensehacking désigne une pratique innovante visant à stimuler intelligemment nos cinq sens pour optimiser notre bien-être émotionnel, réduire le stress et booster la concentration.",
    image: "/images/blog-sensehacking.png",
    author: "Yassine Mansouri",
    read_time: "5 min",
    published_at: "12/10/2026",
    is_featured: true,
  },
  {
    id: 3,
    title: "Top 7 des aliments pour lutter contre la fatigue.",
    slug: "top-7-des-aliments-pour-lutter-contre-la-fatigue",
    category: "Santé",
    excerpt: "L'alimentation joue un rôle crucial dans notre santé et notre dynamisme. Une alimentation équilibrée et riche en micronutriments clés aide à vaincre les coups de fatigue chroniques.",
    image: "/images/blog-alimentation.png",
    author: "Kenza Idrissi",
    read_time: "3 min",
    published_at: "15/10/2026",
    is_featured: false,
  },
  {
    id: 4,
    title: "Vitamine D : Bienfaits, rôles et symptômes d'une carence.",
    slug: "vitamine-d-bienfaits-roles-et-symptomes-dune-carence",
    category: "Santé",
    excerpt: "La vitamine D est une vitamine liposoluble produite naturellement par le corps sous l'effet des rayons du soleil. Elle est indispensable à la santé des os, des muscles et du système immunitaire.",
    image: "/images/blog-vitamine-d.png",
    author: "Dr. Leila Berrada",
    read_time: "4 min",
    published_at: "18/10/2026",
    is_featured: false,
  },
  {
    id: 5,
    title: "Assurance Auto au Maroc : Comment bien choisir ses garanties ?",
    slug: "assurance-auto-maroc-comment-bien-choisir-ses-garanties",
    category: "Automobile",
    excerpt: "Au-delà de la Responsabilité Civile obligatoire, découvrez quelles garanties complémentaires choisir (vol, incendie, bris de glace, tierce collision) pour protéger au mieux votre véhicule.",
    image: "/images/assurance_auto.png",
    author: "Équipe DigiAssur",
    read_time: "5 min",
    published_at: "19/10/2026",
    is_featured: true,
  },
  {
    id: 6,
    title: "Assurance Habitation : Protégez votre foyer en toute sérénité.",
    slug: "assurance-habitation-protegez-votre-foyer-en-toute-serenite",
    category: "Habitation",
    excerpt: "Que vous soyez locataire ou propriétaire, une assurance Multirisque Habitation (MRH) protège vos biens contre les dégâts des eaux, incendies, vols et catastrophes naturelles.",
    image: "/images/habitation.png",
    author: "Équipe DigiAssur",
    read_time: "4 min",
    published_at: "20/10/2026",
    is_featured: false,
  },
];

const DEFAULT_CATEGORIES = ["Tous", "Santé", "Automobile", "Habitation", "Épargne & Retraite", "Conseils & Sécurité"];

export default function BlogPage({
  posts,
  categories,
  featuredPosts,
  currentCategory = "",
  currentSearch = "",
}: BlogPageProps) {
  const { t, isRTL } = useLanguage();

  const rawPostsList: BlogPostItem[] = useMemo(() => {
    if (!posts) return DEFAULT_POSTS;
    if (Array.isArray(posts)) return posts.length > 0 ? posts : DEFAULT_POSTS;
    if (posts.data && Array.isArray(posts.data)) return posts.data.length > 0 ? posts.data : DEFAULT_POSTS;
    return DEFAULT_POSTS;
  }, [posts]);

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || "Tous");

  const categoryList = useMemo(() => {
    const list = categories && categories.length > 0 ? ["Tous", ...categories] : DEFAULT_CATEGORIES;
    return Array.from(new Set(list));
  }, [categories]);

  // Client-side instant filtering for silky smooth user interaction
  const filteredPosts = useMemo(() => {
    return rawPostsList.filter((post) => {
      const matchCategory =
        selectedCategory === "Tous" ||
        (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.author && post.author.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [rawPostsList, selectedCategory, searchQuery]);

  // Primary featured post
  const mainFeatured = useMemo(() => {
    if (filteredPosts.length === 0) return null;
    return filteredPosts.find((p) => p.is_featured) || filteredPosts[0];
  }, [filteredPosts]);

  // Other posts (exclude main featured if on "Tous" and no active search)
  const gridPosts = useMemo(() => {
    if (searchQuery.trim() !== "" || selectedCategory !== "Tous" || !mainFeatured) {
      return filteredPosts;
    }
    return filteredPosts.filter((p) => p.id !== mainFeatured.id);
  }, [filteredPosts, mainFeatured, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />
      <FloatingWidgets />

      <main className="flex-1 pt-[116px]">
        {/* ========================================================
            1. HERO HEADER SECTION
           ======================================================== */}
        <section className="relative bg-gradient-to-br from-[#153954] via-[#1e4e72] to-[#2b648f] text-white py-16 md:py-20 overflow-hidden">
          {/* Subtle Background Geometric Accents & Floating Book Icons Field */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#f48161]/15 blur-3xl" />

            {/* Field of floating books across hero */}
            {/* Left side books */}
            <BookOpen className="absolute -top-4 left-6 w-28 h-28 text-white/[0.08] -rotate-12 transform" />
            <Book className="absolute top-16 left-1/4 w-16 h-16 text-[#fca58f]/[0.18] rotate-12 transform" />
            <BookMarked className="absolute bottom-4 left-10 w-20 h-20 text-white/[0.09] rotate-6 transform" />
            <Library className="absolute top-28 left-4 w-24 h-24 text-white/[0.06] -rotate-45 transform" />

            {/* Center books */}
            <BookOpen className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 text-white/[0.06] rotate-6 transform" />
            <Book className="absolute -bottom-8 left-1/3 w-24 h-24 text-white/[0.07] -rotate-12 transform" />

            {/* Right side books */}
            <BookOpen className="absolute top-3 right-8 w-32 h-32 text-white/[0.08] rotate-12 transform" />
            <BookMarked className="absolute top-28 right-1/4 w-16 h-16 text-[#fca58f]/[0.20] -rotate-12 transform" />
            <Book className="absolute -bottom-8 right-12 w-28 h-28 text-white/[0.08] rotate-45 transform" />
            <Library className="absolute bottom-10 right-1/3 w-20 h-20 text-white/[0.06] -rotate-6 transform" />
            
            {/* Subtle library grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#fca58f] font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#f48161]" />
              <span>{t("blog.tag", "Le Blog & Guides DigiAssur")}</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight">
              {t("blog.heroTitle", "Infos, Conseils & Prévention pour votre sécurité")}
            </h1>
            <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              {t(
                "blog.heroSubtitle",
                "Explorez nos articles d'experts, conseils santé, astuces d'entretien auto et guides pratiques pour faire les meilleurs choix au quotidien."
              )}
            </p>

            {/* Search Input Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative flex items-center shadow-xl rounded-full overflow-hidden bg-white p-1.5 border border-white/30">
                <Search className={`w-5 h-5 text-slate-400 absolute ${isRTL ? "right-5" : "left-5"}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("blog.searchPlaceholder", "Rechercher un sujet, un conseil, un mot-clé...")}
                  className={`w-full bg-transparent py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden ${
                    isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-slate-400 hover:text-slate-600 px-3 py-1 font-bold cursor-pointer"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. CATEGORIES FILTER TABS
           ======================================================== */}
        <section className="bg-white border-b border-slate-200/80 sticky top-[72px] z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-6 py-3.5">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#f48161]" />
                <span className="hidden sm:inline">Catégories :</span>
              </div>
              {categoryList.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#153954] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            3. MAIN CONTENT (FEATURED + GRID)
           ======================================================== */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            {/* Case: Featured Article Card on Top (Only when browsing "Tous" with no search) */}
            {selectedCategory === "Tous" && !searchQuery.trim() && mainFeatured && (
              <div className="mb-14">
                <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
                  <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden relative">
                    <Link href={`/blog-digiassur/${mainFeatured.slug}`} className="block h-full cursor-pointer">
                      <img
                        src={mainFeatured.image}
                        alt={mainFeatured.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                      <span className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} bg-[#f48161] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md`}>
                        {mainFeatured.category}
                      </span>
                    </Link>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#f48161]" />
                          {mainFeatured.published_at || "Récemment"}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {mainFeatured.read_time || "4 min"}
                        </span>
                      </div>

                      <Link href={`/blog-digiassur/${mainFeatured.slug}`}>
                        <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#153954] mb-3 leading-snug group-hover:text-[#f48161] transition cursor-pointer">
                          {mainFeatured.title}
                        </h2>
                      </Link>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                        {mainFeatured.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-[#153954] flex items-center justify-center font-bold text-xs border border-slate-200">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {mainFeatured.author || "DigiAssur"}
                        </span>
                      </div>

                      <Link
                        href={`/blog-digiassur/${mainFeatured.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f48161] hover:text-[#e46e4e] group-hover:translate-x-1 transition cursor-pointer"
                      >
                        <span>Lire l'article</span>
                        <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Heading */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#153954] tracking-tight">
                  {selectedCategory === "Tous" ? "Tous les derniers articles" : `Articles dans "${selectedCategory}"`}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {gridPosts.length} article{gridPosts.length > 1 ? "s" : ""} disponible{gridPosts.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Grid of Articles */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => {
                  const articleUrl = `/blog-digiassur/${post.slug}`;
                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col group"
                    >
                      {/* Image Header */}
                      <Link href={articleUrl} className="h-52 overflow-hidden relative block cursor-pointer bg-slate-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className={`absolute top-3.5 ${isRTL ? "right-3.5" : "left-3.5"} bg-[#f48161] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
                          {post.category}
                        </span>
                      </Link>

                      {/* Content Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Metadata row */}
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                            {post.published_at && (
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                {post.published_at}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {post.read_time || "4 min"}
                            </span>
                          </div>

                          {/* Title */}
                          <Link href={articleUrl} className="block group/title">
                            <h4 className="font-bold text-lg text-slate-800 mb-2.5 line-clamp-2 group-hover/title:text-[#f48161] transition leading-snug cursor-pointer">
                              {post.title}
                            </h4>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer row */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600 truncate max-w-[150px]">
                            {post.author || "DigiAssur"}
                          </span>

                          <Link
                            href={articleUrl}
                            className="w-8 h-8 rounded-lg bg-[#f48161] hover:bg-[#e46e4e] text-white flex items-center justify-center transition shadow-xs cursor-pointer group-hover:scale-105"
                            aria-label="Lire l'article"
                          >
                            <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-2">Aucun article trouvé</h4>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  {searchQuery
                    ? `Aucun résultat pour "${searchQuery}". Essayez avec d'autres termes de recherche.`
                    : "Aucun article disponible dans cette catégorie pour le moment."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Tous");
                  }}
                  className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md transition cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            4. BOTTOM CTA BANNER
           ======================================================== */}
        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-[#153954] to-[#1e4e72] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-[#fca58f] font-bold text-xs uppercase tracking-widest mb-2 block">
                  Conseil Personnalisé DigiAssur
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mb-4">
                  Une question sur vos contrats ou besoin d'un devis ?
                </h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
                  Nos conseillers experts vous accompagnent à chaque étape pour trouver la formule idéale au meilleur tarif.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/auto/devis-auto"
                    className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Simuler mon tarif en 2 min</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition cursor-pointer"
                  >
                    <span>Nous contacter</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DigiassurFooter />
    </div>
  );
}
