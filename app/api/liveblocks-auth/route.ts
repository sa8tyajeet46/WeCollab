import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
  secret: process.env.LIVE_BLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const user = await currentUser();

  const authorization = await auth();

  const { room } = await request.json();

  if (!room || !user) return new Response("unauthorized", { status: 403 });

  const board = await convex.query(api.boards.getBoard, { id: room });

  if (board?.orgId != authorization.orgId) {
    return new Response("unauthorized", { status: 403 });
  }
  // Get the current user from your database
  //   const user = __getUserFromDB__(request);

  //   // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    {
      userInfo: {
        name: user.firstName ? user.firstName : "TeamMate",
        image: user.imageUrl,
      },
    } // Optional
  );

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  //   // Use a naming pattern to allow access to rooms with wildcards
  //   // Giving the user read access on their org, and write access on their group
  //   session.allow(`${user.organization}:*`, session.READ_ACCESS);
  //   session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  //   // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
