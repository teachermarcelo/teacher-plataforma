-- Additive tables for teacher feedback, weekly goals and CEFR skill assessments.
create table if not exists public.tic_immersion_feedback (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.tic_students(id) on delete cascade,
 teacher_id uuid not null references auth.users(id) on delete cascade,
 session_id uuid null references public.tic_immersion_sessions(id) on delete set null,
 activity_id uuid null references public.tic_immersion_activities(id) on delete set null,
 feedback text not null,
 created_at timestamptz not null default now()
);
create index if not exists tic_immersion_feedback_student_idx on public.tic_immersion_feedback(student_id,created_at desc);
alter table public.tic_immersion_feedback enable row level security;
drop policy if exists tic_immersion_feedback_read on public.tic_immersion_feedback;
create policy tic_immersion_feedback_read on public.tic_immersion_feedback for select to authenticated using (
 (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin'))
 or exists(select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id)
);
drop policy if exists tic_immersion_feedback_teacher_insert on public.tic_immersion_feedback;
create policy tic_immersion_feedback_teacher_insert on public.tic_immersion_feedback for insert to authenticated with check (
 teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
 and exists(select 1 from public.tic_students s where s.id=student_id and s.teacher_id=auth.uid())
);
create table if not exists public.tic_immersion_goals (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.tic_students(id) on delete cascade,
 teacher_id uuid not null references auth.users(id) on delete cascade,
 weekly_minutes integer not null default 60 check (weekly_minutes between 1 and 1000),
 weekly_days integer not null default 5 check (weekly_days between 1 and 7),
 reminder_note text not null default '',
 updated_at timestamptz not null default now(),
 unique(student_id)
);
alter table public.tic_immersion_goals enable row level security;
drop policy if exists tic_immersion_goals_read on public.tic_immersion_goals;
create policy tic_immersion_goals_read on public.tic_immersion_goals for select to authenticated using (
 (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin'))
 or exists(select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id)
);
drop policy if exists tic_immersion_goals_teacher_write on public.tic_immersion_goals;
create policy tic_immersion_goals_teacher_write on public.tic_immersion_goals for all to authenticated using (
 teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
) with check (
 teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
 and exists(select 1 from public.tic_students s where s.id=student_id and s.teacher_id=auth.uid())
);
create table if not exists public.tic_immersion_skill_assessments (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.tic_students(id) on delete cascade,
 teacher_id uuid not null references auth.users(id) on delete cascade,
 skill text not null check (skill in ('Reading','Writing','Listening','Speaking')),
 cefr_level text not null check (cefr_level in ('A0','A1','A2','B1','B2','C1','C2')),
 score integer not null check (score between 0 and 100),
 notes text not null default '',
 assessed_at timestamptz not null default now()
);
create index if not exists tic_immersion_skills_student_idx on public.tic_immersion_skill_assessments(student_id,assessed_at desc);
alter table public.tic_immersion_skill_assessments enable row level security;
drop policy if exists tic_immersion_skills_read on public.tic_immersion_skill_assessments;
create policy tic_immersion_skills_read on public.tic_immersion_skill_assessments for select to authenticated using (
 (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin'))
 or exists(select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id)
);
drop policy if exists tic_immersion_skills_teacher_write on public.tic_immersion_skill_assessments;
create policy tic_immersion_skills_teacher_write on public.tic_immersion_skill_assessments for all to authenticated using (
 teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
) with check (
 teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
 and exists(select 1 from public.tic_students s where s.id=student_id and s.teacher_id=auth.uid())
);