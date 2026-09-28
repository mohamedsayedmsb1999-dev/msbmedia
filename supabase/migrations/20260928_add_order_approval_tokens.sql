alter table public.social_growth_orders
  add column if not exists approval_token_hash text;

create unique index if not exists social_growth_orders_approval_token_unique
  on public.social_growth_orders (approval_token_hash)
  where approval_token_hash is not null;
