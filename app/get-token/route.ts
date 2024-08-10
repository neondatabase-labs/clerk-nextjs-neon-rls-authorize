import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const { sessionId } = auth();

  if (!sessionId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const template = "Neon";

  const token = await clerkClient.sessions.getToken(sessionId, template);

  console.log(token);
  /*
  _Token {
    jwt: 'eyJhbG...'
  }
  */

  return Response.json({ token });
}
