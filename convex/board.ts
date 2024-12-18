import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

const generateRandomImage = () => {
  const RandomImageArr = [
    "placeholder/cardplaceholder/01.jpg",
    "placeholder/cardplaceholder/02.jpg",
    "placeholder/cardplaceholder/03.jpg",
    "placeholder/cardplaceholder/04.jpg",
    "placeholder/cardplaceholder/05.jpg",
  ];
  return RandomImageArr[Math.floor(Math.random() * 4)];
};
// Create a new task with the given text
export const createBoard = mutation({
  args: {
    title: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user?.name) throw new ConvexError("unauthorized");
    const newBoard = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authId: user.subject,
      authName: user.name,
      image: generateRandomImage(),
    });

    return newBoard;
  },
});

export const DeleteBoard = mutation({
  args: { id: v.id("boards") },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user?.name) throw new ConvexError("unauthorized");

    const boards = await ctx.db.delete(args.id);

    const favourites = await ctx.db
      .query("userFavourite")
      .withIndex("by_board", (q) => q.eq("id", args.id))
      .collect();

    await Promise.all(
      favourites.map((favourite) => {
        ctx.db.delete(favourite._id);
      })
    );

    return boards;
  },
});

export const RenameBoard = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user?.name) throw new ConvexError("unauthorized");

    const title = args.title.trim();

    if (!title) {
      throw new Error("title can't be empty");
    }

    if (title.length > 60) {
      throw new Error("title can't be more than 60 characters");
    }
    const board = await ctx.db.patch(args.id, {
      title: title,
    });

    return board;
  },
});

export const Favourite = mutation({
  args: { orgId: v.string(), id: v.id("boards") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user?.name) throw new ConvexError("unauthorized");

    const existingFavourite = await ctx.db
      .query("userFavourite")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", user.subject).eq("id", args.id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFavourite) {
      throw new Error("can't favourtite as it is always there");
    }

    const favourite = await ctx.db.insert("userFavourite", {
      id: args.id,
      orgId: args.orgId,
      userId: user.subject,
    });

    return favourite;
  },
});

export const UnFavourite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user?.name) throw new ConvexError("unauthorized");

    const existingFavourite = await ctx.db
      .query("userFavourite")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", user.subject).eq("id", args.id)
      )
      .unique();

    if (!existingFavourite) {
      throw new Error("can't unfavourtite");
    }

    const favourite = await ctx.db.delete(existingFavourite._id);

    return favourite;
  },
});
