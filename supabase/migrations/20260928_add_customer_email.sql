alter table public.customer_profiles add column if not exists email text;
create unique index if not exists customer_profiles_email_unique_idx on public.customer_profiles (lower(email)) where email is not null;
