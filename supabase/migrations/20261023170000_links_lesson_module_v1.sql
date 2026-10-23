-- Links Lesson: isolated, additive schema. Does not alter or migrate existing tic_* data.
create table if not exists public.ll_lessons (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.tic_teachers(id) on delete cascade,
  title text not null,
  subtitle text,
  cefr_level text not null default 'A1' check (cefr_level in ('A0','A1','A2','B1','B2','C1','C2')),
  topic text,
  skill text,
  content jsonb not null default '{}'::jsonb,
  html_content text,
  pdf_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ll_assignments (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.ll_lessons(id) on delete cascade,
  teacher_id uuid not null references public.tic_teachers(id) on delete cascade,
  student_id uuid references public.tic_students(id) on delete cascade,
  class_id uuid references public.tic_classes(id) on delete cascade,
  instructions text,
  assigned_at timestamptz not null default now(),
  due_at timestamptz,
  status text not null default 'assigned' check (status in ('draft','assigned','in_progress','submitted','reviewed','completed','cancelled')),
  allow_multiple_attempts boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ll_assignments_exactly_one_target check (
    (student_id is not null and class_id is null) or
    (student_id is null and class_id is not null)
  )
);

create table if not exists public.ll_attempts (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.ll_assignments(id) on delete cascade,
  lesson_id uuid not null references public.ll_lessons(id) on delete cascade,
  student_id uuid not null references public.tic_students(id) on delete cascade,
  attempt_no integer not null default 1 check (attempt_no > 0),
  status text not null default 'in_progress' check (status in ('in_progress','draft','submitted','reviewed','completed')),
  answers jsonb not null default '{}'::jsonb,
  score numeric,
  teacher_feedback text,
  started_at timestamptz not null default now(),
  last_saved_at timestamptz not null default now(),
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assignment_id, student_id, attempt_no)
);

create table if not exists public.ll_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.ll_attempts(id) on delete cascade,
  question_id text not null,
  answer_text text,
  answer_data jsonb not null default '{}'::jsonb,
  score numeric,
  feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (attempt_id, question_id)
);

