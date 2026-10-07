import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import NumerisWorkspace, {
  type WorkspaceNavItem,
} from "@/components/NumerisWorkspace";

type View = "overview" | "requests";
type RequestStatus = "new" | "in_progress" | "closed";

const statusInfo: Record<RequestStatus, { label: string; className: string }> =
  {
    new: {
      label: "À traiter",
      className: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
    },
    in_progress: {
      label: "En cours",
      className: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    },
    closed: {
      label: "Terminée",
      className: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
    },
  };

const projectLabels: Record<string, string> = {
  digitization: "Numérisation",
  ocr: "OCR & extraction",
  rag: "Recherche RAG",
  complete: "Projet global",
};

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function RequestStatusBadge({ status }: { status: RequestStatus }) {
  const item = statusInfo[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {item.label}
    </span>
  );
}

function LoginGate() {
  const [error, setError] = useState("");
  const handleLogin = () => {
    try {
      startLogin();
    } catch {
      setError(
        "La connexion sécurisée n’est pas configurée sur cet environnement."
      );
    }
  };
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <ShieldCheck size={25} />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
          SMART PRINT · NUMERIS · ADMINISTRATION
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Connectez-vous pour continuer
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          L’espace d’administration est réservé aux utilisateurs autorisés.
        </p>
        {error && (
          <p
            className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-left text-sm text-rose-700"
            role="alert"
          >
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleLogin}
          className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d5c98] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-[#0a4d81] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Se connecter <ArrowUpRight size={16} />
        </button>
        <a
          href="/"
          className="mt-5 inline-flex text-xs font-semibold text-slate-500 hover:text-blue-700"
        >
          Retour à Numeris
        </a>
      </div>
    </main>
  );
}

function AccessDenied() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
          <ShieldCheck size={25} />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
          Accès réservé à l’administration
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Votre compte est connecté, mais ne dispose pas du rôle administrateur.
        </p>
        <a
          href="/"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[#0d5c98] px-5 text-sm font-semibold text-white hover:bg-[#0a4d81]"
        >
          Retour au site
        </a>
      </div>
    </main>
  );
}

