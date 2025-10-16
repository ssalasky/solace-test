import {db} from "@/db";
import {advocates} from "@/db/schema";
import {advocateData} from "@/db/seed/advocates";

export async function POST() {
  try {
    // Truncate the table to clear existing data
    await db.delete(advocates);

    // Validate and insert seed data
    const validatedData = advocateData.map((advocate) => ({
      firstName: advocate.firstName,
      lastName: advocate.lastName,
      city: advocate.city,
      degree: advocate.degree,
      specialties: Array.isArray(advocate.specialties) ? advocate.specialties : [], // Ensure JSONB array
      yearsOfExperience: advocate.yearsOfExperience,
      phoneNumber: advocate.phoneNumber,
    }));

    const records = await db.insert(advocates).values(validatedData).returning();

    return Response.json({ advocates: records });
  } catch (error) {
    console.error("Error seeding advocates:", error);
    return Response.json({ error: "Failed to seed database" }, { status: 500 });
  }
}