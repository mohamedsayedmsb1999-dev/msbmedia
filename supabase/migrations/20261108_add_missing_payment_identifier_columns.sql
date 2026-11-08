-- Additive repair only: preserves all existing deposits and receipts.
alter table public.wallet_deposits add column if not exists payment_identifier text;
alter table public.payment_receipts add column if not exists payment_identifier text;
