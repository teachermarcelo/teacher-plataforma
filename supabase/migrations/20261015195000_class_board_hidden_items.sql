create table if not exists public.tic_class_board_hidden_items (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  class_id uuid not null references public.tic_classes(id) on delete cascade,
  source_type text not null check (source_type in ('assignment','lesson','material')),
  source_id uuid not null,
  created_at timestamptz not null default now(),
  unique (class_id, source_type, source_id)
);
create index if not exists tic_class_board_hidden_items_teacher_class_idx
  on public.tic_class_board_hidden_items (teacher_id, class_id);
alter table public.tic_class_board_hidden_items enable row level security;
drop policy if exists "Teachers read own hidden board items" on public.tic_class_board_hidden_items;
create policy "Teachers read own hidden board items"
  on public.tic_class_board_hidden_items for select to authenticated
  using (teacher_id = auth.uid());
drop policy if exists "Teachers insert own hidden board items" on public.tic_class_board_hidden_items;
create policy "Teachers insert own hidden board items"
  on public.tic_class_board_hidden_items for insert to authenticated
  with check (teacher_id = auth.uid() and exists (
    select 1 from public.tic_classes c where c.id = class_id and c.teacher_id = auth.uid()
  ));
drop policy if exists "Teachers update own hidden board items" on public.tic_class_board_hidden_items;
create policy "Teachers update own hidden board items"
  on public.tic_class_board_hidden_items for update to authenticated
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid() and exists (
    select 1 from public.tic_classes c where c.id = class_id and c.teacher_id = auth.uid()
  ));
drop policy if exists "Teachers delete own hidden board items" on public.tic_class_board_hidden_items;
create policy "Teachers delete own hidden board items"
  on public.tic_class_board_hidden_items for delete to authenticated
  using (teacher_id = auth.uid());