export default function AdminPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Administration — Numeris | Smart Print";
    return () => {
      document.title = previousTitle;
    };
  }, []);
  const [activeView, setActiveView] = useState<View>("overview");
  const [requestFilter, setRequestFilter] = useState<RequestStatus | "all">(
    "all"
  );
  const me = trpc.auth.me.useQuery();
  const isAdmin = me.data?.role === "admin";
  const overview = trpc.admin.overview.useQuery(undefined, {
    enabled: isAdmin,
  });
  const requests = trpc.admin.requests.useQuery(undefined, {
    enabled: isAdmin && activeView === "requests",
  });
  const utils = trpc.useUtils();
  const updateStatus = trpc.admin.setRequestStatus.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.admin.overview.invalidate(),
        utils.admin.requests.invalidate(),
      ]);
    },
  });
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => window.location.assign("/connexion"),
  });

  if (me.isPending) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">
        <span className="inline-flex items-center gap-3">
          <RefreshCw size={17} className="animate-spin text-blue-700" />{" "}
          Vérification de votre accès…
        </span>
      </div>
    );
  }
  if (me.error) {
    return <LoginGate />;
  }
  if (!me.data) {
    return <LoginGate />;
  }
  if (me.data.role !== "admin") {
    return <AccessDenied />;
  }

  const userName = me.data.name || me.data.email || "Administrateur";
  const counts = overview.data ?? {
    total: 0,
    new: 0,
    inProgress: 0,
    closed: 0,
    recent: [],
  };

  const requestFilterLabels: Record<RequestStatus | "all", string> = {
    all: "Toutes les demandes",
    new: "À traiter",
    in_progress: "En cours",
    closed: "Terminées",
  };
  const activeNavItem =
    activeView === "overview"
      ? "overview"
      : requestFilter === "all"
        ? "requests"
        : `requests-${requestFilter}`;
  const filteredRequestRows = (requests.data ?? []).filter(
    row => requestFilter === "all" || row.status === requestFilter
  );
  const navItems: WorkspaceNavItem[] = [
    {
      id: "overview",
      label: "Tableau de bord",
      icon: LayoutDashboard,
      onSelect: () => setActiveView("overview"),
    },
    {
      id: "requests-group",
      label: "Demandes de devis",
      icon: ClipboardList,
      badge: counts.new,
      children: [
        {
          id: "requests",
          label: "Toutes les demandes",
          icon: ClipboardList,
          onSelect: () => {
            setActiveView("requests");
            setRequestFilter("all");
          },
        },
        {
          id: "requests-new",
          label: "À traiter",
          icon: Activity,
          badge: counts.new,
          onSelect: () => {
            setActiveView("requests");
            setRequestFilter("new");
          },
        },
        {
          id: "requests-in_progress",
          label: "En cours",
          icon: ArrowDownRight,
          onSelect: () => {
            setActiveView("requests");
            setRequestFilter("in_progress");
          },
        },
        {
          id: "requests-closed",
          label: "Terminées",
          icon: ShieldCheck,
          onSelect: () => {
            setActiveView("requests");
            setRequestFilter("closed");
          },
        },
      ],
    },
  ];
  const pageTitle =
    activeView === "overview"
      ? "Tableau de bord"
      : requestFilterLabels[requestFilter];
  const headerAction = (
    <button
      type="button"
      title="Actualiser les données"
      aria-label="Actualiser les données"
      onClick={() => {
        void overview.refetch();
        if (activeView === "requests") void requests.refetch();
      }}
      className="grid h-8 w-8 place-items-center rounded-lg text-white/90 transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <RefreshCw
        size={15}
        className={
          overview.isFetching || requests.isFetching ? "animate-spin" : ""
        }
      />
    </button>
  );

  const statusMutationError = updateStatus.error?.message;

  return (
    <NumerisWorkspace
      activeItem={activeNavItem}
      navItems={navItems}
      pageTitle={pageTitle}
      userName={userName}
      roleLabel="Administrateur"
      variant="secure"
      notificationCount={counts.new}
      notificationLabel={
        counts.new
          ? `${counts.new} demande${counts.new > 1 ? "s" : ""} de devis à traiter.`
          : "Aucune nouvelle demande de devis."
      }
      headerAction={headerAction}
      onLogout={() => logout.mutate()}
    >
      <main
        id={activeView}
        className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#126aa7]">
              <ClipboardList size={12} /> Smart Print · Numeris · Administration
            </p>
            <h2 className="m-0 text-[22px] font-bold tracking-tight text-[#273f50] sm:text-[25px]">
              {activeView === "overview"
                ? "Vue d’ensemble des demandes"
                : "Suivi des demandes de devis"}
            </h2>
            <p className="mb-0 mt-1.5 text-[12px] text-slate-500">
              {activeView === "overview"
                ? "Les indicateurs sont calculés à partir des demandes enregistrées."
                : "Consultez les demandes reçues et mettez à jour leur statut."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Espace sécurisé
          </div>
        </div>

        {activeView === "overview" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Demandes reçues",
                  value: counts.total,
                  icon: FileText,
                  tone: "bg-blue-50 text-blue-700",
                  accent: "border-l-[#0067bb]",
                  note: "Toutes périodes",
                },
                {
                  label: "À traiter",
                  value: counts.new,
                  icon: Activity,
                  tone: "bg-indigo-50 text-indigo-700",
                  accent: "border-l-[#0067bb]",
                  note: "Nouvelles demandes",
                },
                {
                  label: "En cours",
                  value: counts.inProgress,
                  icon: ArrowDownRight,
                  tone: "bg-amber-50 text-amber-700",
                  accent: "border-l-[#ed965f]",
                  note: "Suivi engagé",
                },
                {
                  label: "Terminées",
                  value: counts.closed,
                  icon: ShieldCheck,
                  tone: "bg-emerald-50 text-emerald-700",
                  accent: "border-l-[#10b981]",
                  note: "Demandes clôturées",
                },
              ].map(({ label, value, icon: Icon, tone, accent, note }) => (
                <article
                  key={label}
                  className={`min-h-[98px] rounded-md border border-slate-200 border-l-[3px] bg-white p-4 shadow-[0_2px_8px_rgba(19,49,66,0.04)] transition hover:-translate-y-0.5 hover:shadow-md ${accent}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-bold text-slate-500">
                      {label}
                    </span>
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-md ${tone}`}
                    >
                      <Icon size={17} />
                    </span>
                  </div>
                  <p className="mb-0 mt-2 text-[23px] font-extrabold tracking-tight text-[#273f50]">
                    {overview.data ? value : "—"}
                  </p>
                  <p className="mb-0 mt-0.5 text-[9px] text-slate-400">
                    {note}
                  </p>
                </article>
              ))}
            </div>

            {overview.error && (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                <strong>Les données ne sont pas disponibles.</strong> Vérifiez
                que la base de données est configurée et que la migration des
                demandes de devis a été appliquée.
              </div>
            )}
            {statusMutationError && (
              <div
                className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700"
                role="alert"
              >
                {statusMutationError}
              </div>
            )}

            <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/35">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Dernières demandes
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Les demandes les plus récemment enregistrées
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView("requests");
                    setRequestFilter("all");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  Tout voir <ArrowUpRight size={14} />
                </button>
              </div>
              <RequestTable
                rows={counts.recent}
                empty="Aucune demande enregistrée pour le moment."
                onStatusChange={(id, status) =>
                  updateStatus.mutate({ id, status })
                }
                pending={updateStatus.isPending}
              />
            </section>
          </>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/35">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {requestFilterLabels[requestFilter]}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  {filteredRequestRows.length} affichée
                  {filteredRequestRows.length === 1 ? "" : "s"} sur les 100
                  demandes les plus récentes
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                {filteredRequestRows.length} / {requests.data?.length ?? 0}
              </span>
            </div>
            {requests.error && (
              <div className="m-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                Vérifiez que la base de données est configurée et que sa
                migration est appliquée.
              </div>
            )}
            <RequestTable
              rows={filteredRequestRows}
              empty={
                requests.isPending
                  ? "Chargement des demandes…"
                  : requestFilter === "all"
                    ? "Aucune demande enregistrée pour le moment."
                    : `Aucune demande au statut « ${requestFilterLabels[requestFilter].toLowerCase()} ».`
              }
              onStatusChange={(id, status) =>
                updateStatus.mutate({ id, status })
              }
              pending={updateStatus.isPending}
            />
          </section>
        )}
        <div className="mt-7 flex items-center justify-between gap-4 text-[10px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} /> Accès administrateur vérifié par le
            serveur
          </span>
          <span>Smart Print · Numeris · Administration</span>
        </div>
      </main>
    </NumerisWorkspace>
  );
}

