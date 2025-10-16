import {db} from "@/db";
import {advocates} from "@/db/schema";
import {Advocate} from '@/lib/types';
import {ilike, or, sql} from "drizzle-orm";
import {unstable_cache} from "next/cache";

// Constants for pagination
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;
const SEARCH_TERM_MAX_LENGTH = 100;

export async function GET(req: Request) {
  const url = new URL(req.url);

  // Input validation for search term
  let searchTerm = url.searchParams.get("searchTerm")?.slice(0, SEARCH_TERM_MAX_LENGTH).toLowerCase() || "";
  if (searchTerm) {
    // Escape special characters for ILIKE to prevent regex issues
    searchTerm = searchTerm.replace(/[%_\\]/g, '\\$&');
  }

  // Pagination parameters
  const page = Math.max(1, parseInt(url.searchParams.get("page") || DEFAULT_PAGE.toString(), 10));
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, parseInt(url.searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(), 10))
  );
  const offset = (page - 1) * pageSize;

  // Cache key based on search term and pagination
  const cacheKey = `advocates:${searchTerm}:${page}:${pageSize}`;

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

      // Apply pagination
      const data = await query.limit(pageSize).offset(offset);

      // Get total count for pagination metadata
      const totalCountQuery = searchTerm
        ? db
          .select({ count: sql`count(*)::int` })
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
          )
        : db.select({ count: sql`count(*)::int` }).from(advocates);

      const [{ count: totalCount }] = await totalCountQuery;

      return { data, totalCount, page, pageSize };
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