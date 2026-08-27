create table if not exists public.ad_campaign_requests (
  id uuid primary key default gen_random_uuid(),
  customer_profile_id uuid references public.customer_profiles(id) on delete set null,
  full_name text not null check (char_length(trim(full_name)) between 2 and 100),
  whatsapp_number text not null check (char_length(trim(whatsapp_number)) between 6 and 32),
  business_name text not null check (char_length(trim(business_name)) between 2 and 160),
  page_url text not null check (char_length(trim(page_url)) between 8 and 1000),
  description text,
  objective text not null check (objective in ('ecommerce_sales', 'messages', 'leads', 'awareness')),
  budget_range text not null check (budget_range in ('5k_10k', '10k_25k', '25k_plus')),
  previous_ads boolean not null,
  notes text,
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed')),
  notified_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists ad_campaign_requests_created_at_idx on public.ad_campaign_requests (created_at desc);
create index if not exists ad_campaign_requests_customer_profile_idx on public.ad_campaign_requests (customer_profile_id);

alter table public.ad_campaign_requests enable row level security;