type RequestRow = {
  id: number;
  reference: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  projectType: string;
  volume: string;
  status: RequestStatus;
  createdAt: Date | string;
};

function RequestTable({
  rows,
  empty,
  onStatusChange,
  pending,
}: {
  rows: RequestRow[];
  empty: string;
  onStatusChange: (id: number, status: RequestStatus) => void;
  pending: boolean;
}) {
  if (!rows.length) {
    return (
      <div className="grid min-h-40 place-items-center px-5 py-12 text-center text-sm text-slate-400">
        {empty}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-xs">
        <thead className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
          <tr>
            <th className="px-5 py-3.5 sm:px-6">Demande</th>
            <th className="px-4 py-3.5">Organisation</th>
            <th className="px-4 py-3.5">Projet</th>
            <th className="px-4 py-3.5">Reçue le</th>
            <th className="px-4 py-3.5">Statut</th>
            <th className="px-4 py-3.5">Suivi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(row => (
            <tr key={row.id} className="transition hover:bg-slate-50/70">
              <td className="px-5 py-4 sm:px-6">
                <span className="block font-bold text-slate-800">
                  {row.firstName} {row.lastName}
                </span>
                <span className="mt-1 block text-[10px] text-slate-400">
                  {row.reference} · {row.email}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="block max-w-40 truncate font-medium text-slate-700">
                  {row.company}
                </span>
                <span className="mt-1 block text-[10px] text-slate-400">
                  {row.volume}
                </span>
              </td>
              <td className="px-4 py-4 text-slate-600">
                {projectLabels[row.projectType] ?? row.projectType}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                {formatDate(row.createdAt)}
              </td>
              <td className="px-4 py-4">
                <RequestStatusBadge status={row.status} />
              </td>
              <td className="px-4 py-4">
                <select
                  aria-label={`Modifier le statut de ${row.reference}`}
                  value={row.status}
                  disabled={pending}
                  onChange={event =>
                    onStatusChange(row.id, event.target.value as RequestStatus)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-medium text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="new">À traiter</option>
                  <option value="in_progress">En cours</option>
                  <option value="closed">Terminée</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
