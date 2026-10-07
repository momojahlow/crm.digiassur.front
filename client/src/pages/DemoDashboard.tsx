import { useEffect, useState, type FormEvent } from "react";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import DemoAnalytics from "@/components/DemoAnalytics";
import NumerisWorkspace, {
  type WorkspaceNavItem,
} from "@/components/NumerisWorkspace";

const metrics: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: string;
  accent: string;
}[] = [
  {
    label: "Documents indexés",
    value: "1 284",
    detail: "+ 12 % ce mois-ci",
    icon: FileText,
    tone: "bg-[#eaf4fb] text-[#126aa7]",
    accent: "border-l-[#1678b9]",
  },
  {
    label: "Précision OCR",
    value: "99,2 %",
    detail: "Corpus de démonstration",
    icon: CheckCircle2,
    tone: "bg-emerald-50 text-emerald-700",
    accent: "border-l-emerald-500",
  },
  {
    label: "Questions RAG",
    value: "327",
    detail: "Depuis le début du mois",
    icon: Sparkles,
    tone: "bg-sky-50 text-sky-700",
    accent: "border-l-sky-500",
  },
  {
    label: "Temps moyen",
    value: "1,8 s",
    detail: "Par page analysée",
    icon: Clock3,
    tone: "bg-orange-50 text-orange-700",
    accent: "border-l-orange-400",
  },
];

const documents = [
  {
    name: "Contrat fournisseur — 2026.pdf",
    type: "Contrat",
    pages: "18 pages",
    date: "Aujourd’hui, 10:42",
    status: "Indexé",
  },
  {
    name: "Facture — septembre 2026.pdf",
    type: "Facture",
    pages: "2 pages",
    date: "Aujourd’hui, 09:18",
    status: "Indexé",
  },
  {
    name: "Guide des procédures internes.pdf",
    type: "Procédure",
    pages: "42 pages",
    date: "Hier, 16:05",
    status: "Indexé",
  },
  {
    name: "Dossier client — exemple.pdf",
    type: "Dossier",
    pages: "11 pages",
    date: "Hier, 14:27",
    status: "À vérifier",
  },
];

