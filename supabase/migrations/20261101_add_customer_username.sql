alter table public.customer_profiles add column if not exists username text;
create unique index if not exists customer_profiles_username_lower_idx on public.customer_profiles (lower(username)) where username is not null;
