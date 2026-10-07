import { useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";

export type WorkspaceNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  onSelect?: () => void;
  badge?: number;
  children?: WorkspaceNavItem[];
};

type NumerisWorkspaceProps = {
  activeItem: string;
  navItems: WorkspaceNavItem[];
  pageTitle: string;
  userName: string;
  roleLabel: string;
  variant: "demo" | "secure";
  notificationCount?: number;
  notificationLabel?: string;
  headerAction?: ReactNode;
  onLogout?: () => void;
  children: ReactNode;
};

export default function NumerisWorkspace({
  activeItem,
  navItems,
  pageTitle,
  userName,
  roleLabel,
  variant,
  notificationCount = 0,
  notificationLabel,
  headerAction,
  onLogout,
  children,
}: NumerisWorkspaceProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isDemo = variant === "demo";
  const initials = userName
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("");

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const containsActiveItem = (item: WorkspaceNavItem): boolean =>
    item.id === activeItem ||
    Boolean(item.children?.some(child => containsActiveItem(child)));

  const renderNavItem = (item: WorkspaceNavItem, depth = 0): ReactNode => {
    const Icon = item.icon;
    const selected = item.id === activeItem;
    const highlighted = containsActiveItem(item);
    const className = `group flex ${depth === 0 ? "min-h-11 rounded-r-xl border-l-[3px] px-3 text-[13px]" : "min-h-9 rounded-lg px-3 text-[11px]"} w-full items-center gap-3 text-left transition-colors ${highlighted ? "border-[#1678b9] bg-[#eaf4fb] font-semibold text-[#126aa7]" : "border-transparent font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`;
    const content = (
      <>
        <Icon
          size={depth === 0 ? 17 : 14}
          strokeWidth={highlighted ? 2.2 : 1.9}
          className={
            highlighted
              ? "text-[#1678b9]"
              : "text-slate-400 group-hover:text-slate-600"
          }
        />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
        {item.badge !== undefined && item.badge > 0 ? (
          <span
            className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${highlighted ? "bg-white text-[#126aa7]" : "bg-amber-100 text-amber-800"}`}
          >
            {item.badge}
          </span>
        ) : null}
      </>
    );

    if (item.children?.length) {
      const expanded =
        expandedGroups[item.id] ?? item.children.some(containsActiveItem);
      return (
        <div key={item.id}>
          <button
            type="button"
            onClick={() => {
              setExpandedGroups(groups => ({
                ...groups,
                [item.id]: !expanded,
              }));
              setNotificationsOpen(false);
              setProfileOpen(false);
            }}
            aria-expanded={expanded}
            className={`${className} justify-start`}
          >
            {content}
            <ChevronDown
              size={14}
              className={`shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
          {expanded ? (
            <div className="ml-[18px] border-l border-slate-200 py-1 pl-2">
              {item.children.map(child => renderNavItem(child, depth + 1))}
            </div>
          ) : null}
        </div>
      );
    }

    if (item.href) {
      return (
        <a
          key={item.id}
          href={item.href}
          onClick={() => {
            item.onSelect?.();
            closeMenus();
          }}
          aria-current={selected ? "page" : undefined}
          className={className}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          item.onSelect?.();
          closeMenus();
        }}
        aria-pressed={selected}
        className={className}
      >
        {content}
      </button>
    );
  };

  const renderNavigation = () => (
    <nav
      aria-label="Navigation de l’espace de travail"
      className="space-y-1 px-3"
    >
      {navItems.map(item => renderNavItem(item))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Fermer la navigation"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`${mobileMenuOpen ? "fixed inset-y-0 left-0 z-40 flex w-[min(84vw,280px)] shadow-2xl" : "hidden"} min-h-screen flex-col border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-auto lg:shadow-none`}
      >
        <a
          href="/"
          onClick={closeMenus}
          className="flex h-[76px] shrink-0 items-center gap-3 border-b border-slate-100 px-5"
          aria-label="Smart Print Numeris — accueil"
        >
          <img src="/numeris-mark.svg" alt="" className="h-10 w-10 shrink-0" />
          <span className="min-w-0">
            <strong className="block text-[15px] font-extrabold tracking-tight text-[#173d56]">
              Smart Print
            </strong>
            <small className="mt-0.5 block text-[9px] font-bold tracking-[0.13em] text-slate-400">
              APPLICATION NUMERIS
            </small>
          </span>
        </a>

        <div className="px-5 pb-2 pt-6 text-[9px] font-extrabold uppercase tracking-[0.17em] text-slate-400">
          Espace documentaire
        </div>
        {renderNavigation()}

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#37566a]">
              <ShieldCheck
                size={15}
                className={isDemo ? "text-amber-600" : "text-emerald-600"}
              />
              {isDemo ? "Démonstration isolée" : "Accès administrateur"}
            </div>
            <p className="mb-0 mt-2 text-[10px] leading-4 text-slate-500">
              {isDemo
                ? "Exemples fictifs uniquement. Aucun document n’est importé."
                : "Les droits sont vérifiés côté serveur."}
            </p>
          </div>
          <a
            href={isDemo ? "/connexion" : "/"}
            onClick={closeMenus}
            className="mt-3 inline-flex min-h-9 w-full items-center gap-2 rounded-lg px-2 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#126aa7]"
          >
            {isDemo ? <LogOut size={14} /> : <ShieldCheck size={14} />}
            {isDemo ? "Quitter la démonstration" : "Retour au site"}
          </a>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-[58px] items-center gap-3 bg-[#0b2945] px-3 text-white shadow-sm sm:px-5 lg:px-7">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(open => !open)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white/90 transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <div className="hidden min-w-0 flex-1 items-center gap-2 text-[12px] lg:flex">
            <span className="font-medium text-white/75">Smart Print</span>
            <span className="text-white/45">/</span>
            <span className="font-semibold text-white/95">Numeris</span>
            <span className="text-white/45">/</span>
            <span className="truncate text-white">{pageTitle}</span>
          </div>
          <div className="min-w-0 flex-1 lg:hidden">
            <span className="block truncate text-[11px] font-bold tracking-wide">
              SMART PRINT · NUMERIS
            </span>
          </div>

          <div
            role="group"
            aria-label="Statut, notifications et compte"
            className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3"
          >
            <span
              className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] sm:inline-flex ${isDemo ? "bg-amber-300/20 text-amber-50" : "bg-white/15 text-white"}`}
            >
              {isDemo ? "Mode démo" : "Espace sécurisé"}
            </span>

            {headerAction}

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(open => !open);
                  setProfileOpen(false);
                }}
                aria-label={`Notifications${notificationCount ? `, ${notificationCount} en attente` : ""}`}
                aria-expanded={notificationsOpen}
                className="relative grid h-9 w-9 place-items-center rounded-lg text-white/95 transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Bell size={17} />
                {notificationCount > 0 ? (
                  <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-amber-300 px-1 text-[9px] font-extrabold leading-none text-[#354b50]">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                ) : null}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-[48px] z-50 w-[min(84vw,300px)] rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-xl">
                  <p className="m-0 text-[12px] font-bold">Notifications</p>
                  <p className="mb-0 mt-2 text-[11px] leading-5 text-slate-500">
                    {notificationLabel ??
                      (notificationCount
                        ? `${notificationCount} élément${notificationCount > 1 ? "s" : ""} à consulter.`
                        : "Aucune nouvelle notification.")}
                  </p>
                  {isDemo ? (
                    <span className="mt-3 inline-flex rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-amber-800">
                      Notifications fictives
                    </span>
                  ) : null}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(open => !open);
                  setNotificationsOpen(false);
                }}
                aria-label={`Menu du compte : ${userName}`}
                aria-expanded={profileOpen}
                className="flex h-9 items-center gap-2 rounded-lg px-1.5 text-left transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-2"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/50 bg-white/15 text-[10px] font-extrabold">
                  {initials || "SP"}
                </span>
                <span className="hidden max-w-[170px] sm:block">
                  <span className="block truncate text-[11px] font-semibold leading-4">
                    {userName}
                  </span>
                  <span className="block truncate text-[9px] leading-3 text-white/70">
                    {roleLabel}
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className="hidden text-white/80 sm:block"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-[48px] z-50 w-[min(84vw,260px)] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="m-0 truncate text-[11px] font-bold">
                      {userName}
                    </p>
                    <p className="mb-0 mt-1 truncate text-[10px] text-slate-500">
                      {roleLabel}
                    </p>
                  </div>
                  {onLogout ? (
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className="flex min-h-10 w-full items-center gap-2 px-4 text-left text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-rose-700"
                    >
                      <LogOut size={14} /> Se déconnecter
                    </button>
                  ) : (
                    <a
                      href="/connexion"
                      onClick={closeMenus}
                      className="flex min-h-10 items-center gap-2 px-4 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#126aa7]"
                    >
                      <LogOut size={14} /> Quitter la démonstration
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
