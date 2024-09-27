import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/app/schema";

export function getDb(authToken: string) {
  return drizzle(
    neon(process.env.DATABASE_URL!, {
      authToken,
    }),
    { schema },
  );
}
