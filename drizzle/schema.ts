import { pgTable, uuid, varchar, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', ['student', 'teacher', 'admin']);
export const verificationStatusEnum = pgEnum('verification_status', [
  'unverified',
  'pending',
  'verified',
  'rejected'
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Matches Supabase auth.users.id
  email: varchar('email', { length: 255 }).notNull().unique(),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role').default('student').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const teacherProfiles = pgTable('teacher_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  bio: text('bio'),
  hourlyRate: integer('hourly_rate'),
  verificationStatus: verificationStatusEnum('verification_status').default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type TeacherProfile = typeof teacherProfiles.$inferSelect;
export type NewTeacherProfile = typeof teacherProfiles.$inferInsert;
