import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const aiThumbnail = pgTable('thumbnails', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userInput: text().notNull(), 
    referenceImageUrl: text(), 
    faceImageUrl: text(), 
    thumbnailUrl: text().notNull(), 
    userEmail: varchar({ length: 255 }).notNull().references(() => usersTable.email),
    createdAt: integer().notNull(),
    updatedAt: integer().notNull(),
})

export const aiContent = pgTable('aiContent', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userInput: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    tags: text().notNull(),
    thumbnails: text().notNull(), // Store as JSON string array of thumbnail objects
    userEmail: varchar({ length: 255 }).notNull().references(() => usersTable.email),
    createdAt: integer().notNull(),
    updatedAt: integer().notNull(),
});