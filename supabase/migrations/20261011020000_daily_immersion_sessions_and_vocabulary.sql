-- Additive Daily Immersion support. Existing activity/progress tables are untouched.
create table if not exists public.tic_immersion_sessions (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.tic_students(id) on delete cascade,
 teacher_id uuid not null references auth.users(id) on delete cascade,
 session_date date not null default current_date,
 activity_id uuid null references public.tic_immersion_activities(id) on delete set null,
 status text not null default 'started' check (status in ('started','completed')),
 started_at timestamptz not null default now(),
 completed_at timestamptz null,
 duration_minutes integer not null default 0 check (duration_minutes >= 0 and duration_minutes <= 1440),
 steps jsonb not null default '{}'::jsonb,
 reflection text not null default '',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(student_id, session_date)
);
create index if not exists tic_immersion_sessions_teacher_date_idx on public.tic_immersion_sessions(teacher_id, session_date desc);
create index if not exists tic_immersion_sessions_student_date_idx on public.tic_immersion_sessions(student_id, session_date desc);
alter table public.tic_immersion_sessions enable row level security;
drop policy if exists tic_immersion_sessions_student_select on public.tic_immersion_sessions;
create policy tic_immersion_sessions_student_select on public.tic_immersion_sessions for select to authenticated using (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id)
 or (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin') and exists (select 1 from public.tic_students s where s.id=student_id and s.teacher_id=auth.uid()))
);
drop policy if exists tic_immersion_sessions_student_insert on public.tic_immersion_sessions;
create policy tic_immersion_sessions_student_insert on public.tic_immersion_sessions for insert to authenticated with check (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
 and (activity_id is null or exists (select 1 from public.tic_immersion_activities a where a.id=activity_id and a.teacher_id=teacher_id and a.is_published=true and a.is_archived=false))
);
drop policy if exists tic_immersion_sessions_student_update on public.tic_immersion_sessions;
create policy tic_immersion_sessions_student_update on public.tic_immersion_sessions for update to authenticated using (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
) with check (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
 and (activity_id is null or exists (select 1 from public.tic_immersion_activities a where a.id=activity_id and a.teacher_id=teacher_id and a.is_published=true and a.is_archived=false))
);

create table if not exists public.tic_immersion_vocabulary (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.tic_students(id) on delete cascade,
 teacher_id uuid not null references auth.users(id) on delete cascade,
 activity_id uuid null references public.tic_immersion_activities(id) on delete set null,
 term text not null,
 meaning text not null default '',
 example text not null default '',
 ease_level integer not null default 0 check (ease_level between 0 and 5),
 repetitions integer not null default 0 check (repetitions >= 0),
 interval_days integer not null default 0 check (interval_days >= 0),
 due_date date not null default current_date,
 last_reviewed_at timestamptz null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(student_id, term)
);
create index if not exists tic_immersion_vocabulary_due_idx on public.tic_immersion_vocabulary(student_id, due_date);
alter table public.tic_immersion_vocabulary enable row level security;
drop policy if exists tic_immersion_vocabulary_student_select on public.tic_immersion_vocabulary;
create policy tic_immersion_vocabulary_student_select on public.tic_immersion_vocabulary for select to authenticated using (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id)
 or (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin') and exists (select 1 from public.tic_students s where s.id=student_id and s.teacher_id=auth.uid()))
);
drop policy if exists tic_immersion_vocabulary_student_insert on public.tic_immersion_vocabulary;
create policy tic_immersion_vocabulary_student_insert on public.tic_immersion_vocabulary for insert to authenticated with check (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
 and (activity_id is null or exists (select 1 from public.tic_immersion_activities a where a.id=activity_id and a.teacher_id=teacher_id))
);
drop policy if exists tic_immersion_vocabulary_student_update on public.tic_immersion_vocabulary;
create policy tic_immersion_vocabulary_student_update on public.tic_immersion_vocabulary for update to authenticated using (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
) with check (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
 and (activity_id is null or exists (select 1 from public.tic_immersion_activities a where a.id=activity_id and a.teacher_id=teacher_id))
);
drop policy if exists tic_immersion_vocabulary_student_delete on public.tic_immersion_vocabulary;
create policy tic_immersion_vocabulary_student_delete on public.tic_immersion_vocabulary for delete to authenticated using (
 exists (select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id and s.status='active')
);
