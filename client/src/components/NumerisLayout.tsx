import type { ReactNode } from "react";
import NumerisFooter from "@/components/NumerisFooter";
import NumerisHeader from "@/components/NumerisHeader";

type NumerisLayoutProps = {
  children: ReactNode;
  isHome?: boolean;
  className?: string;
};

export default function NumerisLayout({
  children,
  isHome = false,
  className = "",
}: NumerisLayoutProps) {
  const classes = ["numeris-site", className].filter(Boolean).join(" ");

  return (
    <div className={classes} id="accueil">
      <NumerisHeader isHome={isHome} />
      {children}
      <NumerisFooter isHome={isHome} />
    </div>
  );
}
