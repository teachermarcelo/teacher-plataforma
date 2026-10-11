-- Additive teacher notifications when a daily immersion mission is completed.
create table if not exists public.tic_immersion_notifications (
 id uuid primary key default gen_random_uuid(),
 session_id uuid not null references public.tic_immersion_sessions(id) on delete cascade,
 student_id uuid not null references public.tic_students(id) on delete cascade,
 teacher_id uuid not null references auth.users(id) on delete cascade,
 notification_type text not null default 'mission_completed',
 title text not null,
 message text not null default '',
 created_at timestamptz not null default now(),
 read_at timestamptz null,
 unique(session_id, notification_type)
);
create index if not exists tic_immersion_notifications_teacher_created_idx
 on public.tic_immersion_notifications(teacher_id, created_at desc);
alter table public.tic_immersion_notifications enable row level security;
drop policy if exists tic_immersion_notifications_select on public.tic_immersion_notifications;
create policy tic_immersion_notifications_select on public.tic_immersion_notifications
 for select to authenticated using (
  (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
   and exists(select 1 from public.tic_students s where s.id=student_id and s.teacher_id=auth.uid()))
  or exists(select 1 from public.tic_students s where s.id=student_id and s.auth_user_id=auth.uid() and s.teacher_id=teacher_id)
 );
drop policy if exists tic_immersion_notifications_teacher_update on public.tic_immersion_notifications;
create policy tic_immersion_notifications_teacher_update on public.tic_immersion_notifications
 for update to authenticated using (
  teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin')
 ) with check (teacher_id=auth.uid() and public.tic_my_role() in ('teacher','admin'));

create or replace function public.tic_immersion_notify_completion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare activity_title text;
declare student_name text;
begin
 if NEW.status = 'completed' and (TG_OP = 'INSERT' or OLD.status is distinct from NEW.status) then
  select a.title into activity_title from public.tic_immersion_activities a where a.id=NEW.activity_id;
  select coalesce(s.display_name,s.email,'Aluno') into student_name
   from public.tic_students s where s.id=NEW.student_id;
  insert into public.tic_immersion_notifications
   (session_id, student_id, teacher_id, notification_type, title, message)
  values
   (NEW.id, NEW.student_id, NEW.teacher_id, 'mission_completed',
    'Missão diária concluída',
    student_name || ' concluiu ' || coalesce(activity_title,'a missão diária') ||
    ' em ' || to_char(NEW.session_date,'DD/MM/YYYY') ||
    '. Tempo registrado: ' || coalesce(NEW.duration_minutes,0)::text || ' minuto(s).')
  on conflict (session_id, notification_type) do update
   set title=excluded.title, message=excluded.message;
 end if;
 return NEW;
end;
$$;
drop trigger if exists tic_immersion_session_completion_notify on public.tic_immersion_sessions;
create trigger tic_immersion_session_completion_notify
 after insert or update of status on public.tic_immersion_sessions
 for each row execute function public.tic_immersion_notify_completion();
