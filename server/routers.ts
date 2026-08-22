import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { buildSupportMailto, hashClientPassword, validateReceiptDataUrl } from "./agency";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createLeadAccount, createPaymentReceipt, createSupportTicket, getLeadAccountByPhone } from "./db";
import { storagePut } from "./storage";
import { answerMSBConsultation } from "./msbAssistant";

const contactInput = z.string().trim().min(3).max(120);

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  clientAuth: router({
    register: publicProcedure
      .input(z.object({
        name: contactInput,
        phone: z.string().trim().min(6).max(32),
        password: z.string().min(6).max(128),
      }))
      .mutation(async ({ input }) => {
        const exists = await getLeadAccountByPhone(input.phone);
        if (exists) throw new TRPCError({ code: "CONFLICT", message: "هذا الرقم مسجل بالفعل. استخدم تسجيل الدخول." });
        const passwordHash = hashClientPassword(input.password);
        await createLeadAccount({ name: input.name, phone: input.phone, passwordHash });
        const mailUrl = buildSupportMailto({
          name: input.name,
          phone: input.phone,
          subject: "تسجيل عميل جديد",
          message: "تم إنشاء حساب جديد من نافذة التسجيل في موقع MSB Media.",
        });
        await notifyOwner({ title: "تسجيل عميل جديد — MSB Media", content: `${input.name} أنشأ حسابًا جديدًا.` });
        return { success: true, name: input.name, mailUrl };
      }),
    signIn: publicProcedure
      .input(z.object({ phone: z.string().trim().min(6).max(32), password: z.string().min(6).max(128) }))
      .mutation(async ({ input }) => {
        const account = await getLeadAccountByPhone(input.phone);
        const passwordHash = hashClientPassword(input.password);
        if (!account || account.passwordHash !== passwordHash) throw new TRPCError({ code: "UNAUTHORIZED", message: "بيانات الدخول غير صحيحة." });
        return { success: true, name: account.name };
      }),
  }),
  assistant: router({
    chat: publicProcedure
      .input(z.object({
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().trim().min(1).max(1200),
        })).min(1).max(10),
      }))
      .mutation(async ({ input }) => answerMSBConsultation(input.history)),
  }),
  support: router({
    create: publicProcedure
      .input(z.object({
        name: contactInput,
        phone: z.string().trim().min(6).max(32),
        email: z.string().trim().email().max(320).optional().or(z.literal("")),
        subject: contactInput.max(180),
        message: z.string().trim().min(10).max(5000),
      }))
      .mutation(async ({ input }) => {
        const mailUrl = buildSupportMailto({
          name: input.name,
          phone: input.phone,
          email: input.email || undefined,
          subject: input.subject,
          message: input.message,
        });
        await createSupportTicket({ ...input, emailDispatched: false });
        const notificationSent = await notifyOwner({
          title: "طلب دعم جديد — MSB Media",
          content: `${input.name} أرسل طلب دعم بعنوان: ${input.subject}`,
        });
        return { success: true, notificationSent, mailUrl };
      }),
  }),
  payment: router({
    submitReceipt: publicProcedure
      .input(z.object({
        method: z.enum(["vodafone_cash", "binance_pay"]),
        customerName: contactInput,
        phone: z.string().trim().min(6).max(32),
        binancePhone: z.string().trim().min(6).max(32).optional(),
        filename: z.string().trim().min(1).max(255),
        mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
        dataUrl: z.string().min(20),
      }))
      .mutation(async ({ input }) => {
        if (input.method === "binance_pay" && !input.binancePhone) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "يرجى كتابة رقم هاتفك لتأكيد التحويل." });
        }
        const bytes = validateReceiptDataUrl(input.dataUrl, input.mimeType);
        const safeFilename = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
        const { key, url } = await storagePut(
          `payment-receipts/${Date.now()}-${safeFilename}`,
          bytes,
          input.mimeType,
        );
        await createPaymentReceipt({
          method: input.method,
          customerName: input.customerName,
          phone: input.phone,
          binancePhone: input.binancePhone,
          receiptKey: key,
          receiptUrl: url,
          filename: input.filename,
          mimeType: input.mimeType,
          sizeBytes: bytes.length,
        });
        const notificationSent = await notifyOwner({
          title: "إيصال دفع جديد — MSB Media",
          content: `${input.customerName} رفع إيصال ${input.method === "binance_pay" ? "Binance Pay" : "Vodafone Cash"}.`,
        });
        return { success: true, notificationSent };
      }),
  }),
});

export type AppRouter = typeof appRouter;
