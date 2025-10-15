import {advocateData} from "@/db/seed/advocates";

export async function GET(req: Request) {
  const url = new URL(req.url);
  let searchTerm = url.searchParams.get("searchTerm")?.toLowerCase() || "";
  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
  }
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = searchTerm ? advocateData.filter((advocate) => {
    return (
      advocate.firstName.includes(searchTerm) ||
      advocate.lastName.includes(searchTerm) ||
      advocate.city.includes(searchTerm) ||
      advocate.degree.includes(searchTerm) ||
      advocate.specialties.includes(searchTerm) ||
      advocate.yearsOfExperience.toString().includes(searchTerm)
    );
  }) : advocateData;

  return Response.json({ data });
}