export default function DemoDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [documentFilter, setDocumentFilter] = useState<
    "all" | "review" | "indexed"
  >("all");
  const [activityFilter, setActivityFilter] = useState<
    "all" | "processing" | "rag"
  >("all");
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState(false);
  const [startDate, setStartDate] = useState("2026-10-01");
  const [endDate, setEndDate] = useState("2026-10-06");
  const [appliedPeriod, setAppliedPeriod] = useState("6 derniers mois");
  const [filterMessage, setFilterMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [documentQuery, setDocumentQuery] = useState("");
  const selectSection = (section: string, target: string) => {
    setActiveSection(section);
    document.getElementById(target)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const navItems: WorkspaceNavItem[] = [
    {
      id: "overview",
      label: "Vue d’ensemble",
      icon: LayoutDashboard,
      href: "#overview",
      onSelect: () => setActiveSection("overview"),
    },
    {
      id: "documents-group",
      label: "Documents",
      icon: FolderOpen,
      children: [
        {
          id: "documents",
          label: "Tous les documents",
          icon: FileText,
          onSelect: () => {
            setDocumentFilter("all");
            selectSection("documents", "documents");
          },
        },
        {
          id: "documents-review",
          label: "À vérifier",
          icon: Clock3,
          onSelect: () => {
            setDocumentFilter("review");
            selectSection("documents-review", "documents");
          },
        },
        {
          id: "documents-indexed",
          label: "Documents indexés",
          icon: CheckCircle2,
          onSelect: () => {
            setDocumentFilter("indexed");
            selectSection("documents-indexed", "documents");
          },
        },
      ],
    },
    {
      id: "assistant-group",
      label: "Assistant RAG",
      icon: Sparkles,
      children: [
        {
          id: "assistant",
          label: "Poser une question",
          icon: Sparkles,
          onSelect: () => selectSection("assistant", "assistant"),
        },
        {
          id: "assistant-sources",
          label: "Sources du corpus",
          icon: FileText,
          onSelect: () =>
            selectSection("assistant-sources", "assistant-sources"),
        },
      ],
    },
    {
      id: "activity-group",
      label: "Activité",
      icon: Activity,
      children: [
        {
          id: "activity",
          label: "Toutes les activités",
          icon: Activity,
          onSelect: () => {
            setActivityFilter("all");
            selectSection("activity", "activity");
          },
        },
        {
          id: "activity-processing",
          label: "Traitements documentaires",
          icon: FileText,
          onSelect: () => {
            setActivityFilter("processing");
            selectSection("activity-processing", "activity");
          },
        },
        {
          id: "activity-rag",
          label: "Recherches RAG",
          icon: Sparkles,
          onSelect: () => {
            setActivityFilter("rag");
            selectSection("activity-rag", "activity");
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Tableau de bord démo — Numeris | Smart Print";
    const hash = window.location.hash.slice(1);
    if (hash) {
      if (["overview", "documents", "assistant", "activity"].includes(hash)) {
        setActiveSection(hash);
        if (hash === "documents") setDocumentFilter("all");
        if (hash === "activity") setActivityFilter("all");
      }
      window.setTimeout(() => {
        document.getElementById(decodeURIComponent(hash))?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      }, 80);
    }
    const syncHash = () => {
      const currentHash = window.location.hash.slice(1);
      if (
        ["overview", "documents", "assistant", "activity"].includes(currentHash)
      ) {
        setActiveSection(currentHash);
        if (currentHash === "documents") setDocumentFilter("all");
        if (currentHash === "activity") setActivityFilter("all");
      }
    };
    window.addEventListener("hashchange", syncHash);
    return () => {
      document.title = previousTitle;
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const askQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (question.trim()) setAnswered(true);
  };

  const applyDateRange = () => {
    if (startDate > endDate) {
      setFilterMessage(
        "La date de fin doit être postérieure à la date de début."
      );
      return;
    }
    const start = new Date(`${startDate}T12:00:00`).toLocaleDateString("fr-FR");
    const end = new Date(`${endDate}T12:00:00`).toLocaleDateString("fr-FR");
    setAppliedPeriod(`${start} – ${end}`);
    setFilterMessage("Période appliquée à cette vue de démonstration.");
  };

  const filteredDocuments = documents.filter(document => {
    const matchesQuery = `${document.name} ${document.type}`
      .toLocaleLowerCase("fr-FR")
      .includes(documentQuery.toLocaleLowerCase("fr-FR"));
    const matchesStatus =
      documentFilter === "all" ||
      (documentFilter === "review" && document.status === "À vérifier") ||
      (documentFilter === "indexed" && document.status === "Indexé");
    return matchesQuery && matchesStatus;
  });
  const activityEntries = [
    {
      category: "processing",
      label: "Lot d’exemple numérisé",
      detail: "Il y a 2 h · simulation",
      icon: FileText,
    },
    {
      category: "processing",
      label: "Index de démonstration actualisé",
      detail: "Il y a 4 h · simulation",
      icon: FolderOpen,
    },
    {
      category: "rag",
      label: "Réponse RAG issue du corpus fictif",
      detail: "Hier · simulation",
      icon: Sparkles,
    },
  ];
  const visibleActivityEntries = activityEntries.filter(
    entry => activityFilter === "all" || entry.category === activityFilter
  );

  return (
    <NumerisWorkspace
      activeItem={activeSection}
      navItems={navItems}
      pageTitle="Vue d’ensemble"
      userName="Compte démo"
      roleLabel="Données fictives"
      variant="demo"
      notificationCount={2}
      notificationLabel="Un document d’exemple attend une vérification et un index fictif vient d’être actualisé."
    >
      <main
        id="overview"
        className="mx-auto w-full max-w-[1600px] scroll-mt-[72px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#126aa7]">
              <Sparkles size={12} /> Smart Print · Numeris · Espace documentaire
            </p>
            <h1 className="m-0 text-[22px] font-bold tracking-tight text-[#273f50] sm:text-[25px]">
              Vue d’ensemble documentaire
            </h1>
            <p className="mb-0 mt-1.5 text-[12px] text-slate-500">
              Suivi des documents, de l’OCR et des recherches dans votre corpus.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] font-bold text-amber-800">
            <ShieldCheck size={14} /> Simulation uniquement
          </div>
        </div>

        <section
          aria-label="Période de consultation simulée"
          className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_2px_8px_rgba(19,49,66,0.035)] sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-3.5"
        >
          <label className="block text-[10px] font-bold text-slate-500">
            <span className="mb-1.5 flex items-center gap-1.5">
              <CalendarDays size={12} className="text-[#1678b9]" /> Date de
              début
            </span>
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={event => setStartDate(event.target.value)}
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-700 outline-none transition focus:border-[#1678b9] focus:ring-2 focus:ring-[#1678b9]/15"
            />
          </label>
          <label className="block text-[10px] font-bold text-slate-500">
            <span className="mb-1.5 flex items-center gap-1.5">
              <CalendarDays size={12} className="text-[#1678b9]" /> Date de fin
            </span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={event => setEndDate(event.target.value)}
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-700 outline-none transition focus:border-[#1678b9] focus:ring-2 focus:ring-[#1678b9]/15"
            />
          </label>
          <button
            type="button"
            onClick={applyDateRange}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#1678b9] bg-white px-4 text-[11px] font-bold text-[#105f96] transition hover:bg-[#eaf4fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1678b9]"
          >
            <SlidersHorizontal size={14} /> Filtrer
          </button>
          <p
            className="m-0 text-[10px] text-slate-400 sm:col-span-3"
            aria-live="polite"
          >
            {filterMessage ||
              "Période de démonstration · aucun jeu de données réel"}
          </p>
        </section>

        <section
          className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Indicateurs fictifs"
        >
          {metrics.map(metric => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.label}
                className={`flex min-h-[82px] items-center gap-3 border border-slate-200 border-l-[3px] bg-white px-3.5 py-3 shadow-[0_2px_8px_rgba(19,49,66,0.035)] ${metric.accent}`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${metric.tone}`}
                >
                  <Icon size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-[10px] font-bold text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mb-0 mt-0.5 truncate text-[9px] text-slate-400">
                    {metric.detail}
                  </p>
                </div>
                <strong className="shrink-0 text-[17px] font-extrabold tracking-tight text-[#2b4353] sm:text-[19px]">
                  {metric.value}
                </strong>
              </article>
            );
          })}
        </section>

        <DemoAnalytics period={appliedPeriod} />

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <section
            id="documents"
            className="scroll-mt-[72px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(19,49,66,0.045)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
              <div>
                <h2 className="m-0 text-[12px] font-bold text-[#263f50]">
                  Documents récents
                </h2>
                <p className="mb-0 mt-0.5 text-[10px] text-slate-400">
                  Corpus d’exemple · {filteredDocuments.length} éléments
                  affichés
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(open => !open)}
                aria-label={
                  searchOpen ? "Fermer la recherche" : "Rechercher un document"
                }
                aria-expanded={searchOpen}
                className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:border-[#1678b9] hover:text-[#105f96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1678b9]"
              >
                <Search size={15} />
              </button>
            </div>
            {searchOpen && (
              <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
                <label className="sr-only" htmlFor="demo-document-search">
                  Rechercher dans le corpus fictif
                </label>
                <input
                  id="demo-document-search"
                  value={documentQuery}
                  onChange={event => setDocumentQuery(event.target.value)}
                  placeholder="Nom ou type de document"
                  className="h-9 w-full rounded-md border border-slate-200 px-3 text-[11px] outline-none focus:border-[#1678b9] focus:ring-2 focus:ring-[#1678b9]/15"
                />
              </div>
            )}
            <div className="divide-y divide-slate-100">
              {filteredDocuments.length ? (
                filteredDocuments.map(document => (
                  <div
                    key={document.name}
                    className="flex items-center gap-3 px-4 py-3 sm:px-5"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#eaf4fb] text-[#126aa7]">
                      <FileText size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-[11px] font-semibold text-slate-700">
                        {document.name}
                      </p>
                      <p className="mb-0 mt-1 text-[9px] text-slate-400">
                        {document.type} · {document.pages} · {document.date}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold ${document.status === "Indexé" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}
                    >
                      {document.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="m-0 px-5 py-8 text-center text-[11px] text-slate-400">
                  Aucun document ne correspond à cette recherche fictive.
                </p>
              )}
            </div>
            <a
              href="/"
              className="flex min-h-10 items-center justify-center gap-2 border-t border-slate-100 px-4 text-[10px] font-bold text-[#105f96] transition hover:bg-[#f6faff]"
            >
              Découvrir le traitement documentaire <ArrowRight size={13} />
            </a>
          </section>

          <section
            id="assistant"
            className="scroll-mt-[72px] rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(19,49,66,0.045)] sm:p-5"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-[#eaf4fb] text-[#126aa7]">
                <Sparkles size={15} />
              </span>
              <div>
                <h2 className="m-0 text-[12px] font-bold text-[#263f50]">
                  Assistant Numeris
                </h2>
                <p className="mb-0 mt-0.5 text-[10px] text-slate-400">
                  Recherche RAG · corpus fictif
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-md border border-slate-100 bg-[#f8fafb] p-3.5">
              <p className="mb-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
                Exemple de question
              </p>
              <p className="m-0 text-[11px] font-medium leading-5 text-slate-700">
                Quel est le délai de préavis du contrat fournisseur ?
              </p>
            </div>
            {answered && (
              <div
                className="mt-3 rounded-md border border-[#d4e8f4] bg-[#f0f7fc] p-3.5"
                role="status"
              >
                <p className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-[#105f96]">
                  <CheckCircle2 size={12} /> Réponse issue de la simulation
                </p>
                <p className="mb-2 text-[11px] leading-5 text-slate-700">
                  Le contrat d’exemple prévoit un préavis de 30 jours avant son
                  renouvellement.
                </p>
                <span className="inline-flex items-center gap-1.5 rounded bg-white px-2 py-1 text-[9px] font-semibold text-slate-500">
                  <FileText size={11} /> Contrat fournisseur · p. 12
                </span>
              </div>
            )}
            <form className="mt-3 flex gap-2" onSubmit={askQuestion}>
              <label className="sr-only" htmlFor="demo-rag-question">
                Votre question au corpus fictif
              </label>
              <input
                id="demo-rag-question"
                value={question}
                onChange={event => setQuestion(event.target.value)}
                placeholder="Posez une question…"
                className="h-9 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-[#1678b9] focus:ring-2 focus:ring-[#1678b9]/15"
              />
              <button
                type="submit"
                aria-label="Envoyer la question de démonstration"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#1678b9] text-white transition hover:bg-[#105f96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1678b9]"
              >
                <ArrowRight size={15} />
              </button>
            </form>
            <p className="mb-0 mt-2.5 text-[9px] leading-4 text-slate-400">
              Réponse pré-écrite pour la démo ; aucune requête n’est transmise à
              une IA.
            </p>
            <div
              id="assistant-sources"
              className="mt-4 scroll-mt-[72px] rounded-md border border-slate-100 bg-slate-50/80 p-3"
            >
              <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.1em] text-slate-500">
                Sources du corpus d’exemple
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded bg-white px-2 py-1 text-[9px] font-semibold text-slate-600 ring-1 ring-slate-200">
                  <FileText size={11} className="text-[#1678b9]" /> Contrat
                  fournisseur · p. 12
                </span>
                <span className="inline-flex items-center gap-1.5 rounded bg-white px-2 py-1 text-[9px] font-semibold text-slate-600 ring-1 ring-slate-200">
                  <FileText size={11} className="text-[#1678b9]" /> Guide de
                  procédures · p. 4
                </span>
              </div>
            </div>
          </section>
        </div>

        <section
          id="activity"
          className="mt-4 scroll-mt-[72px] rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(19,49,66,0.045)]"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
            <div>
              <h2 className="m-0 text-[12px] font-bold text-[#263f50]">
                Activité récente
              </h2>
              <p className="mb-0 mt-0.5 text-[10px] text-slate-400">
                Événements illustratifs · aucun traitement réel
              </p>
            </div>
            <Activity size={16} className="text-[#1678b9]" />
          </div>
          <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {visibleActivityEntries.map(({ label, detail, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#f2f7f8] text-[#126aa7]">
                  <Icon size={14} />
                </span>
                <div>
                  <p className="m-0 text-[10px] font-semibold leading-4 text-slate-700">
                    {label}
                  </p>
                  <p className="mb-0 mt-0.5 text-[9px] text-slate-400">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-5 flex flex-col gap-1.5 border-t border-slate-200 pt-3 text-[9px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Smart Print · Numeris — mode démonstration</span>
          <span>
            Données fictives · Aucun document ou identifiant n’est enregistré
          </span>
        </footer>
      </main>
    </NumerisWorkspace>
  );
}
