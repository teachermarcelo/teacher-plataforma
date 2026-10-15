-- Teacher Platform: prospect/contact CRM. Additive migration; does not modify existing student or class data.
create table if not exists public.tic_prospects (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  whatsapp text,
  interest text,
  level text,
  source text not null default 'Não informado',
  status text not null default 'new' check (status in ('new','contacted','trial_scheduled','follow_up','converted','lost')),
  notes text,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists tic_prospects_teacher_status_idx on public.tic_prospects (teacher_id, status, created_at desc);
create index if not exists tic_prospects_teacher_followup_idx on public.tic_prospects (teacher_id, next_follow_up_at);
alter table public.tic_prospects enable row level security;
drop policy if exists tic_prospects_teacher_all on public.tic_prospects;
create policy tic_prospects_teacher_all on public.tic_prospects for all to authenticated
using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());
grant select, insert, update, delete on public.tic_prospects to authenticated;
