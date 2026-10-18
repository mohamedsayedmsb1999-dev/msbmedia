-- Extend the manual social-growth order lifecycle without changing existing rows.
alter table public.social_growth_orders
drop constraint if exists social_growth_orders_status_check;

alter table public.social_growth_orders
add constraint social_growth_orders_status_check
check (status in ('manual_review', 'in_progress', 'processing', 'partial', 'completed', 'rejected'));
