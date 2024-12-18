import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
    title: v.optional(v.string()),
    favourite: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return new Error("unauthorized");

    const search = args.title;

    let boards = [];

    if (args.favourite) {
      const favourites = await ctx.db
        .query("userFavourite")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const favoriteids = favourites.map((f) => f.id);

      const favouriteBoards = await Promise.all(
        favoriteids.map((f) => {
          return ctx.db
            .query("boards")
            .withIndex("by_id", (q) => q.eq("_id", f))
            .unique()
            .then((board) => {
              return {
                ...board,
                favourite: true,
              };
            });
        })
      );
      return favouriteBoards;
    }

    if (search) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("title", (q) => q.search("title", search))
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardwithFavourites = boards.map((board) => {
      return ctx.db
        .query("userFavourite")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity?.subject).eq("id", board._id)
        )
        .unique()
        .then((favo) => {
          return {
            ...board,
            favourite: !!favo,
          };
        });
    });

    const response = await Promise.all(boardwithFavourites);
    if (!response) {
      new Error("something went wrong");
    }

    return response;
  },
});

export const getBoard = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);

    return board;
  },
});
