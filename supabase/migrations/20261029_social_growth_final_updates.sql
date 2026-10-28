-- MSB Media final social-growth additions; additive only, no existing rows deleted.
DO $$ DECLARE c record; BEGIN
  FOR c IN SELECT conname, conrelid::regclass AS tbl FROM pg_constraint WHERE conrelid IN ('public.wallet_deposits'::regclass, 'public.payment_receipts'::regclass) AND pg_get_constraintdef(oid) ILIKE '%payment_method%' LOOP EXECUTE format('ALTER TABLE %s DROP CONSTRAINT %I', c.tbl, c.conname); END LOOP;
END $$;
ALTER TABLE public.wallet_deposits ADD CONSTRAINT wallet_deposits_payment_method_check CHECK (payment_method IN ('vodafone_cash', 'etisalat_cash', 'binance_pay', 'instapay'));
ALTER TABLE public.payment_receipts ADD CONSTRAINT payment_receipts_payment_method_check CHECK (payment_method IN ('vodafone_cash', 'etisalat_cash', 'binance_pay', 'instapay'));
ALTER TABLE public.wallet_deposits ADD COLUMN IF NOT EXISTS payment_identifier text;
ALTER TABLE public.payment_receipts ADD COLUMN IF NOT EXISTS payment_identifier text;
CREATE TABLE IF NOT EXISTS public.order_assistance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_profile_id uuid NOT NULL REFERENCES public.customer_profiles(id) ON DELETE CASCADE,
  order_id_text text NOT NULL CHECK (order_id_text ~ '^[A-Za-z0-9-]{4,40}$'),
  request_type text NOT NULL CHECK (request_type IN ('تعويض', 'اكتمال وهمى', 'تسريع', 'إلغاء')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS order_assistance_customer_idx ON public.order_assistance_requests(customer_profile_id, created_at DESC);
ALTER TABLE public.order_assistance_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.order_assistance_requests FROM anon, authenticated;
