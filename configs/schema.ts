import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

});

export const aiThumbnail = pgTable('thumbnails', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userInput: text().notNull(), // Changed to text for longer content
    referenceImageUrl: text(), // Changed to text for longer URLs
    faceImageUrl: text(), // Changed to text for longer URLs  
    thumbnailUrl: text().notNull(), // Changed to text for longer URLs
    userEmail: varchar({ length: 255 }).notNull().references(() => usersTable.email),
    createdAt: integer().notNull(),
    updatedAt: integer().notNull(),
})