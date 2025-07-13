CREATE TABLE "thumbnails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "thumbnails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userInput" text NOT NULL,
	"referenceImageUrl" text,
	"faceImageUrl" text,
	"thumbnailUrl" text NOT NULL,
	"userEmail" varchar(255) NOT NULL,
	"createdAt" integer NOT NULL,
	"updatedAt" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "thumbnails" ADD CONSTRAINT "thumbnails_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;