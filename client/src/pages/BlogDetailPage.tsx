import React, { useState } from "react";
import DigiassurHeader from "@/components/DigiassurHeader";
import DigiassurFooter from "@/components/DigiassurFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface BlogPostDetail {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  read_time: string;
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  views_count?: number;
}

interface BlogDetailPageProps {
  post?: BlogPostDetail;
  relatedPosts?: Array<{
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    image: string;
    author?: string;
    read_time?: string;
    published_at?: string;
  }>;
}

const FALLBACK_POST: BlogPostDetail = {
  id: 1,
  title: "Les bienfaits de la mousse de mer.",
  slug: "les-bienfaits-de-la-mousse-de-mer",
  category: "Santé",
  excerpt:
    "La mousse de mer est une excellente source de vitamines et de minéraux. Elle contient notamment des vitamines A, B, C et E, ainsi que des minéraux essentiels tels que le calcium, le magnésium et l'iode.",
  content: `
    <p class="lead text-lg font-medium text-slate-700 leading-relaxed mb-6">
      La mousse de mer, ou <em>sea moss</em> (Chondrus crispus), est une algue marine rouge qui suscite un engouement mondial grâce à sa densité nutritionnelle hors du commun. Longtemps utilisée dans la cuisine traditionnelle caribéenne et irlandaise, elle s'impose aujourd'hui comme un superaliment incontournable pour booster la santé globale.
    </p>

    <h3 class="text-2xl font-black text-[#153954] mt-8 mb-4">Une composition exceptionnelle en 92 minéraux essentiels</h3>
    <p class="text-slate-600 leading-relaxed mb-4">
      Notre organisme a besoin d'environ 102 minéraux pour fonctionner à son plein potentiel. La mousse de mer en contient à elle seule près de 92 ! Parmi les éléments les plus remarquables :
    </p>
    <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-6">
      <li><strong>L'iode et la tyrosine :</strong> deux éléments cruciaux pour soutenir le bon fonctionnement de la glande thyroïde et réguler les hormones du métabolisme.</li>
      <li><strong>Le magnésium et le potassium :</strong> indispensables à l'équilibre nerveux, à la contraction musculaire et à la santé cardiovasculaire.</li>
      <li><strong>Le fer :</strong> combat efficacement la fatigue passagère ou anémique et favorise une bonne oxygénation des cellules.</li>
      <li><strong>Le soufre et le collagène végétal :</strong> réputés pour embellir la peau, fortifier les ongles et stimuler la pousse des cheveux.</li>
    </ul>

    <h3 class="text-2xl font-black text-[#153954] mt-8 mb-4">Renforcement du système immunitaire et santé intestinale</h3>
    <p class="text-slate-600 leading-relaxed mb-4">
      Grâce à sa richesse en fibres prébiotiques et en polysaccharides mucilagineux, la mousse de mer nourrit le microbiote intestinal. Une flore digestive saine étant le premier rempart immunitaire du corps, sa consommation régulière aide à prévenir les infections saisonnières et améliore le transit.
    </p>

    <h3 class="text-2xl font-black text-[#153954] mt-8 mb-4">Comment la consommer au quotidien ?</h3>
    <p class="text-slate-600 leading-relaxed mb-4">
      La forme la plus courante est le <strong>gel de sea moss</strong>. Préparez-le en rinçant soigneusement l'algue séchée, en la faisant tremper 24 heures dans de l'eau de source, puis en la mixant avec un peu d'eau. Vous pouvez ensuite en ajouter une à deux cuillères à soupe par jour dans vos smoothies, jus frais, soupes ou tisanes tièdes.
    </p>
  `,
  image: "/images/blog-mousse-mer.png",
  author: "Dr. Leila Berrada",
  read_time: "4 min",
  published_at: "08/10/2026",
  views_count: 245,
};

