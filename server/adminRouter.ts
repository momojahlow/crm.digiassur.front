import { TRPCError } from "@trpc/server";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { quoteRequests } from "../drizzle/schema";
import { getDb } from "./db";
import { adminProcedure, router } from "./_core/trpc";

const requestStatus = z.enum(["new", "in_progress", "closed"]);

async function requireDatabase() {
  const db = await getDb();
  if (!db) {
    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message: "La base de données Numeris n’est pas configurée.",
    });
  }
  return db;
}

export const adminRouter = router({
  overview: adminProcedure.query(async () => {
    const db = await requireDatabase();
    const rows = await db
      .select({
        status: quoteRequests.status,
        count: sql<number>`count(*)`,
      })
      .from(quoteRequests)
      .groupBy(quoteRequests.status);

    const totals = { total: 0, new: 0, inProgress: 0, closed: 0 };
    for (const row of rows) {
      const count = Number(row.count);
      totals.total += count;
      if (row.status === "new") totals.new = count;
      if (row.status === "in_progress") totals.inProgress = count;
      if (row.status === "closed") totals.closed = count;
    }

    const recent = await db
      .select({
        id: quoteRequests.id,
        reference: quoteRequests.reference,
        firstName: quoteRequests.firstName,
        lastName: quoteRequests.lastName,
        company: quoteRequests.company,
        email: quoteRequests.email,
        projectType: quoteRequests.projectType,
        volume: quoteRequests.volume,
        status: quoteRequests.status,
        createdAt: quoteRequests.createdAt,
      })
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt))
      .limit(6);

    return { ...totals, recent };
  }),

  requests: adminProcedure.query(async () => {
    const db = await requireDatabase();
    return db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt))
      .limit(100);
  }),

  setRequestStatus: adminProcedure
    .input(z.object({ id: z.number().int().positive(), status: requestStatus }))
    .mutation(async ({ input }) => {
      const db = await requireDatabase();
      await db
        .update(quoteRequests)
        .set({ status: input.status })
        .where(eq(quoteRequests.id, input.id));
      return { success: true } as const;
    }),
});
