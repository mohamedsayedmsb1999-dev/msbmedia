import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { sendSupportEmail, validateReceiptDataUrl } from "./agency";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createPaymentReceipt, createSupportTicket } from "./db";
import { storagePut } from "./storage";

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
        const emailDispatched = await sendSupportEmail({
          name: input.name,
          phone: input.phone,
          email: input.email || undefined,
          subject: input.subject,
          message: input.message,
        });
        await createSupportTicket({ ...input, emailDispatched });
        const notificationSent = await notifyOwner({
          title: "طلب دعم جديد — MSB Media",
          content: `${input.name} أرسل طلب دعم بعنوان: ${input.subject}`,
        });
        return { success: true, notificationSent, emailDispatched };
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