export default function BlogDetailPage({ post, relatedPosts = [] }: BlogDetailPageProps) {
  const { t, isRTL } = useLanguage();
  const currentPost = post || FALLBACK_POST;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${currentPost.title} - À lire sur DigiAssur : `);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  const shareOnFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-[#f48161] selection:text-white">
      <DigiassurHeader />
      <FloatingWidgets />

      <main className="flex-1 pt-[116px]">
        {/* ========================================================
            1. BREADCRUMBS & ARTICLE HEADER
           ======================================================== */}
        <section className="bg-white border-b border-slate-200/80 py-8">
          <div className="max-w-4xl mx-auto px-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
              <Link href="/" className="hover:text-[#f48161] transition">
                Accueil
              </Link>
              <span>/</span>
              <Link href="/blog-digiassur" className="hover:text-[#f48161] transition">
                Blog & Conseils
              </Link>
              <span>/</span>
              <span className="text-[#f48161] font-bold truncate max-w-[200px] sm:max-w-none">
                {currentPost.category}
              </span>
            </nav>

            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 bg-[#f48161]/10 text-[#f48161] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentPost.category}</span>
            </div>

            {/* Title (H1) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#153954] mb-4 leading-tight tracking-tight">
              {currentPost.title}
            </h1>

            {/* Excerpt Lead */}
            {currentPost.excerpt && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {currentPost.excerpt}
              </p>
            )}

            {/* Author & Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-[#153954] flex items-center justify-center font-bold border border-slate-200 shadow-2xs">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{currentPost.author || "DigiAssur"}</div>
                  <div className="text-slate-400 text-xs">Équipe Rédaction DigiAssur</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {currentPost.published_at && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#f48161]" />
                    {currentPost.published_at}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentPost.read_time || "4 min"}
                </span>
                {currentPost.views_count !== undefined && currentPost.views_count > 0 && (
                  <span className="inline-flex items-center gap-1.5 hidden sm:inline-flex">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {currentPost.views_count} vues
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. FEATURED HERO IMAGE
           ======================================================== */}
        <div className="max-w-4xl mx-auto px-6 -mt-2 pt-6">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 h-64 sm:h-96 md:h-[420px]">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* ========================================================
            3. ARTICLE CONTENT BODY & SHARE ACTIONS
           ======================================================== */}
        <section className="py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Share Floating Column (Left on Desktop) */}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-28 flex flex-col gap-3 items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Partager
                  </span>

                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                    title="Partager sur WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={shareOnLinkedIn}
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                    title="Partager sur LinkedIn"
                  >
                    <span className="font-bold text-xs">in</span>
                  </button>

                  <button
                    type="button"
                    onClick={shareOnFacebook}
                    className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-700 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                    title="Partager sur Facebook"
                  >
                    <span className="font-bold text-xs">fb</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#f48161] hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                    title="Copier le lien"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <BookOpen className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-11 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80">
                {/* Mobile Share Bar */}
                <div className="flex lg:hidden items-center justify-between pb-6 mb-8 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-[#f48161]" /> Partager cet article :
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={shareOnWhatsApp}
                      className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 rounded-full cursor-pointer"
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={shareOnLinkedIn}
                      className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-full cursor-pointer"
                    >
                      LinkedIn
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-full cursor-pointer"
                    >
                      {copied ? "Copié !" : "Copier le lien"}
                    </button>
                  </div>
                </div>

                {/* Rich HTML Content Body */}
                <div
                  className="blog-content prose prose-slate max-w-none prose-headings:text-[#153954] prose-headings:font-black prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-[#f48161] prose-a:font-bold prose-img:rounded-2xl prose-strong:text-slate-800"
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />

                {/* Author Info Card */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/60">
                  <div className="w-14 h-14 rounded-full bg-[#153954] text-white flex items-center justify-center font-bold text-lg shrink-0">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-base mb-1">
                      Rédigé par {currentPost.author || "DigiAssur"}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      L'équipe DigiAssur analyse en continu les actualités de l'assurance, de la sécurité routière et de la santé pour vous apporter des conseils fiables, clairs et immédiatement applicables.
                    </p>
                  </div>
                </div>

                {/* Return to Blog Button */}
                <div className="mt-8 text-center sm:text-start">
                  <Link
                    href="/blog-digiassur"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#153954] hover:text-[#f48161] transition"
                  >
                    <ChevronLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    <span>Retour à tous les articles du blog</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. RELATED ARTICLES (3 CARDS)
           ======================================================== */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-white border-t border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-[#153954] tracking-tight">
                    Articles similaires recommandés
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Continuez votre lecture pour enrichir vos connaissances
                  </p>
                </div>
                <Link
                  href="/blog-digiassur"
                  className="text-xs font-bold text-[#f48161] hover:text-[#e46e4e] inline-flex items-center gap-1"
                >
                  <span>Voir tout le blog</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((rel) => {
                  const relUrl = `/blog-digiassur/${rel.slug}`;
                  return (
                    <article
                      key={rel.id}
                      className="bg-[#f8fafc] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col group"
                    >
                      <Link href={relUrl} className="h-48 overflow-hidden relative block cursor-pointer">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#f48161] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          {rel.category}
                        </span>
                      </Link>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{rel.read_time || "4 min"}</span>
                          </div>
                          <Link href={relUrl}>
                            <h4 className="font-bold text-base text-slate-800 mb-2 line-clamp-2 group-hover:text-[#f48161] transition">
                              {rel.title}
                            </h4>
                          </Link>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                            {rel.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">{rel.author || "DigiAssur"}</span>
                          <Link
                            href={relUrl}
                            className="w-7 h-7 rounded-md bg-[#f48161] text-white flex items-center justify-center"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            5. BOTTOM CALL TO ACTION
           ======================================================== */}
        <section className="bg-gradient-to-r from-[#153954] to-[#1e4e72] py-14 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-[#fca58f] font-bold text-xs uppercase tracking-widest mb-2 block">
              Protection sur-mesure
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-4">
              Besoin d'une assurance auto, moto ou habitation ?
            </h3>
            <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Simulez gratuitement votre tarif en ligne avec DigiAssur. Comparez les garanties des meilleures compagnies marocaines et recevez votre attestation directement chez vous.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auto/devis-auto"
                className="inline-flex items-center gap-2 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Simuler mon assurance auto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition cursor-pointer"
              >
                <span>Demander un rappel</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <DigiassurFooter />
    </div>
  );
}
