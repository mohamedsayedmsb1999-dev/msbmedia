import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, leadAccounts, paymentReceipts, supportTickets, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export type CreateSupportTicketInput = {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  emailDispatched: boolean;
};

export async function createSupportTicket(input: CreateSupportTicketInput): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("قاعدة البيانات غير متاحة حاليًا.");

  await db.insert(supportTickets).values({
    name: input.name,
    phone: input.phone,
    email: input.email || null,
    subject: input.subject,
    message: input.message,
    emailDispatched: input.emailDispatched ? 1 : 0,
  });
}

export type CreatePaymentReceiptInput = {
  method: "vodafone_cash" | "binance_pay";
  customerName: string;
  phone: string;
  binancePhone?: string;
  receiptKey: string;
  receiptUrl: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
};

export async function createPaymentReceipt(input: CreatePaymentReceiptInput): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("قاعدة البيانات غير متاحة حاليًا.");

  await db.insert(paymentReceipts).values({
    method: input.method,
    customerName: input.customerName,
    phone: input.phone,
    binancePhone: input.binancePhone || null,
    receiptKey: input.receiptKey,
    receiptUrl: input.receiptUrl,
    filename: input.filename,
    mimeType: input.mimeType,
    sizeBytes: input.sizeBytes,
  });
}

export async function createLeadAccount(input: { name: string; phone: string; passwordHash: string }): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("قاعدة البيانات غير متاحة حاليًا.");
  await db.insert(leadAccounts).values(input);
}

export async function getLeadAccountByPhone(phone: string) {
  const db = await getDb();
  if (!db) throw new Error("قاعدة البيانات غير متاحة حاليًا.");
  const result = await db.select().from(leadAccounts).where(eq(leadAccounts.phone, phone)).limit(1);
  return result[0];
}
