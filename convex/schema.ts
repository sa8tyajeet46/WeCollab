import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    image: v.string(),
    authId: v.string(),
    authName: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  userFavourite: defineTable({
    userId: v.string(),
    id: v.id("boards"),
    orgId: v.string(),
  })
    .index("by_board", ["id"])
    .index("by_user_board", ["userId", "id"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board_org", ["userId", "id", "orgId"]),
});
