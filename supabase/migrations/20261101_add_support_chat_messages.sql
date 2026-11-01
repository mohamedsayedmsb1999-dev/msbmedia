-- MSB Media support chat: additive only, preserves existing tickets.
alter table public.support_tickets
  add column if not exists reply_token_hash text;

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  customer_profile_id uuid not null references public.customer_profiles(id) on delete cascade,
  sender text not null check (sender in ('customer', 'admin')),
  message text not null check (char_length(trim(message)) between 1 and 5000),
  created_at timestamptz not null default now()
);

create index if not exists support_messages_ticket_idx
  on public.support_messages(ticket_id, created_at asc);
create index if not exists support_messages_customer_idx
  on public.support_messages(customer_profile_id, created_at desc);
alter table public.support_messages enable row level security;
revoke all on public.support_messages from anon, authenticated;
