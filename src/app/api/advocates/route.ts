import {db} from "@/db";
import {advocates} from "@/db/schema";
import {Advocate} from '@/lib/types';
import {ilike, or, sql} from "drizzle-orm";
import {unstable_cache} from "next/cache";

export async function GET(req: Request) {
  const url = new URL(req.url);

  // Input validation for search term
  let searchTerm = url.searchParams.get("searchTerm")?.slice(0).toLowerCase() || "";
  if (searchTerm) {
    // Escape special characters for ILIKE to prevent regex issues
    searchTerm = searchTerm.replace(/[%_\\]/g, '\\$&');
  }
  // Cache key based on search term
  const cacheKey = `advocates:${searchTerm}`;

  // Use Next.js unstable_cache for caching query results
  const getAdvocates = unstable_cache(
    async () => {
      // Build the query with explicit type
      let query = db.select().from(advocates) as unknown as Promise<Advocate[]>;

      // Apply filtering if searchTerm exists
      if (searchTerm) {
        query = db
          .select()
          .from(advocates)
          .where(
            or(
              ilike(advocates.firstName, `%${searchTerm}%`),
              ilike(advocates.lastName, `%${searchTerm}%`),
              ilike(advocates.city, `%${searchTerm}%`),
              ilike(advocates.degree, `%${searchTerm}%`),
              sql`jsonb_typeof(${advocates.specialties}) = 'array' AND EXISTS (
              SELECT 1
              FROM jsonb_array_elements_text(${advocates.specialties}) AS specialty
              WHERE specialty ILIKE ${`%${searchTerm}%`}
              )`,
              ilike(sql`${advocates.phoneNumber}::text`, `%${searchTerm}%`),
              ilike(sql`${advocates.yearsOfExperience}::text`, `%${searchTerm}%`)
            )
          ) as unknown as Promise<Advocate[]>;
      }

      const data = await query;

      return { data };
    },
    [cacheKey],
    { revalidate: 3600 } // Cache for 1 hour
  );

  try {
    const result = await getAdvocates();
    return Response.json(result);
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}