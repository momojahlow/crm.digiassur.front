import type { InsuranceSlug } from "@/lib/insurance-products";

export type InsuranceGroupKey = "all" | "vehicle" | "home" | "people" | "travel" | "projects";

type InsuranceGroup = {
  key: InsuranceGroupKey;
  label: string;
  slugs?: InsuranceSlug[];
};

export const INSURANCE_GROUPS: InsuranceGroup[] = [
  { key: "all", label: "Toutes" },
  { key: "vehicle", label: "Auto & mobilité", slugs: ["auto", "moto"] },
  { key: "home", label: "Habitation", slugs: ["habitation"] },
  { key: "people", label: "Santé & accidents", slugs: ["accident", "sante"] },
  { key: "travel", label: "Voyage", slugs: ["voyage"] },
  { key: "projects", label: "Épargne & loisirs", slugs: ["epargne", "loisir"] },
];

export function normalizeInsuranceSearch(value: string) {
  return value
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function insuranceMatchesGroup(slug: InsuranceSlug, group: InsuranceGroupKey) {
  if (group === "all") return true;
  return INSURANCE_GROUPS.find((item) => item.key === group)?.slugs?.includes(slug) ?? false;
}

export function insuranceGroupLabel(slug: InsuranceSlug) {
  return INSURANCE_GROUPS.find((group) => group.slugs?.includes(slug))?.label ?? "Assurance";
}
