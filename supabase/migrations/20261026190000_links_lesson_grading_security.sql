-- Links Lesson: harden grading fields and lock submitted attempts without altering existing rows.
create or replace function public.ll_guard_attempt_mutation()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare v_teacher boolean;
begin
  select public.ll_is_teacher(a.teacher_id) into v_teacher
  from public.ll_assignments a where a.id=old.assignment_id;

  if coalesce(v_teacher,false) then
    if new.assignment_id is distinct from old.assignment_id
       or new.lesson_id is distinct from old.lesson_id
       or new.student_id is distinct from old.student_id
       or new.attempt_no is distinct from old.attempt_no
       or new.answers is distinct from old.answers
       or new.started_at is distinct from old.started_at
       or new.created_at is distinct from old.created_at then
      raise exception 'Teacher grading cannot rewrite attempt identity or student answers.';
    end if;
    return new;
  end if;

  if old.student_id is distinct from public.ll_current_student_id() then
    raise exception 'Not allowed to modify this attempt.';
  end if;

  if old.status in ('submitted','reviewed','completed') then
    if new.answers is distinct from old.answers
       or new.status is distinct from old.status
       or new.score is distinct from old.score
       or new.teacher_feedback is distinct from old.teacher_feedback
       or new.review is distinct from old.review
       or new.submitted_at is distinct from old.submitted_at
       or new.reviewed_at is distinct from old.reviewed_at then
      raise exception 'Submitted attempts are locked.';
    end if;
  else
    if new.score is distinct from old.score
       or new.teacher_feedback is distinct from old.teacher_feedback
       or new.review is distinct from old.review
       or new.reviewed_at is distinct from old.reviewed_at then
      raise exception 'Students cannot change grading fields.';
    end if;
    if new.status not in ('in_progress','draft','submitted') then
      raise exception 'Invalid student attempt status.';
    end if;
    if new.status='submitted' and new.submitted_at is null then new.submitted_at=now(); end if;
  end if;
  return new;
end $$;
drop trigger if exists ll_attempts_guard_mutation on public.ll_attempts;
create trigger ll_attempts_guard_mutation before update on public.ll_attempts
for each row execute function public.ll_guard_attempt_mutation();

create or replace function public.ll_guard_answer_mutation()
returns trigger language plpgsql security definer set search_path=public,auth
as $$
declare v_attempt public.ll_attempts%rowtype; v_teacher boolean; v_attempt_id uuid;
begin
  if tg_op='DELETE' then v_attempt_id=old.attempt_id; else v_attempt_id=new.attempt_id; end if;
  select * into v_attempt from public.ll_attempts where id=v_attempt_id for update;
  if not found then raise exception 'Attempt not found.'; end if;
  select public.ll_is_teacher(a.teacher_id) into v_teacher
    from public.ll_assignments a where a.id=v_attempt.assignment_id;
  if coalesce(v_teacher,false) then
    if tg_op='UPDATE' and (new.attempt_id is distinct from old.attempt_id or new.question_id is distinct from old.question_id or new.answer_text is distinct from old.answer_text or new.answer_data is distinct from old.answer_data) then
      raise exception 'Teacher grading cannot rewrite student answers.';
    end if;
    if tg_op='DELETE' then return old; end if;
    return new;
  end if;
  if v_attempt.student_id is distinct from public.ll_current_student_id() then raise exception 'Not allowed.'; end if;
  if v_attempt.status in ('submitted','reviewed','completed') then raise exception 'Submitted attempt answers are locked.'; end if;
  if tg_op='UPDATE' and (new.score is distinct from old.score or new.feedback is distinct from old.feedback) then raise exception 'Students cannot change grading fields.'; end if;
  if tg_op='DELETE' then return old; end if;
  return new;
end $$;
drop trigger if exists ll_answers_guard_mutation on public.ll_answers;
create trigger ll_answers_guard_mutation before insert or update or delete on public.ll_answers
for each row execute function public.ll_guard_answer_mutation();

drop policy if exists ll_attempts_student_all on public.ll_attempts;
drop policy if exists ll_attempts_student_select on public.ll_attempts;
create policy ll_attempts_student_select on public.ll_attempts for select to authenticated
using (student_id=public.ll_current_student_id() and public.ll_can_access_assignment(assignment_id));
drop policy if exists ll_attempts_student_insert on public.ll_attempts;
create policy ll_attempts_student_insert on public.ll_attempts for insert to authenticated
with check (student_id=public.ll_current_student_id() and status in ('in_progress','draft') and score is null and teacher_feedback is null and review='{}'::jsonb and exists(select 1 from public.ll_assignments a where a.id=assignment_id and a.lesson_id=lesson_id and a.active=true and public.ll_can_access_assignment(a.id)));
drop policy if exists ll_attempts_student_update on public.ll_attempts;
create policy ll_attempts_student_update on public.ll_attempts for update to authenticated
using (student_id=public.ll_current_student_id() and public.ll_can_access_assignment(assignment_id) and status in ('in_progress','draft'))
with check (student_id=public.ll_current_student_id() and status in ('in_progress','draft','submitted') and score is null and teacher_feedback is null and review='{}'::jsonb and exists(select 1 from public.ll_assignments a where a.id=assignment_id and a.lesson_id=lesson_id and a.active=true and public.ll_can_access_assignment(a.id)));

drop policy if exists ll_answers_student_all on public.ll_answers;
drop policy if exists ll_answers_student_select on public.ll_answers;
create policy ll_answers_student_select on public.ll_answers for select to authenticated
using (exists(select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and public.ll_can_access_assignment(at.assignment_id)));
drop policy if exists ll_answers_student_insert on public.ll_answers;
create policy ll_answers_student_insert on public.ll_answers for insert to authenticated
with check (exists(select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and at.status in ('in_progress','draft') and public.ll_can_access_assignment(at.assignment_id)));
drop policy if exists ll_answers_student_update on public.ll_answers;
create policy ll_answers_student_update on public.ll_answers for update to authenticated
using (exists(select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and at.status in ('in_progress','draft') and public.ll_can_access_assignment(at.assignment_id)))
with check (exists(select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and at.status in ('in_progress','draft') and public.ll_can_access_assignment(at.assignment_id)));
drop policy if exists ll_answers_student_delete on public.ll_answers;
create policy ll_answers_student_delete on public.ll_answers for delete to authenticated
using (exists(select 1 from public.ll_attempts at where at.id=ll_answers.attempt_id and at.student_id=public.ll_current_student_id() and at.status in ('in_progress','draft') and public.ll_can_access_assignment(at.assignment_id)));

alter table public.ll_attempts drop constraint if exists ll_attempts_score_range;
alter table public.ll_attempts add constraint ll_attempts_score_range check (score is null or (score between 0 and 100));
