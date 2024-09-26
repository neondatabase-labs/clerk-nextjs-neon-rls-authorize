import { auth, clerkClient } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  const { sessionId } = auth();

  if (!sessionId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = await clerkClient.sessions.getToken(sessionId, "Neon");
  const sql = neon(
    "postgresql://anonymous@ep-fancy-cell-w001y1ab.cloud.nitrogen.aws.neon.build/neondb?sslmode=require",
    {
      authToken: token.jwt,
    },
  );
  const results = await sql(`SELECT 1`);
  console.log(results);

  return Response.json({ token });
}
