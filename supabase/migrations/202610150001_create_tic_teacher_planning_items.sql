-- Teacher-only planning records for per-student Materials, Resources, Lessons and Agenda.
-- Additive migration: does not modify or migrate existing records.
create table if not exists public.tic_teacher_planning_items (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.tic_teachers(id) on delete cascade,
  student_id uuid not null references public.tic_students(id) on delete cascade,
  class_id uuid null references public.tic_classes(id) on delete set null,
  category text not null check (category in ('material','resource','lesson','agenda')),
  title text not null,
  notes text null,
  resource_url text null,
  scheduled_at timestamptz null,
  status text not null default 'planned' check (status in ('planned','in_progress','done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists tic_teacher_planning_items_teacher_date_idx
  on public.tic_teacher_planning_items (teacher_id, scheduled_at desc);
create index if not exists tic_teacher_planning_items_student_idx
  on public.tic_teacher_planning_items (student_id, created_at desc);
alter table public.tic_teacher_planning_items enable row level security;
drop policy if exists tic_teacher_planning_items_select_own on public.tic_teacher_planning_items;
create policy tic_teacher_planning_items_select_own on public.tic_teacher_planning_items
  for select to authenticated using (teacher_id = auth.uid());
drop policy if exists tic_teacher_planning_items_insert_own on public.tic_teacher_planning_items;
create policy tic_teacher_planning_items_insert_own on public.tic_teacher_planning_items
  for insert to authenticated with check (
    teacher_id = auth.uid()
    and exists (select 1 from public.tic_students s where s.id = student_id and s.teacher_id = auth.uid())
    and (class_id is null or exists (select 1 from public.tic_classes c where c.id = class_id and c.teacher_id = auth.uid()))
  );
drop policy if exists tic_teacher_planning_items_update_own on public.tic_teacher_planning_items;
create policy tic_teacher_planning_items_update_own on public.tic_teacher_planning_items
  for update to authenticated using (teacher_id = auth.uid()) with check (
    teacher_id = auth.uid()
    and exists (select 1 from public.tic_students s where s.id = student_id and s.teacher_id = auth.uid())
    and (class_id is null or exists (select 1 from public.tic_classes c where c.id = class_id and c.teacher_id = auth.uid()))
  );
drop policy if exists tic_teacher_planning_items_delete_own on public.tic_teacher_planning_items;
create policy tic_teacher_planning_items_delete_own on public.tic_teacher_planning_items
  for delete to authenticated using (teacher_id = auth.uid());
grant select, insert, update, delete on public.tic_teacher_planning_items to authenticated;