create table if not exists public.ll_events (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.ll_assignments(id) on delete set null,
  lesson_id uuid references public.ll_lessons(id) on delete set null,
  attempt_id uuid references public.ll_attempts(id) on delete set null,
  student_id uuid references public.tic_students(id) on delete set null,
  teacher_id uuid references public.tic_teachers(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.ll_notifications (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.ll_assignments(id) on delete set null,
  attempt_id uuid references public.ll_attempts(id) on delete cascade,
  teacher_id uuid not null references public.tic_teachers(id) on delete cascade,
  student_id uuid references public.tic_students(id) on delete set null,
  notification_type text not null default 'submission_received',
  title text not null,
  message text not null default '',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists ll_lessons_teacher_updated_idx on public.ll_lessons(teacher_id, updated_at desc);
create index if not exists ll_lessons_published_level_idx on public.ll_lessons(published, cefr_level);
create index if not exists ll_assignments_teacher_assigned_idx on public.ll_assignments(teacher_id, assigned_at desc);
create index if not exists ll_assignments_student_idx on public.ll_assignments(student_id, active, assigned_at desc);
create index if not exists ll_assignments_class_idx on public.ll_assignments(class_id, active, assigned_at desc);
create index if not exists ll_attempts_student_idx on public.ll_attempts(student_id, updated_at desc);
create index if not exists ll_attempts_assignment_idx on public.ll_attempts(assignment_id, student_id, attempt_no desc);
create index if not exists ll_answers_attempt_idx on public.ll_answers(attempt_id);
create index if not exists ll_events_teacher_created_idx on public.ll_events(teacher_id, created_at desc);
create index if not exists ll_events_student_created_idx on public.ll_events(student_id, created_at desc);
create index if not exists ll_notifications_teacher_created_idx on public.ll_notifications(teacher_id, created_at desc);
create unique index if not exists ll_notifications_attempt_type_uidx
  on public.ll_notifications(attempt_id, notification_type) where attempt_id is not null;

-- SECURITY DEFINER helpers avoid RLS recursion through the existing student/class tables.
create or replace function public.ll_current_student_id()
returns uuid language sql stable security definer set search_path = public, auth
as $$ select s.id from public.tic_students s where s.auth_user_id = auth.uid() limit 1 $$;

create or replace function public.ll_is_teacher(p_teacher_id uuid)
returns boolean language sql stable security definer set search_path = public, auth
as $$ select exists (select 1 from public.tic_teachers t where t.id = auth.uid() and t.id = p_teacher_id) $$;

create or replace function public.ll_can_access_assignment(p_assignment_id uuid)
returns boolean language sql stable security definer set search_path = public, auth
as $$
  select exists (
    select 1 from public.ll_assignments a
    where a.id = p_assignment_id and a.active = true
      and (a.student_id = public.ll_current_student_id()
        or exists (select 1 from public.tic_class_students cs
          where cs.class_id = a.class_id and cs.student_id = public.ll_current_student_id() and cs.status = 'active'))
  )
$$;

create or replace function public.ll_touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists ll_lessons_touch_updated_at on public.ll_lessons;
create trigger ll_lessons_touch_updated_at before update on public.ll_lessons for each row execute function public.ll_touch_updated_at();
drop trigger if exists ll_assignments_touch_updated_at on public.ll_assignments;
create trigger ll_assignments_touch_updated_at before update on public.ll_assignments for each row execute function public.ll_touch_updated_at();
drop trigger if exists ll_attempts_touch_updated_at on public.ll_attempts;
create trigger ll_attempts_touch_updated_at before update on public.ll_attempts for each row execute function public.ll_touch_updated_at();
drop trigger if exists ll_answers_touch_updated_at on public.ll_answers;
create trigger ll_answers_touch_updated_at before update on public.ll_answers for each row execute function public.ll_touch_updated_at();

-- A submitted attempt creates one teacher notification; duplicate status updates do not duplicate it.
create or replace function public.ll_notify_submission()
returns trigger language plpgsql security definer set search_path = public
as $$
declare v_teacher_id uuid; declare v_student_name text; declare v_title text;
begin
  if new.status = 'submitted' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    select a.teacher_id, l.title into v_teacher_id, v_title
      from public.ll_assignments a join public.ll_lessons l on l.id = a.lesson_id
      where a.id = new.assignment_id;
    select coalesce(s.display_name, s.email, 'Aluno') into v_student_name
      from public.tic_students s where s.id = new.student_id;
    if v_teacher_id is not null then
      insert into public.ll_notifications (assignment_id, attempt_id, teacher_id, student_id, notification_type, title, message)
      values (new.assignment_id, new.id, v_teacher_id, new.student_id, 'submission_received',
        'Nova entrega em Links Lesson',
        coalesce(v_student_name, 'Aluno') || ' entregou "' || coalesce(v_title, 'lesson') || '".')
      on conflict (attempt_id, notification_type) where attempt_id is not null do nothing;
    end if;
  end if;
  return new;
end
$$;
drop trigger if exists ll_attempt_submission_notification on public.ll_attempts;
create trigger ll_attempt_submission_notification after insert or update of status on public.ll_attempts
for each row execute function public.ll_notify_submission();

alter table public.ll_lessons enable row level security;
alter table public.ll_assignments enable row level security;
alter table public.ll_attempts enable row level security;
alter table public.ll_answers enable row level security;
alter table public.ll_events enable row level security;
alter table public.ll_notifications enable row level security;

drop policy if exists ll_lessons_teacher_all on public.ll_lessons;
create policy ll_lessons_teacher_all on public.ll_lessons for all to authenticated
using (public.ll_is_teacher(teacher_id)) with check (public.ll_is_teacher(teacher_id));

drop policy if exists ll_lessons_assigned_student_select on public.ll_lessons;
create policy ll_lessons_assigned_student_select on public.ll_lessons for select to authenticated
using (published = true and exists (
  select 1 from public.ll_assignments a where a.lesson_id = ll_lessons.id and public.ll_can_access_assignment(a.id)
));

drop policy if exists ll_assignments_teacher_all on public.ll_assignments;
create policy ll_assignments_teacher_all on public.ll_assignments for all to authenticated
using (public.ll_is_teacher(teacher_id))
with check (
  public.ll_is_teacher(teacher_id) and (
    (student_id is not null and class_id is null and exists (
      select 1 from public.tic_students s where s.id=student_id and s.teacher_id=teacher_id
    )) or
    (class_id is not null and student_id is null and exists (
      select 1 from public.tic_classes c where c.id=class_id and c.teacher_id=teacher_id
    ))
  )
);

drop policy if exists ll_assignments_student_select on public.ll_assignments;
create policy ll_assignments_student_select on public.ll_assignments for select to authenticated
using (public.ll_can_access_assignment(id));

drop policy if exists ll_attempts_student_all on public.ll_attempts;
create policy ll_attempts_student_all on public.ll_attempts for all to authenticated
using (student_id = public.ll_current_student_id() and public.ll_can_access_assignment(assignment_id))
with check (
  student_id = public.ll_current_student_id() and public.ll_can_access_assignment(assignment_id)
  and exists (select 1 from public.ll_assignments a where a.id=assignment_id and a.lesson_id=lesson_id and a.active=true)
);

drop policy if exists ll_attempts_teacher_select on public.ll_attempts;
create policy ll_attempts_teacher_select on public.ll_attempts for select to authenticated
using (exists (select 1 from public.ll_assignments a where a.id=ll_attempts.assignment_id and public.ll_is_teacher(a.teacher_id)));

drop policy if exists ll_attempts_teacher_update on public.ll_attempts;
create policy ll_attempts_teacher_update on public.ll_attempts for update to authenticated
using (exists (select 1 from public.ll_assignments a where a.id=ll_attempts.assignment_id and public.ll_is_teacher(a.teacher_id)))
with check (exists (select 1 from public.ll_assignments a where a.id=ll_attempts.assignment_id and public.ll_is_teacher(a.teacher_id)));

drop policy if exists ll_answers_student_all on public.ll_answers;
create policy ll_answers_student_all on public.ll_answers for all to authenticated
using (exists (select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and public.ll_can_access_assignment(at.assignment_id)))
with check (exists (select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and public.ll_can_access_assignment(at.assignment_id)));

drop policy if exists ll_answers_teacher_select on public.ll_answers;
create policy ll_answers_teacher_select on public.ll_answers for select to authenticated
using (exists (select 1 from public.ll_attempts at join public.ll_assignments a on a.id=at.assignment_id where at.id=ll_answers.attempt_id and public.ll_is_teacher(a.teacher_id)));

drop policy if exists ll_answers_teacher_update on public.ll_answers;
create policy ll_answers_teacher_update on public.ll_answers for update to authenticated
using (exists (select 1 from public.ll_attempts at join public.ll_assignments a on a.id=at.assignment_id where at.id=ll_answers.attempt_id and public.ll_is_teacher(a.teacher_id)))
with check (exists (select 1 from public.ll_attempts at join public.ll_assignments a on a.id=at.assignment_id where at.id=ll_answers.attempt_id and public.ll_is_teacher(a.teacher_id)));

drop policy if exists ll_events_student_insert on public.ll_events;
create policy ll_events_student_insert on public.ll_events for insert to authenticated
with check (student_id = public.ll_current_student_id() and (assignment_id is null or public.ll_can_access_assignment(assignment_id)));

drop policy if exists ll_events_teacher_select on public.ll_events;
create policy ll_events_teacher_select on public.ll_events for select to authenticated
using (teacher_id = auth.uid() and public.ll_is_teacher(teacher_id));

drop policy if exists ll_notifications_teacher_select on public.ll_notifications;
create policy ll_notifications_teacher_select on public.ll_notifications for select to authenticated
using (public.ll_is_teacher(teacher_id));

drop policy if exists ll_notifications_teacher_update on public.ll_notifications;
create policy ll_notifications_teacher_update on public.ll_notifications for update to authenticated
using (public.ll_is_teacher(teacher_id)) with check (public.ll_is_teacher(teacher_id));

grant execute on function public.ll_current_student_id() to authenticated;
grant execute on function public.ll_is_teacher(uuid) to authenticated;
grant execute on function public.ll_can_access_assignment(uuid) to authenticated;
