CREATE TYPE "public"."movimentation_types" AS ENUM('AUDIÊNCIA');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cpf" text NOT NULL,
	"phones" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movimentations" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"movimentation_type" "movimentation_types" NOT NULL,
	"expedition_date" timestamp with time zone NOT NULL,
	"final_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" char(12) PRIMARY KEY NOT NULL,
	"movimentation" char(12),
	"client" char(12),
	"sent" boolean NOT NULL,
	"recieved" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_movimentation_movimentations_id_fk" FOREIGN KEY ("movimentation") REFERENCES "public"."movimentations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_client_clients_id_fk" FOREIGN KEY ("client") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
