create table if not exists public.wallet_deposits (
  id uuid primary key default gen_random_uuid(),
  customer_profile_id uuid not null references public.customer_profiles(id) on delete cascade,
  customer_name text not null check (char_length(trim(customer_name)) between 2 and 100),
  phone text not null check (char_length(trim(phone)) between 6 and 32),
  payment_method text not null check (payment_method in ('vodafone_cash', 'etisalat_cash', 'binance_pay')),
  amount numeric(12,2) not null check (amount > 0 and amount <= 1000000),
  fee numeric(12,2) not null default 0 check (fee >= 0),
  total_amount numeric(12,2) not null check (total_amount >= amount),
  service_id integer,
  service_name text,
  requested_quantity integer,
  target_url text,
  receipt_storage_path text not null,
  receipt_filename text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approval_token_hash text unique not null,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists wallet_deposits_customer_idx on public.wallet_deposits (customer_profile_id, created_at desc);
create index if not exists wallet_deposits_status_idx on public.wallet_deposits (status, created_at desc);

create table if not exists public.wallet_ledger (
  id uuid primary key default gen_random_uuid(),
  customer_profile_id uuid not null references public.customer_profiles(id) on delete cascade,
  amount numeric(12,2) not null check (amount <> 0),
  kind text not null check (kind in ('deposit', 'order', 'refund', 'adjustment')),
  reference_id uuid,
  description text not null,
  created_at timestamptz not null default now()
);
create index if not exists wallet_ledger_customer_idx on public.wallet_ledger (customer_profile_id, created_at desc);
create unique index if not exists wallet_ledger_reference_unique_idx on public.wallet_ledger (kind, reference_id) where reference_id is not null;

create table if not exists public.social_growth_orders (
  id uuid primary key default gen_random_uuid(),
  customer_profile_id uuid not null references public.customer_profiles(id) on delete cascade,
  service_id integer not null,
  service_name text not null,
  quantity integer not null check (quantity > 0),
  target_url text not null check (char_length(trim(target_url)) between 8 and 1000),
  amount numeric(12,2) not null check (amount > 0),
  status text not null default 'manual_review' check (status in ('manual_review', 'in_progress', 'completed', 'rejected')),
  created_at timestamptz not null default now()
);
create index if not exists social_growth_orders_customer_idx on public.social_growth_orders (customer_profile_id, created_at desc);
create index if not exists social_growth_orders_status_idx on public.social_growth_orders (status, created_at desc);

alter table public.wallet_deposits enable row level security;
alter table public.wallet_ledger enable row level security;
alter table public.social_growth_orders enable row level security;
