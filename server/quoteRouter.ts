import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { quoteRequests } from "../drizzle/schema";
import { getDb } from "./db";
import { publicProcedure, router } from "./_core/trpc";

const quoteInput = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(191),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(32).optional().default(""),
  projectType: z.enum(["digitization", "ocr", "rag", "complete"]),
  volume: z.enum([
    "under-500",
    "500-5000",
    "5000-50000",
    "over-50000",
    "unknown",
  ]),
  message: z.string().trim().max(2000).optional().default(""),
  consent: z.boolean().refine(accepted => accepted),
  companyWebsite: z.string().max(200).optional().default(""),
});

export const quoteRouter = router({
  submit: publicProcedure.input(quoteInput).mutation(async ({ input }) => {
    // Honeypot: return an indistinguishable acknowledgement without storing spam.
    if (input.companyWebsite.trim()) {
      return { reference: `NR-${nanoid(8).toUpperCase()}` };
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "SERVICE_UNAVAILABLE",
        message: "Le service de devis est temporairement indisponible.",
      });
    }

    const reference = `NR-${nanoid(8).toUpperCase()}`;
    try {
      await db.insert(quoteRequests).values({
        reference,
        firstName: input.firstName,
        lastName: input.lastName,
        company: input.company,
        email: input.email,
        phone: input.phone || null,
        projectType: input.projectType,
        volume: input.volume,
        message: input.message || null,
        consentAt: new Date(),
      });
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Impossible d’enregistrer la demande pour le moment.",
      });
    }

    return { reference };
  }),
});
