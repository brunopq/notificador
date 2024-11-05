import { relations } from "drizzle-orm"
import {
  boolean,
  char,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { customAlphabet } from "nanoid"

const idLength = 12
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  idLength,
)

//

export const notification = pgTable("notifications", {
  id: char("id", { length: idLength }).$defaultFn(nanoid).primaryKey(),
  movimentation: char("movimentation", { length: idLength }).references(
    () => movimentation.id,
  ),
  client: char("client", { length: idLength }).references(() => client.id),
  sent: boolean("sent").notNull(),
  recieved: boolean("recieved").notNull(),
})

export const notificationRelations = relations(notification, ({ one }) => ({
  client: one(client, {
    fields: [notification.client],
    references: [client.id],
  }),
  movimentation: one(movimentation, {
    fields: [notification.movimentation],
    references: [movimentation.id],
  }),
}))

//

export const movimentationTypes = pgEnum("movimentation_types", [
  "AUDIÊNCIA" /* TODO */,
])

export const movimentation = pgTable("movimentations", {
  id: char("id", { length: idLength }).$defaultFn(nanoid).primaryKey(),
  type: movimentationTypes("movimentation_type").notNull(),
  expeditionDate: timestamp("expedition_date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  finalDate: timestamp("final_date", { withTimezone: true, mode: "date" }),
})

export const movimentationRelations = relations(movimentation, ({ many }) => ({
  notifications: many(notification),
}))

//

export const client = pgTable("clients", {
  id: char("id", { length: idLength }).$defaultFn(nanoid).primaryKey(),
  name: text("name").notNull(),
  cpf: text("cpf").notNull(),
  phones: text("phones").array().notNull(),
})

export const clientRelations = relations(client, ({ many }) => ({
  notifications: many(notification),
}))
